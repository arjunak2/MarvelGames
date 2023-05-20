import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestionPageState } from "../types/QuestionPage";
import { Points, Question, QuestionType } from "../types/Question";
import { initialState, QuestionPageData } from "../types/PageData";

type Actions =
    | "COMPLETE"
    | "HOVER"
    | "LEAVE"
    | "TEXT_UPDATE"
    | "TIME_STOP"
    | "TIMES_UP"
    | "SET_POINTS"
    | "RESET";
export const QuestionPageActions = {
    COMPLETE: (chosenAnswer: string): Partial<QuestionPageData> => ({
        state: QuestionPageState.COMPLETED,
        hoveredAnswerChoice: "",
        chosenAnswer,
    }),
    HOVER: (answer: string): Partial<QuestionPageData> => ({
        hoveredAnswerChoice: answer,
    }),
    LEAVE: (): Partial<QuestionPageData> => ({ hoveredAnswerChoice: "" }),
    TEXT_UPDATE: (text: string): Partial<QuestionPageData> => ({
        textInputUpdate: text,
    }),
    TIME_STOP: (): Partial<QuestionPageData> => ({ timerActive: false }),
    TIMES_UP: (): Partial<QuestionPageData> => ({
        state: QuestionPageState.COMPLETED,
        hoveredAnswerChoice: "",
        timerActive: false,
    }),
    SET_POINTS: (points: number): Partial<QuestionPageData> => ({ points }),
    RESET: (): Partial<QuestionPageData> => initialState,
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
        setQuestionPageData: (
            _state,
            { payload: data }: PayloadAction<QuestionPageData>
        ) => {
            return data;
        },
        updateQuestionPageData: (
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
