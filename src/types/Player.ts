import { v4 as uuidv4 } from "uuid";
import { PowerBank, Powers } from "./Powers";
import { IconNames } from "../assets";
import { GradientType } from "./Gradient";
import { plainToClass } from "class-transformer";
import { TeamNames } from "./Team";

export interface PlayerRaw {
    id: string;
    powerBank: {
        [Powers.TIME_STOP]: { count: number };
        [Powers.DOUBLE]: { count: number };
        [Powers.HINT]: { count: number };
    };
    team: undefined | TeamNames;
    madeUpNames: string;
    color: GradientType;
    icon: IconNames;
}

export function generatePlayerId(madeUpNames: string) {
    const randomString = uuidv4().slice(0, 6);
    return `${madeUpNames}-`;
}
export class Player implements PlayerRaw {
    id: string;
    powerBank: PowerBank = {
        [Powers.TIME_STOP]: { count: 2, activate: () => {} },
        [Powers.DOUBLE]: { count: 1, activate: () => {} },
        [Powers.HINT]: { count: 3, activate: () => {} },
    };
    constructor(
        public madeUpNames: string,
        public color: GradientType,
        public icon: IconNames,
        public team: TeamNames,
        id?: string
    ) {
        this.id =
            localStorage.getItem("playerId") ||
            id ||
            generatePlayerId(madeUpNames);
    }
}

export function mapJsonToPlayer(json: Player) {
    return plainToClass(Player, json);
}
