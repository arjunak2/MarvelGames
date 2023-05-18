import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Question_Text } from "src/types/Question";
import { QuestionPageState } from "../../types/QuestionPage";
import { useSelector } from "src/store";
import { socket } from "src/utils/WebSocket";
import { QuestionPageActions } from "src/store/QuestionPageSlice";

export function TextSection({
    question,
    onAnswer,
    pageState,
}: {
    question: Question_Text;
    onAnswer: (chosenAnswer: string) => void;
    pageState: QuestionPageState;
}) {
    const { chosenAnswer, textInputUpdate } = useSelector((store) => {
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
                    pageComplete && !question.validateAnswer(`${chosenAnswer}`)
                }
                isValid={
                    pageComplete && question.validateAnswer(`${chosenAnswer}`)
                }
                onChange={(ev) => {
                    const enteredText = ev.target.value;
                    socket.emit(
                        "updateQuestionPageData",
                        QuestionPageActions.TEXT_UPDATE(enteredText)
                    );
                }}
                value={chosenAnswer || textInputUpdate}
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
export default TextSection;
