import { Dropdown } from "react-bootstrap";
import { GradientType as GradientName } from "../../../types/Gradient";
import { IconNames } from "src/assets";
import { GradientPickerOptions } from "./GradientPicker";
import { IconPickerOptions } from "./IconPicker";

export enum PickerTypes {
    COLOR = "color",
    ICON = "icon",
}

export const Picker = <T extends GradientName | IconNames>({
    value,
    setValue,
    pickerType,
}: {
    value?: T;
    setValue: (value: T) => void;
    pickerType: PickerTypes;
}) => {
    const title = `Select ${pickerType}`;
    return (
        <Dropdown
            title={title}
            onSelect={(eventKey) => {
                setValue(eventKey as T);
            }}
        >
            <Dropdown.Toggle
                variant="primary"
                className={`w-100 ${value} fs-5 rounded-3`}
            >
                {value || title}
            </Dropdown.Toggle>
            {pickerType === PickerTypes.COLOR ? (
                <GradientPickerOptions />
            ) : (
                <IconPickerOptions />
            )}
        </Dropdown>
    );
};
