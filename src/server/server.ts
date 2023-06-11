import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { IGameBoard } from "../types/GameBoard";
import { QUESTIONS_DB } from "../data/QuRepo";
import {
    TeamNames,
    Teams,
    TeamsDataType,
    intialTeamsData,
} from "../types/Team";
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
    PageSlice,
    QuestionPageData,
    initialState as initialQuestionPageState,
} from "../types/PageData";
import { Player, PlayerRaw, samplePlayersData } from "../types/Player";
const CLIENTS: { [id: string]: Socket } = {};

let QUESTION_PAGE_DATE: QuestionPageData = initialQuestionPageState;
let PLAYERS: { [id: string]: PlayerRaw } = {};
let CURRENT_TEAM_INDEX = 0;

let PAGE_DATA: PageSlice = {
    currentPlayer: "",
    currentTeam: Teams[CURRENT_TEAM_INDEX],
    currentScreen: "LOGIN",
    teamData: intialTeamsData,
};
let ITERATOR = {
    [Teams[0]]: 0,
    [Teams[1]]: 1,
};

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
    PAGE_DATA.currentScreen = screen;
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
    Object.values(PLAYERS).forEach((player) => {
        PAGE_DATA.teamData[player.team].players.push(player.id);
    });
    PAGE_DATA.currentPlayer =
        PAGE_DATA.teamData[Teams[CURRENT_TEAM_INDEX]].players[0];
    if (PAGE_DATA.currentPlayer === undefined)
        PAGE_DATA.currentPlayer = PAGE_DATA.teamData[Teams[0]].players[0];

    emitToAllClients("pageUpdate", PAGE_DATA);
}

function nextTurn() {
    const NEW_TEAM_INDEX = (CURRENT_TEAM_INDEX + 1) % Teams.length;
    const NEW_TEAM = Teams[NEW_TEAM_INDEX];
    const NEW_PLAYER_INDEX =
        (ITERATOR[NEW_TEAM] + 1) % PAGE_DATA.teamData[NEW_TEAM].players.length;
    const NEW_PLAYER = PAGE_DATA.teamData[NEW_TEAM].players[NEW_PLAYER_INDEX];

    PAGE_DATA.currentPlayer = NEW_PLAYER;
    PAGE_DATA.currentTeam = NEW_TEAM;

    CURRENT_TEAM_INDEX = NEW_TEAM_INDEX;
    ITERATOR[NEW_TEAM] = NEW_PLAYER_INDEX;

    console.log(`Next Turn. ${NEW_PLAYER} from ${NEW_TEAM}`);
    emitToAllClients("pageUpdate", PAGE_DATA);
}

function setUpListeners(
    socket: Socket<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >
) {
    socket.on("start", () => {
        generateTeams();
    });
    socket.on("getGameBoard", () => {
        socket.emit("updateBoard", GameBoard);
    });
    socket.on("button", () => {
        console.log("The Server received this.");
        socket.emit("inform", `Hello, you sent -> "message"`);
    });

    socket.on("select", (question, category) => {
        // console.log(
        //     `${socket.id} is hovering over the ${question.points} tile for ${category}`
        // );
        GameBoard[category][question.points].isHovered = true;
        updateBoard();
    });
    socket.on("deselect", (question, category) => {
        // console.log(
        //     `${socket.id} is leaving the ${question.points} tile for ${category}`
        // );
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
            GameBoard[question.category][question.points].isAnswered = true;
            updateBoard();
        }
    });

    socket.on("nextTurn", () => {
        nextTurn();
    });

    socket.on("retrieveQuestion", (questionId) => {
        const question = readQuestion(questionId);
        console.log("Sending back question", question);

        if (PAGE_DATA.currentScreen === "GAME_BOARD") {
            Object.values(CLIENTS).forEach((ss) => {
                ss.emit("sendQuestion", question);
            });
        } else {
            socket.emit("sendQuestion", question);
        }
    });
    socket.on("updateQuestionPageData", (dataUpdate) => {
        QUESTION_PAGE_DATE = { ...QUESTION_PAGE_DATE, ...dataUpdate };
        console.log(
            `Updating server QUESTION_PAGE_DATA to ${JSON.stringify(
                QUESTION_PAGE_DATE
            )}`
        );
        if (QUESTION_PAGE_DATE.chosenAnswer) {
            console.log(
                `Question ${QUESTION_PAGE_DATE.questionId} was answered with:${QUESTION_PAGE_DATE.chosenAnswer}`
            );
        }
        emitToAllClients("questionPageDataUpdated", dataUpdate);
    });

    socket.on("setQuestionPageData", (questionPageData) => {
        QUESTION_PAGE_DATE = questionPageData;
        console.log(
            `Setting server QUESTION_PAGE_DATA to ${JSON.stringify(
                QUESTION_PAGE_DATE
            )}`
        );
    });

    socket.on("updatePlayerData", (playerDataUpdate) => {
        const targetPlayer = playerDataUpdate.id;
        PLAYERS[targetPlayer] = playerDataUpdate;
        // emitToAllClients("playersUpdated", playerDataUpdate);
        console.log(`Updating Player Data to `, JSON.stringify(PLAYERS));
        emitToAllClients("sendAllPlayerInfo", PLAYERS);
    });

    socket.on("updatePage", (pageSlice) => {
        PAGE_DATA = pageSlice;
        emitToAllClients("pageUpdate", pageSlice);
    });
}

io.on("connection", (socket) => {
    // register client
    console.log(`Received a new connection from ${socket.id}`);
    const userId = uuidv4();
    CLIENTS[userId] = socket;

    // update gameboard
    socket.emit("updateBoard", GameBoard);

    // update page info
    socket.emit("sendAllPlayerInfo", PLAYERS);
    if (PAGE_DATA.currentPlayer != undefined && PAGE_DATA.currentPlayer != "") {
        socket.emit("pageUpdate", PAGE_DATA);
    }
    // send question info
    if (PAGE_DATA.currentScreen === "QUESTION") {
    }

    // set up socket listeners
    setUpListeners(socket);
});

app.get("/test", () => {
    console.log("RECEIVED");
});
export {};
