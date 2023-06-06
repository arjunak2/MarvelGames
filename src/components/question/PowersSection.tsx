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

interface PowerSectionProps {
    powerBank: PowerBank;
    pageState: QuestionPageState;
}
interface PowerButtonProps {
    power: Powers;
    powerBank: PowerBank;
    disabled?: boolean;
}

export function PowerButton({ power, powerBank, disabled }: PowerButtonProps) {
    const [activated, setActivated] = useState(false);
    const powerCount = powerBank[power].count;
    const powerDepleted = powerCount <= 0;
    const isPowerDisabled = disabled || powerDepleted || activated;

    const updatePowerCount = () => {
        powerBank[power].count--;
        console.log(`Updating power bank to:`, powerBank);
    };
    const activate = () => {
        updatePowerCount();
        powerBank[power].activate();
        setActivated(true);
        console.log(`Activating ${power}`);
    };

    const Icon = Symbols[power]
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

export function PowerSection({ powerBank, pageState }: PowerSectionProps) {
    const areAllPowersDisabled = pageState === QuestionPageState.COMPLETED;
    return (
        <ButtonGroup className="powerCotainer">
            <PowerButton
                power={Powers.DOUBLE}
                powerBank={powerBank}
                disabled={areAllPowersDisabled}
            />
            <PowerButton
                power={Powers.TIME_STOP}
                powerBank={powerBank}
                disabled={areAllPowersDisabled}
            />
            <PowerButton
                power={Powers.HINT}
                powerBank={powerBank}
                disabled={areAllPowersDisabled}
            />
        </ButtonGroup>
    );
}
