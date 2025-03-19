import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

interface Option {
    value: number | string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: Option | null;
    onChange: (option: Option) => void;
    placeholder?: string;
    className?: string;
    buttonClassName?: string;
    dropdownClassName?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
                                                       options,
                                                       value,
                                                       onChange,
                                                       placeholder = "Select an option",
                                                       className = "",
                                                       buttonClassName = "",
                                                       dropdownClassName = "",
                                                   }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openAbove, setOpenAbove] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSelect = useCallback((option: Option) => {
        onChange(option);
        setIsOpen(false);
    }, [onChange]);

    const toggleDropdown = useCallback(() => {
        if (!isOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            setOpenAbove(spaceBelow < 150 && spaceAbove > spaceBelow);
        }
        setIsOpen((prev) => !prev);
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                buttonRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`relative w-64 ${className}`} ref={dropdownRef}>
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className={`flex justify-between items-center w-full p-2 border rounded-md bg-white shadow-md ${buttonClassName}`}
            >
                <span>{value ? value.label : placeholder}</span>
                <ChevronUpDownIcon className="w-5 h-5" />
            </button>

            {isOpen && (
                <ul
                    className={`absolute w-full bg-white border rounded-md shadow-md z-10 overflow-hidden
                        ${openAbove ? "bottom-full mb-1" : "top-full mt-1"} 
                        ${dropdownClassName}`}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className="p-2 cursor-pointer hover:bg-blue-100 flex justify-between"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
