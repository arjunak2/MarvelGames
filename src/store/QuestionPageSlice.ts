import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestionPageState } from "../types/QuestionPage";
import {
    Points,
    Question,
    QuestionType,
    defaultTextQuestion,
} from "../types/Question";

interface QuestionPageData {
    state: QuestionPageState;
    questionType: QuestionType;
    timerActive: boolean;
    points: Points;
    questionId: string;
    hoveredAnswerChoice?: string;
    chosenAnswer: string;
}

const initialState: QuestionPageData = {
    state: QuestionPageState.INITIAL,
    questionType: QuestionType.NULL,
    timerActive: true,
    points: Points.One,
    questionId: "",
    chosenAnswer: "",
};

export const questionPageSlice = createSlice({
    name: "questionPage",
    initialState,
    reducers: {
        complete: (state) => {
            state.state = QuestionPageState.COMPLETED;
            state.hoveredAnswerChoice = "";
        },
        timeStop: (state) => {
            state.timerActive = false;
        },
        setPoints: (state, { payload }: PayloadAction<Points>) => {
            state.points = payload;
        },
        setQuestion: (
            state,
            { payload: question }: PayloadAction<Question>
        ) => {
            state.questionId = question.id;
            state.points = question.points;
            state.questionType = question.type;
        },
        updateQuestion: (
            state,
            {
                payload: questionPageData,
            }: PayloadAction<Partial<QuestionPageData>>
        ) => {
            return { ...state, ...questionPageData };
        },
        reset: () => {
            return initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const questionPageActions = questionPageSlice.actions;

export default questionPageSlice.reducer;
