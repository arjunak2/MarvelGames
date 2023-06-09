import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GradientType } from "src/types/Gradient";
import { Player, PlayerRaw, Players } from "src/types/Player";
import { TeamNames, Teams } from "src/types/Team";
import { IconNames } from "src/assets";

interface PlayerInfo {
    id: undefined | string;
    madeUpNames: undefined | string;
    color: GradientType | undefined;
    icon: IconNames | undefined;
    team: TeamNames | undefined;
    players: Players;
}

const initialState: PlayerInfo = {
    id: localStorage.getItem("playerId") || undefined,
    madeUpNames: "",
    color: undefined,
    icon: undefined,
    team: undefined,
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
            if (state.id && players[state.id]) {
                state.color = players[state.id].color;
                state.icon = players[state.id].icon;
                state.madeUpNames = players[state.id].madeUpNames;
                state.team = players[state.id].team;
            }
            return state;
        },

        addPlayer: (state, { payload: id }: PayloadAction<string>) => {
            state.id = id;
        },

        set: (state, { payload: data }: PayloadAction<Partial<PlayerRaw>>) => {
            return { ...state, ...data };
        },
    },
});

export const playerInfoActions = playerInfoSlice.actions;

export default playerInfoSlice.reducer;
