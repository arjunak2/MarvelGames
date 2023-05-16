import { useState } from "react";
import { Container, Row, Col, Button, ButtonProps } from "react-bootstrap";
import { Question_MC } from "src/types/Question";
import { QuestionPageState } from "../../types/QuestionPage";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { useDispatch, useSelector } from "src/store";
import { QuestionPageActions } from "src/store/QuestionPageSlice";
import { socket } from "src/utils/WebSocket";

interface AnswerProps extends ButtonProps {
    text: string;
    isCorrect?: boolean;
    onAnswer: (chosenAnswer: string) => void;
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
    const { hoveredAnswerChoice, chosenAnswer } = useSelector((store) => {
        return store.questionPage;
    });
    const isHovered = hoveredAnswerChoice === text;
    const isChosen = chosenAnswer === text;

    const getVariant = (): ButtonVariant => {
        if (disabled) {
            if (isCorrect) return "success";
            if (!isCorrect && isChosen) return "danger";
            else return "primary";
        } else {
            return "primary";
        }
    };

    const onHover = () => {
        socket.emit("updateQuestionPageData", QuestionPageActions.HOVER(text));
    };
    const onLeave = () => {
        socket.emit("updateQuestionPageData", QuestionPageActions.LEAVE());
    };
    const generateClassName = (): string => {
        const answerChoiceTag = "answer-choice";
        const buttonType = "w-100";

        const hoveredTag = isHovered ? "hovered" : "";
        const correctTag = isCorrect ? "correct" : "";
        const chosenTag = isChosen ? "chosen" : "";
        return [
            answerChoiceTag,
            buttonType,
            hoveredTag,
            correctTag,
            chosenTag,
        ].join(" ");
    };
    return (
        <Button
            style={{}}
            size="lg"
            className={generateClassName()}
            onClick={() => {
                onAnswer(text);
            }}
            disabled={disabled}
            {...otherProps}
            variant={getVariant()}
            onMouseOver={onHover}
            onMouseLeave={onLeave}
        >
            {text}
        </Button>
    );
}

export function MultipleChoiceSection({
    question,
    onAnswer,
    pageState,
}: {
    question: Question_MC;
    onAnswer: (chosenAnswer: string) => void;
    pageState: QuestionPageState;
}) {
    const { chosenAnswer } = useSelector((store) => {
        return store.questionPage;
    });

    const isAnswered = pageState === QuestionPageState.COMPLETED;

    const { A, B, C, D } = question.choices;

    const AnswerChoices = Object.entries(question.choices).map(
        ([choiceKey, answerString]) => {
            const isCorrectAnswer = question.validateAnswer(answerString);
            return (
                <AnswerChoice
                    id={choiceKey}
                    key={choiceKey}
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

export default MultipleChoiceSection;
