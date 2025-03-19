import React from 'react';
import { formatDate } from './date/formatDate.ts';
import { Calendar } from './Calendar.tsx';

const InputCalendar = () => {
    const [selectedDate, setSelectedDay] = React.useState<Date | null>(null);
    console.log(selectedDate);
    return (
        <div>
            <div className='p-5'>
                <div className='flex h-[50px] items-center border border-gray-300 pl-1'>
                    {selectedDate ? formatDate(selectedDate, 'DD.MM.YYYY') : 'Select date'}
                </div>
                <Calendar
                    selectedDate={selectedDate}
                    selectDate={(date) => {
                        setSelectedDay(date);
                    }}
                />
            </div>
            <div>
                <input type='datetime-local' />
            </div>
        </div>
    );
};

export default InputCalendar;
