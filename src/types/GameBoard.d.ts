import { Points, Question } from "./Question";

interface Tileinfo {
    isHovered: boolean;
    isAnswered: boolean;
    id: string;
    points: Points;
}

type CategoryTiles = {
    [index in Points]: Tileinfo;
};
export interface IGameBoard {
    [category: string]: CategoryTiles;
}
