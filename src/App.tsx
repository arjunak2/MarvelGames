import React from "react";
import "./styles/App.scss";
import { GameBoard } from "./components/GameBoard";
import "bootstrap";
import { QuestionPage } from "./components/question/Question";

enum Screens {
  GAME_BOARD,
  QUESTION
}

function renderScreen(currentScreen: Screens) {
    switch (currentScreen) {
        case Screens.GAME_BOARD:
            return <GameBoard />;
        case Screens.QUESTION:
            return <QuestionPage />;
    }
}
function App() {
    const currentScreen = Screens.GAME_BOARD;

    return <div className="App">{renderScreen(currentScreen)}</div>;
}

export default App;
