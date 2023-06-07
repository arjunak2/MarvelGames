import React, { useState } from "react";
import { PowerBank, Powers } from "src/types/Powers";
import { QuestionPageState } from "../../types/QuestionPage";
import {
    ToggleButton,
    ToggleButtonGroup,
    Button,
    ButtonGroup,
} from "react-bootstrap";
import { produce } from "immer";
import { IconType, Symbols } from "src/assets";
import { socket } from "src/utils/WebSocket";
import { QuestionPageActions } from "src/store/QuestionPageSlice";
import { Player } from "src/types/Player";
import { useSelector } from "src/store";
import { Points } from "src/types/Question";
import { cloneDeep } from "lodash";

interface PowerSectionProps {
    player: Player;
    pageState: QuestionPageState;
    points: Points;
}
interface PowerButtonProps {
    power: Powers;
    player: Player;
    disabled?: boolean;
    points: Points;
}

export function PowerButton({
    power,
    player,
    points,
    disabled,
}: PowerButtonProps) {
    const { powerBank } = player;

    const [activated, setActivated] = useState(false);
    const activatePowers = {
        [Powers.TIME_STOP]: () => {
            socket.emit(
                "updateQuestionPageData",
                QuestionPageActions.TIME_STOP()
            );
        },
        [Powers.DOUBLE]: () => {
            socket.emit(
                "updateQuestionPageData",
                QuestionPageActions.SET_POINTS(points * 2)
            );
        },
        [Powers.HINT]: () => {},
    };
    const powerCount = powerBank[power].count;
    const powerDepleted = powerCount <= 0;
    const isPowerDisabled = disabled || powerDepleted || activated;

    const updatePowerCount = () => {
        const updatedPlayer = cloneDeep(player);
        updatedPlayer.powerBank[power].count--;
        socket.emit("updatePlayerData", updatedPlayer);
        console.log(`Updating power bank to:`, powerBank);
    };
    const activate = () => {
        updatePowerCount();
        activatePowers[power]();
        setActivated(true);
        console.log(`Activating ${power}`);
    };

    const Icon = Symbols[power];
    return (
        <Button
            variant="warning"
            onClick={activate}
            disabled={isPowerDisabled}
            value={power}
        >
            <Icon className="powerIcon" height={"50%"} width={"100%"} />
            <h5>{`${powerCount}`}</h5>
        </Button>
    );
}

export function PowerSection({ player, pageState, points }: PowerSectionProps) {
    const areAllPowersDisabled = pageState === QuestionPageState.COMPLETED;
    return (
        <ButtonGroup className="powerCotainer">
            <PowerButton
                power={Powers.DOUBLE}
                player={player}
                disabled={areAllPowersDisabled}
                points={points}
            />
            <PowerButton
                power={Powers.TIME_STOP}
                player={player}
                disabled={areAllPowersDisabled}
                points={points}
            />
            <PowerButton
                power={Powers.HINT}
                player={player}
                disabled={areAllPowersDisabled}
                points={points}
            />
        </ButtonGroup>
    );
}
