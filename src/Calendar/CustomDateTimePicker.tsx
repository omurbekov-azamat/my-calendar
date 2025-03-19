import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addMinutes, addHours, addSeconds, setHours, setMinutes, setSeconds } from 'date-fns';
import { ru } from 'date-fns/locale';

const CustomDateTimePicker: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (type: 'hours' | 'minutes' | 'seconds', value: number) => {
        if (selectedDate) {
            const newDate = new Date(selectedDate);
            if (type === 'hours') newDate.setHours(value);
            if (type === 'minutes') newDate.setMinutes(value);
            if (type === 'seconds') newDate.setSeconds(value);
            setSelectedDate(newDate);
        }
    };

    const generateTimeOptions = (min: number, max: number) => {
        const options: number[] = [];
        for (let i = min; i <= max; i++) {
            options.push(i);
        }
        return options;
    };

    return (
        <div className='border p-5'>
            <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat='Pp'
                locale={ru}
                customTimeInput={
                    <div className='mt-3 flex'>
                        {/* Часы */}
                        <div className='mr-3'>
                            <label>Часы:</label>
                            <select
                                value={selectedDate ? selectedDate.getHours() : 0}
                                onChange={(e) => handleTimeChange('hours', parseInt(e.target.value))}
                                className='h-8 w-16'
                            >
                                {generateTimeOptions(0, 23).map((hour) => (
                                    <option
                                        key={hour}
                                        value={hour}
                                    >
                                        {hour < 10 ? `0${hour}` : hour}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Минуты */}
                        <div className='mr-3'>
                            <label>Минуты:</label>
                            <select
                                value={selectedDate ? selectedDate.getMinutes() : 0}
                                onChange={(e) => handleTimeChange('minutes', parseInt(e.target.value))}
                                className='h-8 w-16'
                            >
                                {generateTimeOptions(0, 59).map((minute) => (
                                    <option
                                        key={minute}
                                        value={minute}
                                    >
                                        {minute < 10 ? `0${minute}` : minute}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Секунды */}
                        <div>
                            <label>Секунды:</label>
                            <select
                                value={selectedDate ? selectedDate.getSeconds() : 0}
                                onChange={(e) => handleTimeChange('seconds', parseInt(e.target.value))}
                                className='h-8 w-16'
                            >
                                {generateTimeOptions(0, 59).map((second) => (
                                    <option
                                        key={second}
                                        value={second}
                                    >
                                        {second < 10 ? `0${second}` : second}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default CustomDateTimePicker;
