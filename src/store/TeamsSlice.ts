import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GradientType } from "src/types/Gradient";
import { Player, PlayerRaw } from "src/types/Player";
import { Team, intialTeamsData } from "src/types/Team";

const initialState = intialTeamsData;
export const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        updateTeam: (state, { payload: team }: PayloadAction<Team>) => {
            state[team.name] = team
            return state
        },
    },
});

export const teamsActions = teamsSlice.actions;

export default teamsSlice.reducer;
