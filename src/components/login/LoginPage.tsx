import React, { useEffect, useRef, useState } from "react";
import GameLobby from "./GameLobby";
import { LoginModal } from "./LoginModal";
import { TeamModal } from "./TeamModal";
import "../../styles/Gradient.scss";
import { useSelector } from "src/store";
import { ModalActions } from "src/types/Modal";

export const LoginPage = () => {
    const { id, players } = useSelector((state) => {
        return state.playerInfo;
    });
    const loggedInCheck = id ? true : false;
    const [modalVisibile, setModalVisibility] = useState(
        loggedInCheck ? false : true
    );
    const modalActions: ModalActions = {
        close: () => setModalVisibility(false),
        show: () => setModalVisibility(true),
        toggle: () => setModalVisibility(!modalVisibile),
    };
    const loggedInPlayer = id ? players[id]: undefined
    return (
        <>
            <LoginModal
                visible={modalVisibile}
                modalActions={modalActions}
                loggedInPlayer={loggedInPlayer}
            />
            <TeamModal />
            <GameLobby modalActions={modalActions} />
        </>
    );
};

export default LoginPage;
