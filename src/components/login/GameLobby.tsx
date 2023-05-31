import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { User } from "src/types/User";
import { ReactComponent as ICON } from "../../assets/cyclops.svg";
import { Icons } from "../../assets";

//@ts-ignore
// import generator from "uigradients";

const Lobby = () => {
    return <></>;
};

const PlayerCard = ({ player }: { player: User }) => {
    const cardRef: React.RefObject<HTMLDivElement> = useRef(null);
    const shade = player.color;
    const ICON = Icons[player.icon]
    console.log("Hey");
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
            <ICON
                width={"100%"}
                height={"100%"}
                opacity={0.9}
                className={shade}
                style={{ backgroundImage: "none" }}
            />
        </div>
    );
};
export const GameLobby = () => {
    const player1 = new User("Peter Parker", "desert_glow", "Hulk");
    const player2 = new User("Nicholas Fury", "mauve", "Hulk");
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
