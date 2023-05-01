export enum Powers {
    TIME_STOP = "timestop",
    DOUBLE = "double",
    HINT = "hint",
}

interface PowerConfig {
    count: number,
    activate: () => void
}
export type PowerBank = {
    [index in Powers]: PowerConfig;
};