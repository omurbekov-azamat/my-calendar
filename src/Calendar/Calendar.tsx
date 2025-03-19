import React from 'react';

import './Calendar.css';
import { useCalendar } from './hooks/useCalendar.ts';
import { checkIsToday } from './date/checkIsToday.ts';
import { checkDateIsEqual } from './date/checkDateIsEqual.ts';

interface CalendarProps {
    locale?: string;
    selectedDate: Date | null;
    selectDate: (date: Date) => void;
    firstWeekDayNumber?: number;
}

export const Calendar: React.FC<CalendarProps> = ({ locale = 'default', selectedDate, selectDate, firstWeekDayNumber = 2 }) => {
    const { functions, state } = useCalendar({
        locale,
        selectedDate,
        firstWeekDayNumber,
    });

    return (
        <div className='h-[336px] w-[320px] rounded-md bg-white p-3 capitalize shadow-md'>
            <div className='flex items-center justify-between text-[16px]'>
                {state.mode === 'days' && (
                    <div
                        aria-hidden
                        onClick={() => functions.setMode('monthes')}
                    >
                        {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                    </div>
                )}
                {state.mode === 'monthes' && (
                    <div
                        aria-hidden
                        onClick={() => functions.setMode('years')}
                    >
                        {state.selectedYear}
                    </div>
                )}
                {state.mode === 'years' && (
                    <div>
                        {state.selectedYearsInterval[0]} - {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
                    </div>
                )}
                <div className='flex items-center justify-between gap-1'>
                    <div
                        aria-hidden
                        onClick={() => functions.onClickArrow('left')}
                    >
                        {'<'}
                    </div>
                    <div
                        aria-hidden
                        onClick={() => functions.onClickArrow('right')}
                    >
                        {'>'}
                    </div>
                </div>
            </div>
            <div>
                {state.mode === 'days' && (
                    <>
                        <div className='my-3 grid grid-cols-7 items-center gap-4.5 text-[13px] text-gray-400'>
                            {state.weekDaysNames.map((weekDaysName) => (
                                <div
                                    className=' '
                                    key={weekDaysName.dayShort}
                                >
                                    {weekDaysName.dayShort}
                                </div>
                            ))}
                        </div>
                        <div className='grid grid-cols-[repeat(7,_9fr)] grid-rows-1 items-center gap-3 text-center text-[13px]'>
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
                                            'flex h-[20px] w-[20px] cursor-pointer items-center justify-center hover:rounded-full hover:bg-sky-500 hover:text-white',
                                            isToday ? 'text-gray-300' : '',
                                            isSelectedDay ? 'rounded-full bg-sky-500 text-white' : '',
                                            isAdditionalDay ? 'text-gray-300' : '',
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
                    <div className='mt-[35px] grid grid-cols-3 grid-rows-4 gap-x-1 gap-y-8 text-center text-[13px] text-gray-300'>
                        {state.monthesNames.map((monthesName) => {
                            const isCurrentMonth =
                                new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
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
                                        'hover:rounded-full hover:bg-gray-300 hover:text-white',
                                        isSelectedMonth ? 'rounded-full bg-sky-500 text-white' : '',
                                        isCurrentMonth ? 'rounded-full bg-sky-500 text-white' : '',
                                    ].join(' ')}
                                >
                                    {monthesName.monthShort}
                                </div>
                            );
                        })}
                    </div>
                )}

                {state.mode === 'years' && (
                    <div className='mt-[35px] grid grid-cols-3 grid-rows-4 gap-x-1 gap-y-8 text-[13px] text-gray-300'>
                        <div className='flex cursor-pointer items-center justify-center text-gray-400'>{state.selectedYearsInterval[0] - 1}</div>
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
                                        'flex cursor-pointer items-center justify-center hover:rounded-full hover:bg-gray-300 hover:text-white',
                                        isCurrentYear ? 'rounded-full bg-sky-500 text-white' : '',
                                        isSelectedYear ? 'rounded-full bg-sky-500 text-white' : '',
                                    ].join(' ')}
                                >
                                    {year}
                                </div>
                            );
                        })}
                        <div className='flex cursor-pointer items-center justify-center text-gray-400'>
                            {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
