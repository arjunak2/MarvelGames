import { Question } from "./Question";

interface QQ {
    [index: number]: Question;
}
export interface IGameBoard {
    [category: string]: QQ;
}
