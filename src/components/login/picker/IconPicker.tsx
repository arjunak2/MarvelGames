import { Dropdown } from "react-bootstrap";
import { IconNames, Icons } from "src/assets";

export const IconOption = ({ iconName }: { iconName: IconNames }) => {
    const Icon = Icons[iconName];
    return (
        <Dropdown.Item
            eventKey={iconName}
            as="button"
            className={`d-flex flex-row align-items-center rounded-4 m-2 p-2`}
        >
            <Icon
                width={50}
                height={50}
                style={{ backgroundImage: "none" }}
            />
        </Dropdown.Item>
    );
};

export const IconPickerOptions = () => {
    let iconNames = Object.keys(Icons) as IconNames[];
    return (
        <Dropdown.Menu>
            {iconNames.map((iconName) => (
                <IconOption key={iconName} iconName={iconName} />
            ))}
        </Dropdown.Menu>
    );
};
