import React, { useEffect, useState } from "react";
import GameLobby from "./GameLobby";
import { LoginModal } from "./LoginModal";
import { TeamModal } from "./TeamModal";

export const LoginPage = () => {
    return (
        <>
            <GameLobby />
            <LoginModal />
            <TeamModal />
        </>
    );
};

export default LoginPage;
