import { v4 as uuidv4 } from "uuid";
import { PowerBank, Powers } from "./Powers";
import { IconNames } from "../assets";
import { GradientType } from "./Gradient";

export class User {
    id: string;
    powerBank: PowerBank = {
        [Powers.TIME_STOP]: { count: 2, activate: () => {} },
        [Powers.DOUBLE]: { count: 1, activate: () => {} },
        [Powers.HINT]: { count: 3, activate: () => {} },
    };
    team: null | string = null;
    constructor(
        public madeUpNames: string,
        public color: GradientType,
        public icon: IconNames
    ) {
        this.id = uuidv4();
    }
    joinTeam(teamId: string) {
        this.team = teamId;
    }
}
