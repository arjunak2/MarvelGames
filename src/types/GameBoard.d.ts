import { Points, Question } from "./Question";

interface Tileinfo {
    isHovered: boolean;
    isAnswered: boolean;
    id: string;
    points: Points;
}

type GameBoardTile = {
    [index in Points]: Tileinfo;
};
export interface IGameBoard {
    [category: string]: GameBoardTile;
}
