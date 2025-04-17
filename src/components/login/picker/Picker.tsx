import { Dropdown, InputGroup } from "react-bootstrap";
import { GradientType as GradientName } from "../../../types/Gradient";
import { IconNames } from "src/assets";
import { GradientPickerOptions } from "./GradientPicker";
import { IconPickerOptions } from "./IconPicker";

export enum PickerTypes {
    COLOR = "color",
    ICON = "icon",
}

export const Picker = <T extends GradientName | IconNames>({
    color,
    value,
    setValue,
    pickerType,
}: {
    color?:string
    value?: T;
    setValue: (value: T) => void;
    pickerType: PickerTypes;
}) => {
    const title = `Select ${pickerType}`;
    return (
        <InputGroup className="flex-nowrap mb-3" size="lg">
            <InputGroup.Text>{pickerType}</InputGroup.Text>
            <Dropdown
                title={title}
                onSelect={(eventKey) => {
                    setValue(eventKey as T);
                }}
            >
                <Dropdown.Toggle
                    variant="primary"
                    className={`w-100 ${color} fs-5 border-0`}
                >
                    <h5 style={{ display: "inline-block" }}>
                        {value || title}
                    </h5>
                </Dropdown.Toggle>
                {pickerType === PickerTypes.COLOR ? (
                    <GradientPickerOptions />
                ) : (
                    <IconPickerOptions />
                )}
            </Dropdown>
        </InputGroup>
    );
};
