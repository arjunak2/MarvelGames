import { useEffect, useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import {
    Points,
    Question,
    Question_MC,
    Question_Text,
} from "../../types/Question";
import "../../styles/Timer.scss";
import { MultipleChoiceSection } from "./MultipleChoiceSection";
import { TextSection } from "./TextSection";
import { Timer } from "./CountDownTimer";
import { PowerButton, PowerSection } from "./PowersSection";
import { User } from "src/types/User";

export enum PageState {
    INITIAL,
    COMPLETED,
}

interface QuestionPageProps {
    question?: Question;
    user?: User;
}

function QuestionHeader({ text }: { text: string }) {
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

const qq: Question = new Question_MC(
    Points.One,
    "Secret Identities",
    "Which movie did Wong NOT appear in?",
    {
        A: "She-hulk",
        B: "Shang-Chi",
        C: "Eternals",
        D: "No Way Home",
    },
    "Eternals",
    false
);
const uu = new User("agent13");

export function QuestionPage({ question = qq, user = uu }: QuestionPageProps) {
    const [state, setState] = useState(PageState.INITIAL);
    const [timerDisabed, disableTimer] = useState(false);
    const [points, setPoints] = useState(question.points);
    const answerQuestion = (chosenAnswer?: string) => {
        console.log("Moving to Completed state");
        setState(PageState.COMPLETED);
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

    const linkPowers = () => {
        user.powerBank.timestop.activate = () => {
            disableTimer(true);
        };
        user.powerBank.double.activate = () => {
            setPoints(points * 2);
        };
        user.powerBank.hint.activate = () => {};
    };
    useEffect(linkPowers, []);

    return (
        <div>
            <div style={{ background: "#7d213b" }}>
                <Timer
                    pageState={state}
                    answerQuestion={answerQuestion}
                    disabled={timerDisabed}
                />
                <QuestionHeader text={question.query} />
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
        </div>
    );
}
