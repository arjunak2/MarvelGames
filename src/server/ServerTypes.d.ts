import { Tileinfo, IGameBoard } from "../types/GameBoard";
import { Question } from "../types/Question";
export interface ServerToClientEvents {
    noArg: () => void;
    inform: (info: string) => void;
    updateBoard: (board: IGameBoard) => void;
    navigateToQuestion: (question: Question) => void;
}

export interface ClientToServerEvents {
    button: (obj: {}) => void;
    select: (tileInfo: Tileinfo, category: string) => void;
    deselect: (tileInfo: Tileinfo, category: string) => void;
    questionClick: (tileInfo: Tileinfo) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    user: string;
    id: string;
}
