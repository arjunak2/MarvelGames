import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { User } from "src/types/User";

//@ts-ignore
// import generator from "uigradients";

const Lobby = () => {
    return <></>;
};

const PlayerCard = ({ player }: { player: User }) => {
    return (
        <div
            className="col p-4 vermillion_sand"
            style={{
                height: 500,
                borderRadius: "2rem",
            }}
        >
            <h3>{player.madeUpNames}</h3>
        </div>
    );
};
export const GameLobby = () => {
    const player1 = new User("Peter Parker", "teal");
    const player2 = new User("Nicholas Fury", "#A15590");
    return (
        <>
            <h1>{"Lobby"}</h1>
            <div className="container-fluid row gap-4">
                <PlayerCard player={player1} />
                <PlayerCard player={player2} />
            </div>
        </>
    );
};

export default GameLobby;
