import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { IGameBoard } from "../types/GameBoard";
import { QUESTIONS_DB } from "../data/QuRepo";
let GameBoard: IGameBoard = require("../data/GameBoard").GBData;
import { GBData } from "../data/GameBoard";

import { v4 as uuidv4 } from "uuid";
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from "./ServerTypes";
import { Question } from "../types/Question";
import {
    GameBoardNavData,
    QuestionNavData,
    ScreenNames,
} from "../types/Screens";
import {
    QuestionPageData,
    initialState as initialQuestionPageState,
} from "../types/PageData";

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
let QUESTION_PAGE_DATE: QuestionPageData = initialQuestionPageState;

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

type emitParams = Parameters<typeof io.emit>;
export const emitToOtherClients: (
    socketid: string,
    ...otherParams: emitParams
) => boolean = (socketId, ev, ...args) => {
    for (let user in CLIENTS) {
        const ID = CLIENTS[user].id;
        if (socketId === ID) {
            continue;
        } else {
            CLIENTS[user].emit(ev, ...args);
        }
    }

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
    socket.on("navigate", (info: GameBoardNavData | QuestionNavData) => {
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
    socket.on("updateQuestionPageData", (dataUpdate) => {
        QUESTION_PAGE_DATE = { ...QUESTION_PAGE_DATE, ...dataUpdate };
        emitToAllClients("questionPageDataUpdated", dataUpdate);
    });

    socket.on("setQuestionPageData", (questionPageData) => {
        QUESTION_PAGE_DATE = questionPageData;
    });
});

app.get("/test", () => {
    console.log("RECEIVED");
});
export {};
