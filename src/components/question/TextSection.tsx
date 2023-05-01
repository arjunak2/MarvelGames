import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Question_Text } from "src/types/Question";
import { PageState } from "./Question";

export function TextSection({
    question,
    onAnswer,
    pageState,
}: {
    question: Question_Text;
    onAnswer: (chosenAnswer?: string) => void;
    pageState: PageState;
}) {
    const pageComplete = pageState === PageState.COMPLETED;
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
                    !question.validateAnswer(`${inputRef.current?.value}`)
                }
                isValid={
                    pageComplete &&
                    question.validateAnswer(`${inputRef.current?.value}`)
                }
            />
            <Button
                type="submit"
                onClick={() => {
                    const chosenAnswer = inputRef.current?.value;
                    onAnswer(chosenAnswer);
                }}
                disabled={pageComplete}
            >
                Submit
            </Button>
        </>
    );
}
export default TextSection