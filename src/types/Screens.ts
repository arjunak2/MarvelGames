export type ScreenNames = "GAME_BOARD" | "QUESTION";

export interface ScreenInfo {
    name: ScreenNames;
    data?: {};
}

export interface GameBoardInfo extends ScreenInfo {
    name: "GAME_BOARD";
}
export interface QuestionInfo extends ScreenInfo {
    name: "QUESTION";
    data: { questionId: string };
}

export const Screens = {
    GAME_BOARD: {
        name: "GAME_BOARD",
        endpoint: "/",
    },
    QUESTION: {
        name: "QUESTION",
        endpoint: "/question/:questionId",
        data: {
            questionId: "",
        },
    },
};
