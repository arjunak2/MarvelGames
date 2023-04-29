import React, { useEffect, useState, FC, useRef } from "react";
import {
    Button,
    ButtonProps,
    Col,
    Container,
    Form,
    Row,
} from "react-bootstrap";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import {
    Points,
    Question,
    QuestionType,
    Question_MC,
    Question_Text,
} from "../../types/Question";
import "../../styles/Timer.scss";
import QQ from "../../data/Question.json";
import { ButtonVariant } from "react-bootstrap/esm/types";
import Fuse from "fuse.js";

enum PageState {
    INITIAL,
    COMPLETED,
}
function renderTime({ remainingTime, color, elapsedTime }: TimeProps) {
    const progress = elapsedTime / (remainingTime + elapsedTime);
    return (
        <div
            className="time"
            style={{
                color: color,
                fontWeight: progress * 600 + 300,
                fontSize: `${progress * 4 + 2}rem`,
            }}
        >
            {remainingTime}
        </div>
    );
}

interface AnswerProps extends ButtonProps {
    text: string;
    isCorrect?: boolean;
    onAnswer: (chosenAnswer?: string) => void;
}

function MultipleChoiceSection({
    question,
    onAnswer,
    pageState,
}: {
    question: Question_MC;
    onAnswer: (chosenAnswer?: string) => void;
    pageState: PageState;
}) {
    const isAnswered = pageState === PageState.COMPLETED;
    const { A, B, C, D } = question.choices;

    const AnswerChoices = Object.entries(question.choices).map(
        ([choiceKey, answerString]) => {
            const isCorrectAnswer = question.validateAnswer(answerString);
            let className: string = isAnswered ? "answered" : "";
            if (isCorrectAnswer) className += ` correct`;
            return (
                <AnswerChoice
                    key={choiceKey}
                    className={className + " w-100"}
                    disabled={isAnswered}
                    text={answerString}
                    onAnswer={onAnswer}
                    isCorrect={isCorrectAnswer}
                />
            );
        }
    );
    return (
        <Container>
            <Row>
                <Col>{AnswerChoices[0]}</Col>
                <Col>{AnswerChoices[1]}</Col>
            </Row>
            <Row>
                <Col>{AnswerChoices[2]}</Col>
                <Col>{AnswerChoices[3]}</Col>
            </Row>
        </Container>
    );
}

function TextSection({
    question,
    onAnswer,
    pageState,
}: {
    question: Question_Text;
    onAnswer: (chosenAnswer?: string) => void;
    pageState: PageState;
}) {
    const pageComplete = pageState === PageState.COMPLETED;

    const inputRef : React.RefObject<HTMLInputElement> = useRef(null);
    return (
        <>
            <Form.Control
                ref={inputRef}
                placeholder="Enter text"
                aria-label="Username"
                aria-describedby="basic-addon1"
                disabled={pageComplete}
                isInvalid={pageComplete && !question.validateAnswer(`${inputRef.current?.value}`)}
                isValid={pageComplete && question.validateAnswer(`${inputRef.current?.value}`)}
            />
            <Button
                type="submit"
                onClick={() => {
                    const chosenAnswer = inputRef.current?.value
                    onAnswer(chosenAnswer)
                }}
                disabled={pageComplete}
            >
                Submit
            </Button>
        </>
    );
}

enum AnswerState {
    UNPICKED,
    INCORRECT,
    CORRECT,
}
function AnswerChoice({
    text,
    isCorrect,
    onAnswer,
    disabled,
    ...otherProps
}: AnswerProps) {
    const [state, setState] = useState(AnswerState.UNPICKED);
    const getVariant = (): ButtonVariant => {
        if (disabled && isCorrect) {
            return "success";
        }
        switch (state) {
            case AnswerState.CORRECT: {
                return "success";
            }
            case AnswerState.INCORRECT: {
                return "danger";
            }
            default: {
                return "primary";
            }
        }
    };
    return (
        <Button
            style={{}}
            size="lg"
            onClick={(event) => {
                if (isCorrect) setState(AnswerState.CORRECT);
                else setState(AnswerState.INCORRECT);
                onAnswer(text);
            }}
            disabled={disabled}
            {...otherProps}
            variant={getVariant()}
        >
            {text}
        </Button>
    );
}

const SW = ["#e6e6e6", "#CB3966", "#e60017", "#4E192F", "#1F0815"];

interface QuestionPageProps {
    question?: Question;
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

const qq: Question = new Question_Text(
    Points.One,
    "Secret Identities",
    "Which movie did Wong NOT appear in?",
    "Ronan",
    false
);

export function QuestionPage({ question = qq }: QuestionPageProps) {
    const [state, setState] = useState(PageState.INITIAL);
    const [powers, setPowers] = useState({
        double: false,
        timeStop: false,
        hint: false,
    });
    const updateScore = () => {};
    const answerQuestion = (chosenAnswer?: string) => {
        console.log("Moving to Completed state");
        setState(PageState.COMPLETED);
        // @TODO updateScore
        if (chosenAnswer) {
            console.log(`Player submited this answer: ${chosenAnswer}`);
            if (question.validateAnswer(chosenAnswer)) {
                console.log(`The answer is correct`);
            } else {
                console.log(`The answer is incorrect`);
            }
        } else {
            console.log(`No Answer submitted!`);
        }
    };
    const TIMER_DURATION = 30;

    return (
        <div>
            <div style={{ background: "#7d213b" }}>
                <CountdownCircleTimer
                    isPlaying={state !== PageState.COMPLETED}
                    trailColor={"#2b2d33"}
                    strokeWidth={15}
                    strokeLinecap="square"
                    duration={TIMER_DURATION}
                    size={200}
                    colors={[
                        "#e6e6e6",
                        "#CB3966",
                        "#e60017",
                        "#4E192F",
                        "#1F0815",
                    ]}
                    // colors={["#50a696", "#4fb86b","#CB3966", "#520B19", "#F7B801", "#f44369", "#c5302e"]}
                    colorsTime={[
                        TIMER_DURATION,
                        (TIMER_DURATION * 2) / 3,
                        (TIMER_DURATION * 1) / 2,
                        (TIMER_DURATION * 2) / 5,
                        0,
                    ]}
                    onComplete={() => {
                        answerQuestion();
                        return { delay: 1 };
                    }}
                >
                    {renderTime}
                </CountdownCircleTimer>
                <QuestionHeader text={question.query} />
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
        </div>
    );
}
