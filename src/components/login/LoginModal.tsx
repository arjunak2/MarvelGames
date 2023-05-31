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

const GradientOption = ({ gradient }: { gradient: GradientName }) => {
    return (
        <Dropdown.Item
            eventKey={gradient}
            as="button"
            className={`d-flex flex-row align-items-center rounded-4 m-2 p-2 ${gradient}`}
        >
            <div
                className={`rounded-circle ${gradient}`}
                style={{ width: "40px", height: "40px" }}
            />
            <h5 className="text-center fs-4 flex-grow-1">{gradient}</h5>
        </Dropdown.Item>
    );
};

const GradientPickerOptions = () => {
    return (
        <Dropdown.Menu>
            {GRADIENTS.map((gradient) => (
                <GradientOption gradient={gradient} />
            ))}
        </Dropdown.Menu>
    );
};

const GradientPicker = ({
    color,
    setColor,
}: {
    color?: GradientName;
    setColor: (color: GradientName) => void;
}) => {
    return (
        <Dropdown
            title="Select Color"
            onSelect={(
                eventKey
            ) => {
                const selectedColor = eventKey;
                setColor(selectedColor as GradientName);
            }}
        >
            <Dropdown.Toggle
                variant="primary"
                className={`w-100 ${color} fs-5 rounded-3`}
                id="colorPicker"
            >
                {color || "Select Color"}
            </Dropdown.Toggle>
            <GradientPickerOptions />
        </Dropdown>
    );
};

            ))}
        </Dropdown.Menu>
    );
};

export const LoginModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(true);
    const [color, setColor] = useState<GradientName | undefined>(undefined);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggle = () => setShow(!show);
    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow,
        toggle,
        color,
    }));

    // const qq = transform.sync( SVG, { icon: true }, { componentName: 'MyComponent' }, )

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
                <GradientPicker color={color} setColor={setColor} />
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
