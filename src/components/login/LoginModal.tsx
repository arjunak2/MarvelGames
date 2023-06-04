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
} from "react-bootstrap";
import "../../styles/LoginModal.scss";
import { GRADIENTS, GradientType as GradientName } from "../../types/Gradient";
import { IconNames, IconType, Icons } from "src/assets";
import { Picker, PickerTypes } from "./picker/Picker";
import { Player } from "src/types/Player";
import { useSelector } from "src/store";

interface LoginModalProps {
    name?: string;
    color?: GradientName;
    icon?: IconNames;
}
export const LoginModal = forwardRef((props: LoginModalProps, ref) => {
    const { playerId } = useSelector((state) => {
        return state.playerInfo;
    });
    const loggedInCheck = playerId ? true : false;
    const [visibility, setVisibility] = useState(loggedInCheck ? false : true);
    const [name, setName] = useState<string | undefined>(props.name || "");
    const [color, setColor] = useState<GradientName | undefined>(props.color);
    const [icon, setIcon] = useState<IconNames | undefined>(props.icon);

    const close = () => setVisibility(false);
    const show = () => setVisibility(true);
    const toggle = () => setVisibility(!visibility);

    const submit = () => {
        const dataEntered = name && color && icon && true;
        if (dataEntered) {
            const player = new Player(name, color, icon);
            localStorage.setItem("playerId", player.id);
            close();
        } else {
            return;
        }
    };

    useImperativeHandle(ref, () => ({
        close,
        show,
        toggle,
        color,
    }));
    return (
        <Modal
            show={visibility}
            onHide={close}
            backdrop={"static"}
            keyboard={false}
            centered
        >
            <Modal.Header className={color}>
                <Modal.Title>{`Welcome ${name}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Enter your personelle details</h5>
                <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                    <Form.Control
                        placeholder="Made up name"
                        aria-label="Made up name"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                </InputGroup>
                <Picker
                    value={color}
                    setValue={setColor}
                    pickerType={PickerTypes.COLOR}
                />
                <Picker
                    value={icon}
                    setValue={setIcon}
                    pickerType={PickerTypes.ICON}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={submit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default LoginModal;
