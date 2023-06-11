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
import { Player, mapJsonToPlayer } from "src/types/Player";
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
import "../../styles/question/Question.scss";
import { QuestionPageData, initialState } from "src/types/PageData";
import { Teams } from "src/types/Team";
import BannerImage from "../../assets/questions/500/SW_Banner2.png";
import WebFont from "webfontloader";
import "../../fonts/Dream-Avenue.ttf";
import { HomeButton } from "../HomeButton";
import { Loader } from "../Loader";
import { cloneDeep } from "lodash";

interface QuestionPageProps {
    question: Question;
}

function pointToClass(points: Points): string {
    switch (points) {
        case Points.One:
            return "one";
        case Points.Two:
            return "two";
        case Points.Three:
            return "three";
        case Points.Four:
            return "four";
        case Points.Five:
            return "five";
    }
}

function Header({ text, points }: { text: string; points: Points }) {
    return (
        <h1 className={`title ${pointToClass(points)}`}>
            {text.toLocaleUpperCase()}
        </h1>
    );
}

export function QuestionPage() {
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
        const EventListeners = {
            sendQuestion: (receivedQuestion: Question) => {
                console.log("Question fetched");
                const QUESTION = mapJsonToQuestion(receivedQuestion);
                if (question === undefined) setQuestion(QUESTION);
            },
            questionPageDataUpdated: (
                questionPageDataUpdate: Partial<QuestionPageData>
            ) => {
                console.log(
                    "Question Page data updated",
                    JSON.stringify(questionPageDataUpdate)
                );
                dispatch(
                    questionPageActions.updateQuestionPageData(
                        questionPageDataUpdate
                    )
                );
            },
            questionPageDataSet: (questionPageData: QuestionPageData) => {
                dispatch(
                    questionPageActions.setQuestionPageData(questionPageData)
                );
            },
        };
        if (
            question instanceof Question ||
            passedInQuestion instanceof Question
        )
            setQuestion(passedInQuestion);
        else {
            fetchQuestion();
        }
        socket.on("sendQuestion", EventListeners.sendQuestion);
        socket.on(
            "questionPageDataUpdated",
            EventListeners.questionPageDataUpdated
        );
        socket.on("questionPageDataSet", EventListeners.questionPageDataSet);
        return () => {
            socket.off("sendQuestion", EventListeners.sendQuestion);
            socket.off(
                "questionPageDataUpdated",
                EventListeners.questionPageDataUpdated
            );
            socket.off(
                "questionPageDataSet",
                EventListeners.questionPageDataSet
            );
        };
    }, []);

    if (question) {
        return <QuestionContent question={question} />;
    } else {
        return <Loader />;
    }
}

function QuestionContent({ question }: QuestionPageProps) {
    const { state, timerActive, points, chosenAnswer } = useSelector(
        (store) => {
            return store.questionPage;
        }
    );

    const player = useSelector((store) => {
        const playerRaw = store.playerInfo.players[store.page.currentPlayer];
        return mapJsonToPlayer(playerRaw as Player);
    });

    const pageData = useSelector((store) => {
        return store.page;
    });
    const { isCurrentPlayerSelf, isGrandMaster } = useSelector((store) => {
        let isCurrentPlayerSelf =
            store.playerInfo.id == store.page.currentPlayer;
        let isGrandMaster = store.playerInfo.id == "master";
        return { isCurrentPlayerSelf, isGrandMaster };
    });

    const complete = (chosenAns: string) => {
        console.log("Moving to Completed state");
        // @TODO updateScore
        if (chosenAns) {
            console.log(`Player submited this answer: ${chosenAns}`);
            if (question.validateAnswer(chosenAns)) {
                console.log(`The answer is correct`);
                question.updateScore(points);

                let updatedPageData = cloneDeep(pageData);
                updatedPageData.teamData[player.team].score += points;
                socket.emit("updatePage", updatedPageData);
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
        complete(chosenAnswer);
    };
    const timesUp = () => {
        socket.emit("updateQuestionPageData", QuestionPageActions.TIMES_UP());
    };
    const nextTurn = () => {
        socket.emit("nextTurn");
    };
    const goHome = () => {
        socket.emit("navigate", { name: "GAME_BOARD" });
        nextTurn();
    };

    useEffect(() => {}, [player]);

    const isMaster = false;
    const pointClass = pointToClass(points);
    return (
        <div
            className={`page ${
                !isCurrentPlayerSelf && !isGrandMaster && "page-disabled"
            } ${pointClass}`}
        >
            <div id={`banner`} className={`${pointClass}`}>
                <Image
                    src={require(`../../assets/questions/${points}/banner.png`)}
                />
                <h2 className={`points ${pointClass}`}>{points}</h2>
            </div>
            <div className={`rest ${pointClass}`}>
                <div id={`playerSection`} className={`${pointClass}`}>
                    <Timer
                        pageState={state}
                        timesUp={timesUp}
                        disabled={!timerActive}
                    />
                    <h2 className={`player-name ${pointClass}`}>
                        {player.madeUpNames.toUpperCase()}
                    </h2>
                    <PowerSection
                        pageState={state}
                        player={player}
                        points={points}
                    />
                </div>
                <div id={`details`} className={`${pointClass}`}>
                    <Header text={question.query} points={points} />
                    <div className={`answer-section ${pointClass}`}>
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
                    {isGrandMaster && (
                        <HomeButton visible={true} onClick={goHome} />
                    )}
                </div>
            </div>
        </div>
    );
}
