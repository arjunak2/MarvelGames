export type ScreenNames = "GAME_BOARD" | "QUESTION";

export interface NavigationData {
    name: ScreenNames;
    data?: {};
}

export interface GameBoardNavData extends NavigationData {
    name: "GAME_BOARD";
}
export interface QuestionNavData extends NavigationData {
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
