import { useEffect } from "react";

export const useOnClickOutside = (
    ref: React.RefObject<HTMLElement> | null,  // Используем HTMLElement, чтобы принимать любой элемент
    callback: () => void
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref && ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Очистка события при размонтировании компонента
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};
