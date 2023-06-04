import { GameBoardNavData, QuestionNavData } from "../types/Screens";
import { Tileinfo, IGameBoard } from "../types/GameBoard";
import { Question } from "../types/Question";
import { PlayerRaw } from "../types/Player";
import { QuestionPageData } from "../types/PageData";
export interface ServerToClientEvents {
    noArg: () => void;
    inform: (info: string) => void;
    playersUpdated: (data: PlayerRaw) => void;
    sendAllPlayerInfo: (players: { [id: string]: PlayerRaw }) => void;
    updateBoard: (board: IGameBoard) => void;
    sendQuestion: (question: Question) => void;
    transitionToGameBoard: () => void;
    transitionToQuestion: (question: Question) => void;
    transition: (data?: Question) => void;
    questionPageDataUpdated: (data: Partial<QuestionPageData>) => void;
    questionPageDataSet: (data: QuestionPageData) => void;
}

export interface ClientToServerEvents {
    button: (obj: {}) => void;
    select: (tileInfo: Tileinfo, category: string) => void;
    deselect: (tileInfo: Tileinfo, category: string) => void;
    retrieveQuestion: (questionId: string) => void;
    navigate: (info: GameBoardNavData | QuestionNavData) => void;
    updateQuestionPageData: (data: Partial<QuestionPageData>) => void;
    setQuestionPageData: (data: QuestionPageData) => void;
    updatePlayerData: (data: PlayerRaw) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    user: string;
    id: string;
}
