import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestionPageState } from "../types/QuestionPage";
import { Points, Question, defaultTextQuestion } from "../types/Question";

interface QuestionPageData {
    state: QuestionPageState;
    timerActive: boolean;
    points: Points;
    questionId: string;
}

const initialState: QuestionPageData = {
    state: QuestionPageState.INITIAL,
    timerActive: true,
    points: Points.One,
    questionId: "",
};

export const questionPageSlice = createSlice({
    name: "questionPage",
    initialState,
    reducers: {
        complete: (state) => {
            state.state = QuestionPageState.COMPLETED;
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
        },
        reset: (state) => {
            state.state = QuestionPageState.INITIAL;
            state.timerActive = true;
            state.points = Points.One;
            state.questionId = "";
        },
    },
});

// Action creators are generated for each case reducer function
export const questionPageActions = questionPageSlice.actions;

export default questionPageSlice.reducer;
