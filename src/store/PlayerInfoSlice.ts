import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GradientType } from "src/types/Gradient";
import { Player, PlayerRaw } from "src/types/Player";

interface Players {
    [id: string]: PlayerRaw;
}

interface PlayerInfo {
    id: undefined | string;
    players: Players;
}

const sampleData: PlayerInfo = {
    id: localStorage.getItem("playerId") || undefined,
    players: {
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
            team: null,
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
            team: null,
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
            team: null,
        },
    },
};
const initialState: PlayerInfo = {
    id: localStorage.getItem("playerId") || undefined,
    players: {},
};
export const playerInfoSlice = createSlice({
    name: "playerInfo",
    initialState,
    reducers: {
        updatePlayerInfo: (
            state,
            { payload: playerInfo }: PayloadAction<PlayerRaw>
        ) => {
            state.players[playerInfo.id] = playerInfo;
            return state;
        },
        updateAllPlayerInfo: (
            state,
            { payload: players }: PayloadAction<Players>
        ) => {
            state.players = players;
            return state;
        },

        addPlayer: (state, { payload: id }: PayloadAction<string>) => {
            state.id = id;
        },
    },
});

export const playerInfoActions = playerInfoSlice.actions;

export default playerInfoSlice.reducer;
