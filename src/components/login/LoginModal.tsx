import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import {
    Button,
    Dropdown,
    DropdownButton,
    Form,
    Modal,
    Image,
    InputGroup,
    ButtonGroup,
    ToggleButton,
} from "react-bootstrap";
import "../../styles/LoginModal.scss";
import { GRADIENTS, GradientType as GradientName } from "../../types/Gradient";
import { IconNames, IconType, Icons } from "src/assets";
import { Picker, PickerTypes } from "./picker/Picker";
import { Player, PlayerRaw } from "src/types/Player";
import { useDispatch, useSelector } from "src/store";
import { ModalActions } from "src/types/Modal";
import { playerInfoActions } from "src/store/PlayerInfoSlice";
import { socket } from "src/utils/WebSocket";
import { TeamNames, Teams } from "src/types/Team";

interface LoginModalProps {
    visible: boolean;
    modalActions: ModalActions;
    loggedInPlayer?: PlayerRaw;
}
export const LoginModal = ({
    visible,
    modalActions,
    loggedInPlayer,
}: LoginModalProps) => {
    const {
        id: id,
        madeUpNames,
        color,
        icon,
        team,
    } = useSelector((state) => {
        return state.playerInfo;
    });
    const dispatch = useDispatch();
    const name = madeUpNames;

    const setIcon = (icon: IconNames) =>
        dispatch(playerInfoActions.set({ icon: icon }));
    const setTeam = (team: TeamNames) =>
        dispatch(playerInfoActions.set({ team: team }));
    const setName = (name: string) =>
        dispatch(playerInfoActions.set({ madeUpNames: name }));
    const setColor = (color: GradientName) =>
        dispatch(playerInfoActions.set({ color: color }));

    const submit = () => {
        const dataEntered = name && color && icon && team && true;
        if (dataEntered) {
            const player = new Player(name, color, icon, team);
            if (!id) {
                localStorage.setItem("playerId", player.id);
                dispatch(playerInfoActions.addPlayer(player.id));
            }
            socket.emit("updatePlayerData", player);
            modalActions.close();
        } else {
            return;
        }
    };
    return (
        <Modal
            show={visible}
            onHide={modalActions.close}
            backdrop={"static"}
            keyboard={false}
            centered
        >
            <Modal.Header className={color}>
                <Modal.Title>{`Welcome ${name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Enter your personnel details</h5>
                <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                    <Form.Control
                        placeholder="Made up name"
                        aria-label="Made up name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </InputGroup>
                <Picker
                    color={color}
                    value={color}
                    setValue={setColor}
                    pickerType={PickerTypes.COLOR}
                />
                <Picker
                    value={icon}
                    color={color}
                    setValue={setIcon}
                    pickerType={PickerTypes.ICON}
                />
                <ButtonGroup className="mb-2 w-100" size="lg">
                    {Teams.map((teamNameRadio, idx) => (
                        <ToggleButton
                            key={teamNameRadio}
                            id={`${teamNameRadio}`}
                            type="radio"
                            variant="outline-secondary"
                            name="radio"
                            value={team || ""}
                            className={teamNameRadio === team ?  color: undefined}
                            checked={teamNameRadio === team}
                            onChange={(e) => {
                                setTeam(e.currentTarget.id as TeamNames);
                            }}
                        >
                            {teamNameRadio}
                        </ToggleButton>
                    ))}
                </ButtonGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={submit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
