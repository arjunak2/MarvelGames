import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Player, PlayerRaw } from "src/types/Player";

interface PlayerInfo {
    playerId: undefined | string;
    players: { [id: string]: PlayerRaw };
}

const sampleData: PlayerInfo = {
    playerId: localStorage.getItem("playerId") || undefined,
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
    playerId: localStorage.getItem("playerId") || undefined,
    players: {},
};
export const playerInfoSlice = createSlice({
    name: "playerInfo",
    initialState: sampleData,
    reducers: {
        updatePlayerInfo: (
            state,
            { payload: playerInfo }: PayloadAction<Partial<PlayerRaw>>
        ) => {
            return { ...state, ...playerInfo };
        },

        addPlayer: (state, { payload: playerId }: PayloadAction<string>) => {
            state.playerId = playerId;
        },
    },
});

export const playerInfoActions = playerInfoSlice.actions;

export default playerInfoSlice.reducer;
