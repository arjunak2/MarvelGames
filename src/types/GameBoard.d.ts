import { Points, Question } from "./Question";

interface Tileinfo {
    isHovered: boolean;
    id: string;
    points: Points;
}

type GameBoardTile = {
    [index in Points]: Question;
};
export interface IGameBoard {
    [category: string]: GameBoardTile;
}
