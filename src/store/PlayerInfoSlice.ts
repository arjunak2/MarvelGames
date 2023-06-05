import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GradientType } from "src/types/Gradient";
import { Player, PlayerRaw, Players } from "src/types/Player";
import { Teams } from "src/types/Team";

interface PlayerInfo {
    id: undefined | string;
    players: Players;
}

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
