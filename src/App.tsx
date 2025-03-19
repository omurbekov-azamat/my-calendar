import React, { useState } from 'react';
import InputCalendar from './Calendar/InputCalendar.tsx';
import UseSelect from './Select/UseSelect.tsx';
import CustomDatePicker from './Calendar/CustomCalendar.tsx';
import CustomDateTimePicker from './Calendar/CustomDateTimePicker.tsx';
import UseSelectAlone from './Select/UseSelectAlone.tsx';

export const App: React.FC = () => {
    const [stateDate, setStateDate] = useState<Date | null>(null);

    console.log(stateDate);

    const selectDate = (date: Date | null) => {
        console.log(date);
        setStateDate(date);
    };
    return (
        <>
            <InputCalendar />
            <UseSelect />
            <CustomDatePicker
                date={stateDate}
                selectDate={setStateDate}
            />
            <CustomDateTimePicker />
            <button onClick={() => setStateDate(null)}>clear</button>
            <UseSelectAlone />
        </>
    );
};

export default App;
