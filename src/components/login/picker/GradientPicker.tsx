import { Dropdown } from "react-bootstrap";
import {
    GRADIENTS,
    GradientType as GradientName,
} from "../../../types/Gradient";
import { IconNames } from "src/assets";

export const GradientOption = ({ gradient }: { gradient: GradientName }) => {
    return (
        <Dropdown.Item
            eventKey={gradient}
            as="button"
            className={`d-flex flex-row align-items-center rounded-4 mt-3 p-2 ${gradient}`}
        >
            <div
                className={`rounded-circle ${gradient}`}
                style={{ width: "40px", height: "40px" }}
            />
            <h5 className="text-center fs-4 flex-grow-1">{gradient}</h5>
        </Dropdown.Item>
    );
};

export const GradientPickerOptions = () => {
    return (
        <Dropdown.Menu>
            {GRADIENTS.map((gradient) => (
                <GradientOption key={gradient} gradient={gradient} />
            ))}
        </Dropdown.Menu>
    );
};
