import CustomSelect from './CustomSelect.tsx';
import { useState } from 'react';

const UseSelectAlone = () => {
    const [selectedOption, setSelectedOption] = useState<{ value: number | string; label: string } | null>(null);
    const options = [
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2' },
        { value: 3, label: 'Option 3' },
    ];

    return (
        <div className='p-5'>
            <CustomSelect
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder='Выберите вариант'
                className='w-[300px]'
                buttonClassName='bg-gray-100'
                dropdownClassName='bg-white'
            />
            <p className='mt-3'>Выбрано: {selectedOption?.label || 'Ничего не выбрано'}</p>
            <button onClick={() => setSelectedOption(null)}>clear</button>
        </div>
    );
};

export default UseSelectAlone;
