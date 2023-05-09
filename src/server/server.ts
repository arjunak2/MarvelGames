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

function updateBoard() {
    Object.values(CLIENTS).forEach((sock) => {
        sock.emit("updateBoard", GameBoard);
    });
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
    socket.on("retrieveQuestion", (questionId) => {
        const question = readQuestion(questionId);
        console.log("Sending back question", question);
        socket.emit("sendQuestion", question);
    });
});

app.get("/test", () => {
    console.log("RECEIVED");
});
export {};
