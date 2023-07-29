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
        <div ref={cardRef} className={`${shade} player-card`}>
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
    const Title = () => <h2>{teamName}</h2>;
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
        <div className="team-section">
            <Title />
            <div className="card-container">{PLAYER_CARDS}</div>
        </div>
    );
};

export const GameLobby = ({ modalActions }: { modalActions: ModalActions }) => {
    const dispatch = useDispatch();

    const { players, isGrandMaster, currentPlayer } = useSelector((store) => {
        let { players } = store.playerInfo;
        let isGrandMaster = store.playerInfo.id == "master";
        let { currentPlayer } = store.page;
        return { players, isGrandMaster, currentPlayer };
    });

    useEffect(() => {
        const pageUpdateListener = () => {
            goToGameBoard();
        };
        socket.on("pageUpdate", pageUpdateListener);

        return () => {
            socket.off("pageUpdate", pageUpdateListener);
        };
    }, []);

    const PLAYERS = Object.values(players);

    const start = () => {
        socket.emit("start");
    };

    const goToGameBoard = () => {
        socket.emit("navigate", { name: "GAME_BOARD" });
    };

    return (
        <div className="lobby-container" style={{ height: "100vh" }}>
            <h1 className="title">{"LOBBY"}</h1>
            <div className="lobby-content">
                <TeamSection
                    key={Teams[0]}
                    teamName={Teams[0]}
                    players={PLAYERS}
                    modalActions={modalActions}
                />
                <div className="divider"></div>
                <TeamSection
                    key={Teams[1]}
                    teamName={Teams[1]}
                    players={PLAYERS}
                    modalActions={modalActions}
                />
            </div>
            {isGrandMaster && <HomeButton visible={true} onClick={start} />}
        </div>
    );
};

export default GameLobby;
