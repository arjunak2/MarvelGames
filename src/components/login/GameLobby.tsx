import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Player, mapJsonToPlayer } from "src/types/Player";
import { Icons, Symbols } from "../../assets";
import { useSelector } from "src/store";
import { ModalActions } from "src/types/Modal";

//@ts-ignore
// import generator from "uigradients";

const Lobby = () => {
    return <></>;
};

const EditIcon = ({ onClick }: { onClick: () => void }) => {
    return (
        <Symbols.Edit
            className="mt-3"
            onClick={onClick}
            height={40}
            width={40}
        />
    );
};

const PlayerCard = ({
    player,
    self,
    modalActions,
}: {
    player: Player;
    self?: boolean;
    modalActions: ModalActions;
}) => {
    const cardRef: React.RefObject<HTMLDivElement> = useRef(null);
    const shade = player.color;
    const ICON = Icons[player.icon];
    return (
        <div
            ref={cardRef}
            className={`col p-5 ${shade}`}
            style={{
                borderRadius: "2rem",
            }}
        >
            <h3>{player.madeUpNames}</h3>
            <ICON width={"100%"} height={"80%"} />
            {self && <EditIcon onClick={modalActions.show} />}
        </div>
    );
};
export const GameLobby = ({ modalActions }: { modalActions: ModalActions }) => {
    const { id, players } = useSelector((state) => {
        return state.playerInfo;
    });
    const PLAYERS = Object.values(players);
    const PLAYER_CARDS = PLAYERS.map((player) => {
        return (
            <PlayerCard
                key={player.id}
                player={mapJsonToPlayer(player as Player)}
                self={id === player.id}
                modalActions={modalActions}
            />
        );
    });
    return (
        <>
            <h1>{"Lobby"}</h1>
            <div className="container-fluid row gap-5">{PLAYER_CARDS}</div>
        </>
    );
};

export default GameLobby;
