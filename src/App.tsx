import React, { useEffect } from "react";
import "./styles/App.scss";
import { GameBoard } from "./components/GameBoard";
import "bootstrap";
import { QuestionPage } from "./components/question/Question";
import { LoginPage } from "./components/login/LoginPage";
import { socket } from "./utils/WebSocket";
import { ScreenNames } from "./types/Screens";
import { useDispatch } from "./store";
import { playerInfoActions } from "./store/PlayerInfoSlice";

function renderScreen(currentScreen: ScreenNames) {
    switch (currentScreen) {
        case "GAME_BOARD":
            return <GameBoard />;
        case "QUESTION":
            return <QuestionPage />;
        case "LOGIN":
            return <LoginPage />;
    }
}
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        socket.on("connect", () => {
            console.log(`WebSocket connection established! Id:${socket.id}`);
        });

        socket.on("playersUpdated", (playerData) => {
            dispatch(playerInfoActions.updatePlayerInfo(playerData));
        });
        socket.on("sendAllPlayerInfo", (players) => {
            dispatch(playerInfoActions.updateAllPlayerInfo(players));
        });
    }, []);

    return <div className="App">{renderScreen("LOGIN")}</div>;
}

export default App;
