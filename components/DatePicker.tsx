import 'react-day-picker/dist/style.css';
import { DateRange, DayPicker } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale'
import { useState } from 'react';
import { Button } from 'flowbite-react'

const DatePicker = ({  dateRange , setDateRange }) => {
    const defaultSelected: DateRange = {
        from: new Date(),
        to: new Date()
    };
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const handleShowPicker = () => {
        setShowPicker(true)
    }

    const closePicker = () => {
        setShowPicker(false);   
    }

    const footer = <Button onClick={closePicker}> Cerrar </Button>
    return (
        <div className="inline-block">
            {
                showPicker ?
                    <div className="absolute dark:bg-slate-800 z-10 dark:text-white rounded-md">
                        <DayPicker
                            mode="range"
                            defaultMonth={new Date()}
                            selected={dateRange || defaultSelected}
                            onSelect={setDateRange}
                            locale={es}
                            footer={footer} 
                        />
                    </div>
                    : <Button onClick={handleShowPicker}> Elegir fecha </Button>
            }
        </div>
    );
}

export default DatePicker;