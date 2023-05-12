import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { IGameBoard } from "../types/GameBoard";

let GameBoard: IGameBoard = require("../data/GameBoard").GBData;
let QUESTIONS_DB: {
    [id: string]: Question;
} = require("../data/QuestionRepository.json");
import { v4 as uuidv4 } from "uuid";
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from "./ServerTypes";
import { Question } from "../types/Question";
import { GameBoardInfo, QuestionInfo, ScreenNames } from "../types/Screens";

const HOST = "http://localhost:3000";
const PORT = 5000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {
    cors: {
        origin: HOST,
        methods: ["GET", "POST"],
    },
});

httpServer.listen(PORT, () => {
    console.info(`Server started on ${PORT}`);
});

const CLIENTS: { [id: string]: Socket } = {};

let CURRENT_SCREEN: ScreenNames = "GAME_BOARD";
function updateScreen(screen: ScreenNames) {
    console.log(`Updating the screen to ${screen}`);
    CURRENT_SCREEN = screen;
}
export const emitToAllClients: typeof io.emit = (ev, ...args) => {
    Object.values(CLIENTS).forEach((ss) => {
        ss.emit(ev, ...args);
    });
    return true;
};

function updateBoard() {
    emitToAllClients("updateBoard", GameBoard);
}

function readQuestion(questionId: string) {
    return QUESTIONS_DB[questionId];
}

io.on("connection", (socket) => {
    console.log(`Received a new connection from ${socket.id}`);
    const userId = uuidv4();
    CLIENTS[userId] = socket;
    socket.emit("updateBoard", GameBoard);

    socket.on("button", (data) => {
        console.log("The Server received this.");
        socket.emit("inform", `Hello, you sent -> "message"`);
    });

    socket.on("select", (question, category) => {
        console.log(
            `${socket.id} is hovering over the ${question.points} tile for ${category}`
        );
        GameBoard[category][question.points].isHovered = true;
        updateBoard();
    });
    socket.on("deselect", (question, category) => {
        console.log(
            `${socket.id} is leaving the ${question.points} tile for ${category}`
        );
        GameBoard[category][question.points].isHovered = false;
        updateBoard();
    });
    socket.on("navigate", (info: GameBoardInfo | QuestionInfo) => {
        updateScreen(info.name);
        console.log(`Instructing all clients to navigate to ${info.name}`);
        if (info.name === "GAME_BOARD")
            emitToAllClients("transitionToGameBoard");
        else if (info.name === "QUESTION") {
            const question = readQuestion(info.data.questionId);
            emitToAllClients("transitionToQuestion", question);
        }
    });

    socket.on("retrieveQuestion", (questionId) => {
        const question = readQuestion(questionId);
        console.log("Sending back question", question);

        if (CURRENT_SCREEN === "GAME_BOARD") {
            Object.values(CLIENTS).forEach((ss) => {
                ss.emit("sendQuestion", question);
            });
        } else {
            socket.emit("sendQuestion", question);
        }
    });
});

app.get("/test", () => {
    console.log("RECEIVED");
});
export {};
