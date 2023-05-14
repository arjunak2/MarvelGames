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
import { User } from "src/types/User";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { socket } from "src/utils/WebSocket";
import { GameBoardNavData } from "src/types/Screens";
import { useSelector, useDispatch } from "../../store";
import { questionPageActions } from "src/store/QuestionPageSlice";
import { QuestionPageState } from "src/types/QuestionPage";
import "../../styles/Question.scss";

interface QuestionPageProps {
    user?: User;
    question: Question;
}

function Header({ text }: { text: string }) {
    return (
        <div
            style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                fontFamily: "Lato, SANS-SERIF",
                color: "#ffffff",
            }}
        >
            {text}
        </div>
    );
}

const uu = new User("agent13");

export function QuestionPage({ user = uu }: { user?: User }) {
    const [question, setQuestion] = useState(undefined as Question | undefined);
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
    const { state, timerActive, points } = useSelector((store) => {
        return store.questionPage;
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const answerQuestion = (chosenAnswer?: string) => {
        console.log("Moving to Completed state");
        dispatch(questionPageActions.complete());

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
    const goHome = () => {
        socket.emit("navigate", { name: "GAME_BOARD" });
    };

    const linkPowers = () => {
        user.powerBank.timestop.activate = () => {
            dispatch(questionPageActions.timeStop());
        };
        user.powerBank.double.activate = () => {
            dispatch(questionPageActions.setPoints(points * 2));
        };
        user.powerBank.hint.activate = () => {};
    };
    useEffect(() => {
        linkPowers();
        socket.on("transitionToGameBoard", () => {
            dispatch(questionPageActions.reset());
            navigate(`/`);
        });
    }, []);

    return (
        <div>
            <div style={{ background: "#7d213b" }}>
                <Timer
                    pageState={state}
                    answerQuestion={answerQuestion}
                    disabled={!timerActive}
                />
                <Header text={question.query} />
                <div style={{ fontSize: "2.5rem", fontFamily: "serif" }}>
                    {points}
                </div>
            </div>
            {question instanceof Question_MC ? (
                <MultipleChoiceSection
                    pageState={state}
                    question={question}
                    onAnswer={(answer) => {
                        answerQuestion(answer);
                    }}
                />
            ) : (
                <TextSection
                    pageState={state}
                    question={question}
                    onAnswer={(answer) => {
                        answerQuestion(answer);
                    }}
                />
            )}
            <div>{user.madeUpNames}</div>
            <PowerSection pageState={state} powerBank={uu.powerBank} />
            <Button variant="secondary" onClick={goHome}>
                <img
                    src={
                        "https://www.svgrepo.com/show/22031/home-icon-silhouette.svg"
                    }
                    width="30"
                    height="30"
                />
            </Button>
        </div>
    );
}
