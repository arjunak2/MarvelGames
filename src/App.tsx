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
import {
    QuestionPageActions,
    questionPageActions,
} from "./store/QuestionPageSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { pageActions } from "./store/PageSlice";
import WebFont from "webfontloader";

function renderScreen(currentScreen?: ScreenNames) {
    switch (currentScreen) {
        case "GAME_BOARD":
            return <GameBoard />;
        case "QUESTION":
            return <QuestionPage />;
        case "LOGIN":
        default:
            return <LoginPage />;
    }
}
function App({ currentScreen }: { currentScreen?: ScreenNames }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        socket.on("transitionToGameBoard", () => {
            socket.emit("setQuestionPageData", QuestionPageActions.RESET());
            dispatch(questionPageActions.reset());
            navigate(`/GameBoard`);
        });
        socket.on("pageUpdate", (data) => {
            dispatch(pageActions.updateAll(data));
        });
        WebFont.load({
            google: {
                families: [
                    "Poppins",
                    "Chilanka",
                    "Playfair Display",
                    "Cinzel",
                    "Prata",
                    "Marcellus",
                    "Spectral",
                    "DM Serif Display",
                    "Alice",
                    "Bodoni Moda",
                    "Prata",
                    "Inknut Antiqua",
                    "Noto Serif",
                    "Marko One",
                    "Stoke",
                    "Artifika",
                    "Coromont",
                    "Junge",
                    "Zen Antique Soft",
                    "Amiri Quran",
                    "Scope One",
                    "Crimson Pro",
                    "Expletus Sans",
                    "Tilt Neon",
                    "Tilt Warp",
                    "Pacifico",
                    "Roboto",
                    "Montserrat",
                    "Lexend Deca",
                    "Kanit",
                    "Josefin Sans",
                    "Viga",
                    "Cairo",
                    "Outfit"
                ],
            },
        });
    }, []);

    return (
        <div className="App">
            <Outlet />
        </div>
    );
}

export default App;
