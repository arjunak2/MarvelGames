import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestionPageState } from "../types/QuestionPage";
import { Points, Question, QuestionType } from "../types/Question";
import { initialState, QuestionPageData } from "../types/PageData";

enum Actions {
    COMPLETE,
    TIME_STOP,
    SET_POINTS,
    RESET
}
const QuestionPageActions: { [index in Actions]: Partial<QuestionPageData> } = {
    [Actions.COMPLETE]: {
        state: QuestionPageState.COMPLETED,
        hoveredAnswerChoice: "",
    },
    [Actions.TIME_STOP]: {timerActive: false},
    [Actions.SET_POINTS]: {},
    [Actions.RESET]: {},
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
