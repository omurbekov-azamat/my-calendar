import React, {useRef, useState} from "react";
import {format, startOfMonth, getDaysInMonth, addMonths, subMonths} from "date-fns";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline";
import {ru} from "date-fns/locale";
import {useOnClickOutside} from "./useOnClickOutside.ts";

interface Props {
    date: Date | null
    selectDate: (date: Date) => void;
}

const Calendar: React.FC<Props> = ({date,selectDate}) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [mode, setMode] = useState<'days' | 'months' | 'years'>('days');
    const [isOpen, setIsOpen] = useState(false);

    const calendarRef = useRef<React.RefObject<HTMLElement> | null>(null); // Используем HTMLElement
    useOnClickOutside(calendarRef, () => setIsOpen(false));
    const firstDayOfMonth = startOfMonth(selectedDate);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const shift = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1; // Понедельник

    const days: (number | null)[] = [];

    // Добавляем пустые ячейки для предыдущего месяца
    for (let i = 0; i < shift; i++) {
        days.push(null);
    }

    // Добавляем дни текущего месяца
    const daysInMonth = getDaysInMonth(selectedDate);
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    // Количество дней в следующем месяце
    const remainingDays = 42 - days.length; // Обычно календарь показывает 6 строк по 7 дней
    for (let i = 1; i <= remainingDays; i++) {
        days.push(null);
    }

    // Функция для обработки клика по дню
    const handleDayClick = (day: number | null) => {
        if (day) {
            const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
            setSelectedDate(newDate);
            selectDate(newDate);
            setIsOpen(false);
        }
    };

    // Функция для смены месяца
    const handleMonthChange = (direction: "next" | "prev") => {
        const newDate = direction === "next" ? addMonths(selectedDate, 1) : subMonths(selectedDate, 1);
        setSelectedDate(newDate);
    };

    const switchToMonthsMode = () => setMode('months');
    const switchToYearsMode = () => setMode('years');
    const switchToDaysMode = () => setMode('days');

    const renderDays = () => {
        return (
            <div>
                <div className="flex justify-between items-center">
                    <div className='capitalize'
                         onClick={switchToYearsMode}>{format(selectedDate, "MMMM yyyy", {locale: ru})}г.
                    </div>
                    <div className='flex items-center'>
                        <ChevronLeftIcon onClick={() => handleMonthChange("prev")} className="w-3 h-"/>
                        <ChevronRightIcon onClick={() => handleMonthChange("next")} className="w-3 h-3"/>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, index) => (
                        <div key={index} className="text-center">{day}</div>
                    ))}
                    {days.map((day, index) => (
                        <span
                            key={index}
                            onClick={() => handleDayClick(day as number)}
                            className={`text-[13px] cursor-pointer w-[20px] h-[20px] flex justify-center items-center ${
                                day === null
                                    ? "text-transparent cursor-default"  // Отключаем hover и изменяем курсор на default
                                    : "hover:text-white hover:bg-sky-500 hover:rounded-full" // Включаем hover только если day !== null
                            } ${
                                day === null
                                    ? ""  // Если day === null, то не применяем другие стили
                                    : day === selectedDate.getDate()
                                        ? "bg-blue-300 text-white rounded-full" // Выбранный день
                                        : ""
                            }`}
                        >
                            {day !== null ? day : ""}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const renderMonths = () => {
        const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
        return (
            <div>
                <div className="flex justify-between items-center">
                    <button onClick={() => handleMonthChange("prev")}>Prev</button>
                    <h2>{selectedDate.getFullYear()}</h2>
                    <button onClick={() => handleMonthChange("next")}>Next</button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {months.map((month, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                const newDate = new Date(selectedDate.getFullYear(), index, 1);
                                setSelectedDate(newDate);
                                switchToDaysMode(); // После выбора месяца переходим к дням
                            }}
                            className={`p-2 rounded-md ${
                                index === selectedDate.getMonth()
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-blue-100"
                            }`}
                        >
                            {month}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderYears = () => {
        const currentYear = selectedDate.getFullYear();
        const startYear = Math.floor(currentYear / 10) * 10;
        const years = [...Array(10)].map((_, index) => startYear + index);
        return (
            <div>
                <div className="flex justify-between items-center">
                    <button onClick={() => setSelectedDate(subMonths(selectedDate, 12))}>Prev</button>
                    <h2>{`${startYear} - ${startYear + 9}`}</h2>
                    <button onClick={() => setSelectedDate(addMonths(selectedDate, 12))}>Next</button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => {
                                const newDate = new Date(year, selectedDate.getMonth(), 1);
                                setSelectedDate(newDate);
                                switchToMonthsMode();
                            }}
                            className={`p-2 rounded-md ${
                                year === selectedDate.getFullYear()
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-blue-100"
                            }`}
                        >
                            {year}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="p-10">
            <div
                className='border w-[300px] relative'
                onClick={() => setIsOpen(!isOpen)}
            >
                {date
                    ? format(date, "dd.MM.yyyy", {locale: ru})
                    : 'Выберите дату'}
            </div>
            {isOpen &&
                <div ref={calendarRef} className='absolute w-[300px] border p-2 mt-1 bg-white z-10'>
                    {mode === 'days' && renderDays()}
                    {mode === 'months' && renderMonths()}
                    {mode === 'years' && renderYears()}
                </div>
            }
        </div>
    );
};

export default Calendar;
