import { Points, QuestionType } from "./Question";
import { QuestionPageState } from "./QuestionPage";

export const initialState: QuestionPageData = {
    state: QuestionPageState.INITIAL,
    questionType: QuestionType.NULL,
    timerActive: true,
    points: Points.One,
    questionId: "",
};
export interface QuestionPageData {
    state: QuestionPageState;
    questionType: QuestionType;
    timerActive: boolean;
    points: Points;
    questionId: string;
    hoveredAnswerChoice?: string;
    chosenAnswer?: string;
}
