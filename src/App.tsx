import React, { useEffect } from "react";
import "./styles/App.scss";
import { GameBoard } from "./components/GameBoard";
import "bootstrap";
import { QuestionPage } from "./components/question/Question";
import { socket } from "./utils/WebSocket";
import { ScreenNames } from "./types/Screens";

function renderScreen(currentScreen: ScreenNames) {
    switch (currentScreen) {
        case "GAME_BOARD":
            return <GameBoard />;
        case "QUESTION":
            return <QuestionPage />;
    }
}
function App() {
    useEffect(() => {
        socket.on("connect", () => {
            console.log(`WebSocket connection established! Id:${socket.id}`);
        });
    }, []);

    return <div className="App">{renderScreen("GAME_BOARD")}</div>;
}

export default App;
