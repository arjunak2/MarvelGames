export const Teams = ["Avengers", "X-Men"] as const;
export type TeamNames = (typeof Teams)[number];
export interface Team {
    name: TeamNames;
    players: string[];
    score: number;
}

export type TeamsDataType = {
    [index in TeamNames]: Team;
};

export const intialTeamsData: TeamsDataType = {
    [Teams[0]]: {
        name: Teams[0],
        players: [],
        score: 0,
    },
    [Teams[1]]: {
        name: Teams[1],
        players: [],
        score: 0,
    },
};
