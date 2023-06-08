import React, { useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Player, PlayerRaw, mapJsonToPlayer } from "src/types/Player";
import { Icons, Symbols } from "../../assets";
import { useSelector } from "src/store";
import { ModalActions } from "src/types/Modal";
import { TeamNames, Teams } from "src/types/Team";
import "../../styles/Lobby.scss";
import { HomeButton } from "../HomeButton";
import { socket } from "src/utils/WebSocket";
import { useDispatch } from "react-redux";
import { pageActions } from "src/store/PageSlice";

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
                <div className="card-container row gap-5 justify-content-center">
                    {PLAYER_CARDS}
                </div>
            </div>
        </div>
    );
};

export const GameLobby = ({ modalActions }: { modalActions: ModalActions }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const pageUpdateListener = () => {
            goToGameBoard();
        };
        socket.on("pageUpdate", pageUpdateListener);

        return () => {
            socket.off("pageUpdate", pageUpdateListener);
        };
    }, []);
    const { players, isGrandMaster } = useSelector((store) => {
        let { players } = store.playerInfo;
        let isGrandMaster = store.playerInfo.id == "master";
        return { players, isGrandMaster };
    });

    const PLAYERS = Object.values(players);

    const start = () => {
        socket.emit("start");
    };

    const goToGameBoard = () => {
        socket.emit("navigate", { name: "GAME_BOARD" });
    };

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
            <div
                className="container-fluid d-flex"
                style={{ flex: 1, width: "100%", justifyContent: "center" }}
            >
                <div className="row" style={{ width: "100%" }}>
                    {Teams.map((teamName) => (
                        <TeamSection
                            teamName={teamName}
                            players={PLAYERS}
                            modalActions={modalActions}
                        />
                    ))}
                </div>
            </div>
            {isGrandMaster && <HomeButton visible={true} onClick={start} />}
        </div>
    );
};

export default GameLobby;
