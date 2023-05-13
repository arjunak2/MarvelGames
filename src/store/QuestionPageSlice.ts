import { createSlice } from "@reduxjs/toolkit";
import { QuestionPageState } from "../types/QuestionPage";
import { Question, defaultTextQuestion } from "../types/Question";

interface QuestionPageSlice {
    state: QuestionPageState;
    timerActive: boolean;
    question?: Question;
}

const initialState: QuestionPageSlice = {
    state: QuestionPageState.INITIAL,
    timerActive: true,
    question: defaultTextQuestion,
};

export const questionPageSlice = createSlice({
    name: "questionPage",
    initialState,
    reducers: {
        complete: (state) => {
            state.state = QuestionPageState.COMPLETED;
        },
        stopTime: (state) => {
            state.timerActive = false;
        },
        reset: (state, action) => {
            state = initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const questionPageActions = questionPageSlice.actions;

export default questionPageSlice.reducer;
