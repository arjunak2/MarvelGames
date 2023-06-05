import { v4 as uuidv4 } from "uuid";
import { PowerBank, Powers } from "./Powers";
import { IconNames } from "../assets";
import { GradientType } from "./Gradient";
import { plainToClass } from "class-transformer";
import { TeamNames, Teams } from "./Team";

export interface PlayerRaw {
    id: string;
    powerBank: {
        [Powers.TIME_STOP]: { count: number };
        [Powers.DOUBLE]: { count: number };
        [Powers.HINT]: { count: number };
    };
    team: TeamNames;
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

export interface Players {
    [id: string]: PlayerRaw;
}

export const samplePlayersData: Players = {
    "GwenStacy-9e4alf": {
        id: "GwenStacy-9e4alf",
        madeUpNames: "Gwen Stacy",
        color: "desert_glow",
        icon: "SpiderGwen",
        powerBank: {
            timestop: { count: 2 },
            double: { count: 1 },
            hint: { count: 3 },
        },
        team: Teams[0],
    },
    "NicholasFury-e43046": {
        id: "NicholasFury-e43046",
        madeUpNames: "Nicholas Fury",
        color: "dark_forest",
        icon: "BlackWidow",
        powerBank: {
            timestop: { count: 2 },
            double: { count: 1 },
            hint: { count: 3 },
        },
        team: Teams[1],
    },
    "MrTerrific-e43046": {
        id: "MrTerrific-e43046",
        madeUpNames: "MrTerrific",
        color: "morning_eggplant",
        icon: "WolverineCute",
        powerBank: {
            timestop: { count: 2 },
            double: { count: 1 },
            hint: { count: 3 },
        },
        team: Teams[0],
    },
};