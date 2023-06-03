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
} from "react-bootstrap";
import "../../styles/LoginModal.scss";
import { GRADIENTS, GradientType as GradientName } from "../../types/Gradient";
import { IconNames, IconType, Icons } from "src/assets";
import { Picker, PickerTypes } from "./picker/Picker";

export const LoginModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(true);
    const [color, setColor] = useState<GradientName | undefined>(undefined);
    const [icon, setIcon] = useState<IconNames | undefined>(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggle = () => setShow(!show);
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
                <Modal.Title>Welcome!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
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
                Enter you info
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default LoginModal;
