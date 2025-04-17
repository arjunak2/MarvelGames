import { io, Socket } from "socket.io-client";
import {
    ServerToClientEvents,
    ClientToServerEvents,
} from "../server/ServerTypes";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();
socket.on("connect", () => {
    console.log(`WebSocket connection established! Id:${socket.id}`);
});

socket.on("inform", (msg) => {
    console.log(`Received info back from the server`);
    console.log(msg);
});
