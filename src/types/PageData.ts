import { Points, QuestionType } from "./Question";
import { QuestionPageState } from "./QuestionPage";
export interface QuestionPageData {
    state: QuestionPageState;
    questionType: QuestionType;
    timerActive: boolean;
    points: Points;
    questionId: string;
    hoveredAnswerChoice?: string;
    chosenAnswer?: string;
}
