import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Question_Text } from "src/types/Question";
import { QuestionPageState } from "../../types/QuestionPage";
import { useSelector } from "src/store";

export function TextSection({
    question,
    onAnswer,
    pageState,
}: {
    question: Question_Text;
    onAnswer: (chosenAnswer: string) => void;
    pageState: QuestionPageState;
}) {
    const { chosenAnswer } = useSelector((store) => {
        return store.questionPage;
    });
    const pageComplete = pageState === QuestionPageState.COMPLETED;
    const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
    return (
        <>
            <Form.Control
                ref={inputRef}
                placeholder="Enter text"
                aria-label="Username"
                aria-describedby="basic-addon1"
                disabled={pageComplete}
                isInvalid={
                    pageComplete &&
                    !question.validateAnswer(`${chosenAnswer}`)
                }
                isValid={
                    pageComplete &&
                    question.validateAnswer(`${chosenAnswer}`)
                }
            />
            <Button
                type="submit"
                onClick={() => {
                    const chosenAnswer = inputRef.current?.value;
                    onAnswer(chosenAnswer!);
                }}
                disabled={pageComplete}
            >
                Submit
            </Button>
        </>
    );
}
export default TextSection