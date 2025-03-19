import CustomSelect from "./CustomSelect.tsx";
import { useState } from "react";

interface Option {
    value: number | string;
    label: string;
}

interface dataOptions {
    start: Option | null;
    end: Option | null;
}

const initialState: dataOptions = {
    start: null,
    end: null,
};

const UseSelect = () => {
    const [selectedOption, setSelectedOption] = useState<dataOptions>(initialState);
    const options = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" },
    ];

    const secondOptions = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
        { value: 3, label: "Option 3" },
    ];

    const handleSelectChange = (option: Option, field: "start" | "end") => {
        setSelectedOption((prev) => ({ ...prev, [field]: option }));
    };
    console.log(selectedOption);
    return (
        <div className="p-5">
            <CustomSelect
                options={options}
                value={selectedOption.start}
                onChange={(option) => handleSelectChange(option, "start")}
                placeholder="Выберите вариант для начала"
                className="w-[300px]"
                buttonClassName="bg-gray-100"
                dropdownClassName="bg-white"
            />

            <CustomSelect
                options={secondOptions}
                value={selectedOption.end}
                onChange={(option) => handleSelectChange(option, "end")}
                placeholder="Выберите вариант для конца"
                className="w-[300px]"
                buttonClassName="bg-gray-100"
                dropdownClassName="bg-white"
            />

            <button onClick={() => setSelectedOption(initialState)}>clear</button>
        </div>
    );
};

export default UseSelect;
