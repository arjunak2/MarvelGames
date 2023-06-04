import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Player, mapJsonToPlayer } from "src/types/Player";
import { Icons } from "../../assets";
import { useSelector } from "src/store";

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
    const { players } = useSelector((state) => {
        return state.playerInfo;
    });
    const PLAYERS = Object.values(players);
    const PLAYER_CARDS = PLAYERS.map((player) => {
        return (
            <PlayerCard
                key={player.id}
                player={mapJsonToPlayer(player as Player)}
            />
        );
    });
    return (
        <>
            <h1>{"Lobby"}</h1>
            <div className="container-fluid row gap-4">{PLAYER_CARDS}</div>
        </>
    );
};

export default GameLobby;
