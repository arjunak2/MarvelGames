import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Player, PlayerRaw, mapJsonToPlayer } from "src/types/Player";
import { Icons, Symbols } from "../../assets";
import { useSelector } from "src/store";
import { ModalActions } from "src/types/Modal";
import { TeamNames, Teams } from "src/types/Team";
import "../../styles/Lobby.scss";

//@ts-ignore
// import generator from "uigradients";

const Lobby = () => {
    return <></>;
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
        <div ref={cardRef} className={`col p-5 ${shade} player-card`}>
            <h3 className="player-card-name">{player.madeUpNames}</h3>
            <ICON className="player-icon" />
            {self && (
                <Symbols.Edit
                    className="mt-3 edit-icon"
                    onClick={modalActions.show}
                    height={40}
                    width={40}
                />
            )}
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
        <div className="col d-flex flex-column">
            <h2>{teamName}</h2>
            <div className="container-fluid d-flex" style={{ flex: 1 }}>
                <div className="card-container row gap-3 justify-content-center">
                    {PLAYER_CARDS}
                </div>
            </div>
        </div>
    );
};

export const GameLobby = ({ modalActions }: { modalActions: ModalActions }) => {
    const { players } = useSelector((state) => {
        return state.playerInfo;
    });
    const PLAYERS = Object.values(players);

    return (
        <div className="d-flex flex-column" style={{ height: "100vh" }}>
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
            <div className="container-fluid d-flex" style={{ flex: 1 }}>
                <div className="row">
                    {Teams.map((teamName) => (
                        <TeamSection
                            teamName={teamName}
                            players={PLAYERS}
                            modalActions={modalActions}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameLobby;
