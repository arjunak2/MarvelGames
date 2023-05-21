import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import "../../styles/LoginModal.scss";
import { SlowBuffer } from "buffer";

export const GRADIENTS = [
    "aqua_splash",
    "vicious_stance",
    "young_passion",
    "morning_salad",
    "flying_lemon",
    "colorful_peach",
    "dense_water",
    "child_care",
    "morning_eggplant",
    "apple_dew",
    "peach_stone",
    "slate",
    "vermillion_sand",
    "desert_glow",
    "bruised_desert",
    "bleached_blue",
    "decent",
    "royal",
    "shades_50",
    "mauve",
    "summer_orange",
    "morning_dew",
    "scorched_desert",
    "dark_forest",
    "everlasting_sky",
    "blessing",
    "soft_cherish",
];

const ColorOption = ({
    gradient,
}: {
    gradient: (typeof GRADIENTS)[number];
}) => {
    return (
        <Dropdown.Item
            eventKey="1"
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

const DropDownOptions = () => {
    return (
        <Dropdown.Menu>
            {GRADIENTS.map((gradient) => (
                <ColorOption gradient={gradient} />
            ))}
        </Dropdown.Menu>
    );
};

export const LoginModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(true);
    const [color, setColor] = useState<string | undefined>(undefined);

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
                <Dropdown
                    title="Select Color"
                    onSelect={(
                        eventKey,
                        event: React.SyntheticEvent<unknown, Event>
                    ) => {
                        const selectedColor = (event.target as HTMLElement)
                            .innerText;

                        setColor(selectedColor);
                    }}
                >
                    <Dropdown.Toggle
                        variant="primary"
                        className={`w-100 ${color} fs-5 rounded-3`}
                        id="colorPicker"
                    >
                        {color || "Select Color"}
                    </Dropdown.Toggle>
                    <DropDownOptions />
                </Dropdown>
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
