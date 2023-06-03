import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Player } from "src/types/Player";
import { Icons } from "../../assets";

//@ts-ignore
// import generator from "uigradients";

const Lobby = () => {
    return <></>;
};

const PlayerCard = ({ player }: { player: Player }) => {
    const cardRef: React.RefObject<HTMLDivElement> = useRef(null);
    const shade = player.color;
    const ICON = Icons[player.icon];
    return (
        <div
            ref={cardRef}
            className={`col p-4 ${shade}`}
            style={{
                height: 500,
                borderRadius: "2rem",
            }}
        >
            <h3>{player.madeUpNames}</h3>
            {<ICON width={"100%"} height={"100%"} />}
        </div>
    );
};
export const GameLobby = () => {
    const player1 = new Player("Peter Parker", "desert_glow", "SpiderGwen");
    const player2 = new Player(
        "Nicholas Fury",
        "vermillion_sand",
        "Daredevil"
    );
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
