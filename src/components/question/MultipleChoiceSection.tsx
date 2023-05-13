import { useState } from "react";
import { Container, Row, Col, Button, ButtonProps } from "react-bootstrap";
import { Question_MC } from "src/types/Question";
import { QuestionPageState } from "../../types/QuestionPage";
import { ButtonVariant } from "react-bootstrap/esm/types";

interface AnswerProps extends ButtonProps {
    text: string;
    isCorrect?: boolean;
    onAnswer: (chosenAnswer?: string) => void;
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

export function MultipleChoiceSection({
    question,
    onAnswer,
    pageState,
}: {
    question: Question_MC;
    onAnswer: (chosenAnswer?: string) => void;
    pageState: QuestionPageState;
}) {
    const isAnswered = pageState === QuestionPageState.COMPLETED;
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

export default MultipleChoiceSection;
