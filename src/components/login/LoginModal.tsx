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

interface LoginModalProps {
    name?: string;
    color?: GradientName;
    icon?: IconNames;
}
export const LoginModal = forwardRef((props: LoginModalProps, ref) => {
    const [show, setShow] = useState(true);
    const [name, setName] = useState<string | undefined>(props.name || "");
    const [color, setColor] = useState<GradientName | undefined>(props.color);
    const [icon, setIcon] = useState<IconNames | undefined>(props.icon);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggle = () => setShow(!show);

    const submit = () => {
        const dataEntered = name && color && icon && true;
        if (dataEntered) {
        } else {
            return;
        }
    };

    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow,
        toggle,
        color,
    }));
    return (
        <Modal
            show={show}
            onHide={handleClose}
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
