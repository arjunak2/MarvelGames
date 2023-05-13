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

    const pickIcon = (): string => {
        switch (power) {
            case Powers.DOUBLE:
                return "https://www.svgrepo.com/show/511879/double-window-1503.svg";
            case Powers.HINT:
                return "https://www.svgrepo.com/show/425736/spellbook-magic.svg";
            case Powers.TIME_STOP:
                return "https://www.svgrepo.com/show/511171/timer-close.svg";
        }
    };
    return (
        <Button
            variant="warning"
            onClick={activate}
            disabled={isPowerDisabled}
            value={power}
        >
            <img src={pickIcon()} width="30" height="30" />
            {`${powerCount} x`}
        </Button>
    );
}

export function PowerSection({ powerBank, pageState }: PowerSectionProps) {
    const areAllPowersDisabled = pageState === QuestionPageState.COMPLETED;
    return (
        <ButtonGroup>
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
