import React from 'react';

import './Calendar.css';
import {useCalendar} from "./hooks/useCalendar.ts";
import {checkIsToday} from "./date/checkIsToday.ts";
import {checkDateIsEqual} from "./date/checkDateIsEqual.ts";

interface CalendarProps {
    locale?: string;
    selectedDate: Date | null
    selectDate: (date: Date) => void;
    firstWeekDayNumber?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
                                                      locale = 'default',
                                                      selectedDate,
                                                      selectDate,
                                                      firstWeekDayNumber = 2
                                                  }) => {
    const { functions, state } = useCalendar({
        locale,
        selectedDate,
        firstWeekDayNumber
    });

    return (
        <div className="w-[320px] h-[336px] rounded-md capitalize bg-white p-3 shadow-md">
            <div className="flex justify-between items-center text-[16px]">
                {state.mode === 'days' && (
                    <div aria-hidden onClick={() => functions.setMode('monthes')}>
                        {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                    </div>
                )}
                {state.mode === 'monthes' && (
                    <div aria-hidden onClick={() => functions.setMode('years')}>
                        {state.selectedYear}
                    </div>
                )}
                {state.mode === 'years' && (
                    <div>
                        {state.selectedYearsInterval[0]} -{' '}
                        {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
                    </div>
                )}
                <div className='flex justify-between items-center gap-1'>
                    <div
                        aria-hidden
                        onClick={() => functions.onClickArrow('left')}
                    >{'<'}</div>
                    <div
                        aria-hidden
                        onClick={() => functions.onClickArrow('right')}
                    >{'>'}</div>
                </div>
            </div>
            <div>
                {state.mode === 'days' && (
                    <>
                            <div className="text-[13px] grid grid-cols-7 gap-4.5 text-gray-400 items-center my-3">
                            {state.weekDaysNames.map((weekDaysName) => (
                                <div className='    ' key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
                            ))}
                        </div>
                        <div
                            className="text-[13px] text-center grid grid-cols-[repeat(7,_9fr)] grid-rows-1 items-center gap-3">
                            {state.calendarDays.map((day) => {
                                const isToday = checkIsToday(day.date);
                                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
                                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

                                return (
                                    <div
                                        key={`${day.dayNumber}-${day.monthIndex}`}
                                        aria-hidden
                                        onClick={() => {
                                            functions.setSelectedDay(day);
                                            selectDate(day.date);
                                        }}
                                        className={[
                                            'cursor-pointer w-[20px] h-[20px] flex justify-center items-center hover:text-white hover:bg-sky-500 hover:rounded-full',
                                            isToday ? 'text-gray-300' : '',
                                            isSelectedDay ? 'text-white bg-sky-500 rounded-full' : '',
                                            isAdditionalDay ? 'text-gray-300' : ''
                                        ].join(' ')}
                                    >
                                        {day.dayNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {state.mode === 'monthes' && (
                    <div
                        className="grid grid-cols-3 grid-rows-4 gap-x-1 gap-y-8 text-center text-gray-300 text-[13px] mt-[35px]">
                        {state.monthesNames.map((monthesName) => {
                            const isCurrentMonth =
                            new Date().getMonth() === monthesName.monthIndex &&
                                state.selectedYear === new Date().getFullYear();
                            const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                            return (
                                <div
                                    key={monthesName.month}
                                    aria-hidden
                                    onClick={() => {
                                        functions.setSelectedMonthByIndex(monthesName.monthIndex);
                                        functions.setMode('days');
                                    }}
                                    className={[
                                        'hover:text-white hover:bg-gray-300 hover:rounded-full',
                                        isSelectedMonth ? 'text-white bg-sky-500 rounded-full' : '',
                                        isCurrentMonth ? 'text-white bg-sky-500 rounded-full' : ''
                                    ].join(' ')}
                                >
                                    {monthesName.monthShort}
                                </div>
                            );
                        })}
                    </div>
                )}

                {state.mode === 'years' && (
                    <div
                        className="grid grid-cols-3 grid-rows-4 gap-x-1 gap-y-8 text-gray-300 text-[13px] mt-[35px]">
                        <div className='text-gray-400 flex justify-center items-center cursor-pointer'>{state.selectedYearsInterval[0] - 1}</div>
                        {state.selectedYearsInterval.map((year) => {
                            const isCurrentYear = new Date().getFullYear() === year;
                            const isSelectedYear = year === state.selectedYear;

                            return (
                                <div
                                    key={year}
                                    aria-hidden
                                    onClick={() => {
                                        functions.setSelectedYear(year);
                                        functions.setMode('monthes');
                                    }}
                                    className={[
                                        'flex justify-center items-center cursor-pointer hover:bg-gray-300 hover:rounded-full hover:text-white',
                                        isCurrentYear ? 'text-white bg-sky-500 rounded-full' : '',
                                        isSelectedYear ? 'text-white bg-sky-500 rounded-full' : ''
                                    ].join(' ')}
                                >
                                    {year}
                                </div>
                            );
                        })}
                        <div className='text-gray-400 flex justify-center items-center cursor-pointer'>
                            {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};