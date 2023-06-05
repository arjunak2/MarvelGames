import { useEffect, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import {
    Points,
    Question,
    QuestionCategory,
    Question_MC,
    Question_Text,
    mapJsonToQuestion,
} from "../../types/Question";
import { MultipleChoiceSection } from "./MultipleChoiceSection";
import { TextSection } from "./TextSection";
import { Timer } from "./CountDownTimer";
import { PowerButton, PowerSection } from "./PowersSection";
import { Player } from "src/types/Player";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Image, Spinner } from "react-bootstrap";
import { socket } from "src/utils/WebSocket";
import { GameBoardNavData } from "src/types/Screens";
import { useSelector, useDispatch } from "../../store";
import {
    QuestionPageActions,
    questionPageActions,
} from "src/store/QuestionPageSlice";
import { QuestionPageState } from "src/types/QuestionPage";
import "../../styles/Question.scss";
import { initialState } from "src/types/PageData";
import { Teams } from "src/types/Team";
import BannerImage from "../../assets/questions/500/SW_Banner2.png";
import WebFont from "webfontloader";
import "../../fonts/Dream-Avenue.ttf";

interface QuestionPageProps {
    user?: Player;
    question: Question;
}

function Header({ text }: { text: string }) {
    return <h1 className={"title"}>{text.toLocaleUpperCase()}</h1>;
}

const uu = new Player("Sajiberjabber", "angel_care", "Hulk", Teams[0]);

export function QuestionPage({ user = uu }: { user?: Player }) {
    const [question, setQuestion] = useState(undefined as Question | undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let { questionId } = useParams();
    const passedInQuestion = useLocation()?.state?.question;
    const fetchQuestion = () => {
        console.log("Fetching Question");
        socket.emit("retrieveQuestion", questionId as string);
    };
    useEffect(() => {
        if (
            question instanceof Question ||
            passedInQuestion instanceof Question
        )
            setQuestion(passedInQuestion);
        else {
            fetchQuestion();
        }
        socket.on("sendQuestion", (receivedQuestion) => {
            console.log("Question fetched");
            const QUESTION = mapJsonToQuestion(receivedQuestion);
            if (question === undefined) setQuestion(QUESTION);
        });

        socket.on("questionPageDataUpdated", (questionPageDataUpdate) => {
            console.log(
                "Question Page data updated",
                JSON.stringify(questionPageDataUpdate)
            );
            dispatch(
                questionPageActions.updateQuestionPageData(
                    questionPageDataUpdate
                )
            );
        });

        socket.on("questionPageDataSet", (questionPageData) => {
            dispatch(questionPageActions.setQuestionPageData(questionPageData));
        });
        socket.on("transitionToGameBoard", () => {
            socket.emit("updateQuestionPageData", QuestionPageActions.RESET());
            dispatch(questionPageActions.reset());
            navigate(`/`);
        });
    }, []);

    if (question) {
        return <QuestionContent user={user} question={question} />;
    } else {
        return <Loader />;
    }
}

function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
            <Spinner
                animation="border"
                role="status"
                variant="primary"
                style={{ height: "30vh", width: "30vh" }}
            />
        </div>
    );
}

function QuestionContent({ user = uu, question }: QuestionPageProps) {
    const { state, timerActive, points, chosenAnswer } = useSelector(
        (store) => {
            return store.questionPage;
        }
    );
    const dispatch = useDispatch();

    const complete = () => {
        console.log("Moving to Completed state");
        // @TODO updateScore
        if (chosenAnswer) {
            console.log(`Player submited this answer: ${chosenAnswer}`);
            if (question.validateAnswer(chosenAnswer)) {
                console.log(`The answer is correct`);
                question.updateScore(points);
            } else {
                console.log(`The answer is incorrect`);
            }
        } else {
            console.log(`No Answer submitted!`);
        }
    };
    const answerQuestion = (chosenAnswer: string) => {
        socket.emit(
            "updateQuestionPageData",
            QuestionPageActions.COMPLETE(chosenAnswer)
        );
    };
    const timesUp = () => {
        socket.emit("updateQuestionPageData", QuestionPageActions.TIMES_UP());
    };
    const goHome = () => {
        socket.emit("navigate", { name: "GAME_BOARD" });
    };

    const linkPowers = () => {
        user.powerBank.timestop.activate = () => {
            socket.emit(
                "updateQuestionPageData",
                QuestionPageActions.TIME_STOP()
            );
        };
        user.powerBank.double.activate = () => {
            socket.emit(
                "updateQuestionPageData",
                QuestionPageActions.SET_POINTS(points * 2)
            );
        };
        user.powerBank.hint.activate = () => {};
    };
    useEffect(() => {
        linkPowers();
        WebFont.load({
            google: {
                families: [
                    "Poppins",
                    "Chilanka",
                    "Playfair Display",
                    "Cinzel",
                    "Prata",
                    "Marcellus",
                    "Spectral",
                ],
            },
        });
    }, []);

    return (
        <div className="d-flex flex-row page">
            <div id="banner">
                <Image src={BannerImage} />
                <h2 className="points">{points}</h2>
            </div>
            <div id="playerSection">
                <Timer
                    pageState={state}
                    timesUp={timesUp}
                    disabled={!timerActive}
                />
                <h2 className="player-name">
                    {user.madeUpNames.toUpperCase()}
                </h2>
                <PowerSection pageState={state} powerBank={user.powerBank} />
                <Button className="home" variant="secondary" onClick={goHome}>
                    <img
                        src={
                            "https://www.svgrepo.com/show/22031/home-icon-silhouette.svg"
                        }
                        width="30"
                        height="30"
                    />
                </Button>
            </div>
            <div id="details">
                <Header text={question.query} />
                {question instanceof Question_MC ? (
                    <MultipleChoiceSection
                        pageState={state}
                        question={question}
                        onAnswer={answerQuestion}
                    />
                ) : (
                    <TextSection
                        pageState={state}
                        question={question}
                        onAnswer={answerQuestion}
                    />
                )}
            </div>
        </div>
    );
}
