import { useState } from "react";
import { Container, Row, Col, Button, ButtonProps } from "react-bootstrap";
import { Question_MC } from "src/types/Question";
import { QuestionPageState } from "../../types/QuestionPage";
import { ButtonVariant } from "react-bootstrap/esm/types";
import { useDispatch, useSelector } from "src/store";
import { questionPageActions } from "src/store/QuestionPageSlice";
import { socket } from "src/utils/WebSocket";

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
    const { hoveredAnswerChoice } = useSelector((store) => {
        return store.questionPage;
    });

    const onHover = () => {
        socket.emit("updateQuestionPageData", {
            hoveredAnswerChoice: text,
        });
    };
    const onLeave = () => {
        socket.emit("updateQuestionPageData", {
            hoveredAnswerChoice: "",
        });
    };
    const generateClassName = (): string => {
        const answerChoiceTag = "answer-choice";
        const buttonType = "w-100";
        const isHovered = hoveredAnswerChoice === text;
        const hoveredTag = isHovered ? "hovered" : "";
        const correctTag = isCorrect ? "correct" : "";
        return [answerChoiceTag, buttonType, hoveredTag, correctTag].join(" ");
    };
    return (
        <Button
            style={{}}
            size="lg"
            className={generateClassName()}
            onClick={(event) => {
                if (isCorrect) setState(AnswerState.CORRECT);
                else setState(AnswerState.INCORRECT);
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
    onAnswer: (chosenAnswer?: string) => void;
    pageState: QuestionPageState;
}) {
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
