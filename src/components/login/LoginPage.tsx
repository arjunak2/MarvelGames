import React, { useEffect, useState } from "react";
import GameLobby from "./GameLobby";
import { LoginModal } from "./LoginModal";
import { TeamModal } from "./TeamModal";
import "../../styles/Gradient.scss";

export const LoginPage = () => {
    return (
        <>
            <LoginModal />
            <TeamModal />
            <GameLobby />
        </>
    );
};

export default LoginPage;
