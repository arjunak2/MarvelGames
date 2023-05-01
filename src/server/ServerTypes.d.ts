import { Question } from "../types/Question";
export interface ServerToClientEvents {
    noArg: () => void;
    inform: (info: string) => void;
    updateBoard: (board: IGameBoard) => void;
    navigateToQuestion: (question: Question) => {};
}

export interface ClientToServerEvents {
    button: (obj: {}) => void;
    select: (question: Question, category: string) => void;
    deselect: (question: Question, category: string) => void;
    questionClick: (question: Question) => void;
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    user: string;
    id: string;
}
