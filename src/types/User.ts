import { v4 as uuidv4 } from "uuid";
import { PowerBank, Powers } from "./Powers";

export class User {
    id: string;
    powerBank: PowerBank = {
        [Powers.TIME_STOP]: { count: 2, activate: () => {} },
        [Powers.DOUBLE]: { count: 1, activate: () => {} },
        [Powers.HINT]: { count: 3, activate: () => {} },
    };
    constructor(public madeUpNames: string) {
        this.id = uuidv4();
    }
}
