import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { IGameBoard } from "../types/GameBoard";
import { QUESTIONS_DB } from "../data/QuRepo";
import { Teams, TeamsDataType, intialTeamsData } from "../types/Team";
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
import { Player, PlayerRaw, samplePlayersData } from "../types/Player";
const CLIENTS: { [id: string]: Socket } = {};

let CURRENT_SCREEN: ScreenNames = "LOGIN";
let QUESTION_PAGE_DATE: QuestionPageData = initialQuestionPageState;
let PLAYERS: { [id: string]: PlayerRaw } = samplePlayersData;
let TEAMS_DATA: TeamsDataType = intialTeamsData;
let CURRENT_TEAM_INDEX = 0;
let CURRENT_PLAYER_INDEX = 0;
let CURRENT_TEAM = Teams[CURRENT_TEAM_INDEX];
let CURRENT_PLAYER = "";

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

function generateTeams() {
    // Adding members to teams
    Object.values(PLAYERS).forEach((player, index) => {
        TEAMS_DATA[player.team].players.push(player.id);
    });
    CURRENT_PLAYER =
        TEAMS_DATA[Teams[CURRENT_TEAM_INDEX]].players[CURRENT_PLAYER_INDEX];

    emitToAllClients("pageUpdate", {
        currentPlayer: CURRENT_PLAYER,
        currentTeam: CURRENT_TEAM,
        currentScreen: CURRENT_SCREEN,
    });
}

function nextTurn() {
    const teamBoundary = Teams.length;
    const playerBoundary = TEAMS_DATA[Teams[CURRENT_TEAM_INDEX]].players.length;
    CURRENT_TEAM_INDEX = (CURRENT_TEAM_INDEX + 1) % teamBoundary;
    CURRENT_PLAYER_INDEX = (CURRENT_PLAYER_INDEX + 1) % playerBoundary;
    let CURRENT_TEAM = Teams[CURRENT_TEAM_INDEX];
    CURRENT_PLAYER = TEAMS_DATA[CURRENT_TEAM].players[CURRENT_PLAYER_INDEX];

    console.log(`Next Turn. ${CURRENT_PLAYER} from ${CURRENT_TEAM}`);
    emitToAllClients("pageUpdate", {
        currentPlayer: CURRENT_PLAYER,
        currentTeam: CURRENT_TEAM,
        currentScreen: CURRENT_SCREEN,
    });
}

io.on("connection", (socket) => {
    console.log(`Received a new connection from ${socket.id}`);
    const userId = uuidv4();
    CLIENTS[userId] = socket;
    socket.emit("updateBoard", GameBoard);
    emitToAllClients("sendAllPlayerInfo", PLAYERS);

    socket.on("start", () => {
        generateTeams();
    });
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
            QUESTION_PAGE_DATE.questionId = question.id;
            QUESTION_PAGE_DATE.points = question.points;
            QUESTION_PAGE_DATE.questionType = question.type;
            emitToAllClients("transitionToQuestion", question);
        }
    });

    socket.on("nextTurn", () => {
        nextTurn();
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

    socket.on("updatePlayerData", (playerDataUpdate) => {
        const targetPlayer = playerDataUpdate.id;
        PLAYERS[targetPlayer] = playerDataUpdate;
        // emitToAllClients("playersUpdated", playerDataUpdate);
        emitToAllClients("sendAllPlayerInfo", PLAYERS);
    });
});

app.get("/test", () => {
    console.log("RECEIVED");
});
export {};
