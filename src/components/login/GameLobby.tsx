import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Player, PlayerRaw, mapJsonToPlayer } from "src/types/Player";
import { Icons, Symbols } from "../../assets";
import { useSelector } from "src/store";
import { ModalActions } from "src/types/Modal";
import { TeamNames, Teams } from "src/types/Team";

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

const TeamSection = ({
    teamName,
    players,
    modalActions,
}: {
    teamName: TeamNames;
    players: PlayerRaw[];
    modalActions: ModalActions;
}) => {
    const { id } = useSelector((state) => {
        return state.playerInfo;
    });
    const Title = <h2>{teamName}</h2>;
    const TEAM_PLAYERS = players.filter((player) => player.team === teamName);
    const PLAYER_CARDS = TEAM_PLAYERS.map((player) => {
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
        <div className="col gap-5">
            <h2>{teamName}</h2>
            <div className="container-fluid row gap-5">{PLAYER_CARDS}</div>
        </div>
    );
};

export const GameLobby = ({ modalActions }: { modalActions: ModalActions }) => {
    const { players } = useSelector((state) => {
        return state.playerInfo;
    });
    const PLAYERS = Object.values(players);

    return (
        <>
            <h1
                style={{
                    fontSize: "4rem",
                    fontWeight: 700,
                    color: "rgb(68 68 68)",
                    marginBottom: 40,
                }}
            >
                {"Lobby"}
            </h1>
            <div className="container-fluid row gap-5">
                {Teams.map((teamName) => (
                    <TeamSection
                        teamName={teamName}
                        players={PLAYERS}
                        modalActions={modalActions}
                    />
                ))}
            </div>
            {/* <div className="container-fluid row gap-5">{PLAYER_CARDS}</div> */}
        </>
    );
};

export default GameLobby;
