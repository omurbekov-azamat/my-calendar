import React from 'react';


import './utils/css/global.css';
import {Calendar} from "./utils/components/Calendar/Calendar.tsx";
import {formatDate} from "./utils/helpers/date/formatDate.ts";

export const App: React.FC = () => {
    const [selectedDate, setSelectedDay] = React.useState(new Date());
    console.log(selectedDate);
    return (
        <div className='app__container'>
            <div className='date__container'>{formatDate(selectedDate, 'DDD DD MMM YYYY')}</div>

            <Calendar selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />
        </div>
    );
};

export default App;