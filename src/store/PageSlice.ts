import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GradientType } from "src/types/Gradient";
import { PageSlice } from "src/types/PageData";
import { Player, PlayerRaw } from "src/types/Player";
import { ScreenNames } from "src/types/Screens";
import { Team, intialTeamsData } from "src/types/Team";
const initialState: PageSlice = {
    currentPlayer: "",
    currentTeam: "",
    currentScreen: "LOGIN",
    teamData: intialTeamsData,
};
export const pageSlice = createSlice({
    name: "page",
    initialState,
    reducers: {
        updateTeam: (state, { payload: team }: PayloadAction<Team>) => {},
        updateScreen: (
            state,
            { payload: screen }: PayloadAction<ScreenNames>
        ) => {},
        updateAll: (state, { payload: page }: PayloadAction<PageSlice>) => {
            return { ...state, ...page };
        },
    },
});

export const pageActions = pageSlice.actions;

export default pageSlice.reducer;
