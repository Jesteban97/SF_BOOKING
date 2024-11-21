'use client'
'use client'
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { SelectButton } from 'primereact/selectbutton';
import { FloatLabel } from 'primereact/floatlabel';

const SearchForm: React.FC = () => {
    const [category, setCategory] = useState<string>("1");
    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [passangerNumber, setPassangerNumber] = useState<number | null>(null); // Default to 1 passenger
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    const items = [
        { name: 'Ida y regreso', value: "1" },
        { name: 'Solo ida', value: "2" },
        { name: 'Multi-viaje', value: "3" }
    ];
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Vuelos</h2>
            <div className="card flex justify-start">
                <SelectButton value={category}
                    onChange={(e) => setCategory(e.value)}
                    optionLabel="name"
                    options={items}
                    multiple={false} />
            </div>
            <form className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-4">
                <FloatLabel >
                    <InputText
                        id='origin'
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className='border-solid border-2 p-2'
                    />
                    <label htmlFor="origin">Origen</label>
                </FloatLabel>
                <Button icon="pi pi-arrow-right-arrow-left" />
                <FloatLabel >
                    <InputText
                        id='destination'
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className='border-solid border-2 p-2'
                    />
                    <label htmlFor="destination">Destino</label>
                </FloatLabel>
                <FloatLabel >
                    <Calendar
                        id='dateStart'
                        value={dateStart}
                        onChange={(e) => setDateStart(e.value || null)}
                        className='border-solid border-2  p-2'
                    />
                    <label htmlFor="dateStart">Fecha de salida</label>
                </FloatLabel>
                <FloatLabel >
                    <Calendar
                        id='dateEnd'
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.value || null)}
                        className='border-solid border-2  p-2'
                    />
                    <label htmlFor="dateEnd">Fecha de regreso</label>
                </FloatLabel>
                <FloatLabel >
                    <InputNumber
                        id='passengerNumber'
                        value={passangerNumber}
                        onChange={(e) => setPassangerNumber(e.value || null)}
                        className='border-solid border-2  p-2'
                    />
                    <label htmlFor="passengerNumber">Cantidad de pasajeros</label>
                </FloatLabel>
                <button type="button" className="bg-blue-900 text-white px-4 py-2 rounded">Buscar</button>
            </form>
        </div>
    );
};

export default SearchForm;
