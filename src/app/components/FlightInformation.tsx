import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import React from 'react';

interface FlightInformationProps {
    origin: string;
    setOrigin: (value: string) => void;
    destination: string;
    setDestination: (value: string) => void;
    dateStart: Date | null;
    setDateStart: (value: Date | null) => void;
    dateEnd: Date | null;
    setDateEnd: (value: Date | null) => void;
}

const FlightInformation: React.FC<FlightInformationProps> = ({
    origin,
    setOrigin,
    destination,
    setDestination,
    dateStart,
    setDateStart,
    dateEnd,
    setDateEnd,
}) => {
    return (
        <div>
            <div className='flex flex-row justify-between'>
                {/* Origen */}
                <FloatLabel>
                    <InputText
                        id="origin"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        className="border-solid border-2 p-2"
                        disabled
                    />
                    <label htmlFor="origin">Origen</label>
                </FloatLabel>

                {/* Destino */}
                <FloatLabel>
                    <InputText
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="border-solid border-2 p-2"
                        disabled
                    />
                    <label htmlFor="destination">Destino</label>
                </FloatLabel>

                {/* Fecha de salida */}
                <FloatLabel>
                    <Calendar
                        id="dateStart"
                        value={dateStart}
                        onChange={(e) => setDateStart(e.value || null)}
                        className="border-solid border-2 p-2"
                        disabled
                    />
                    <label htmlFor="dateStart">Fecha de salida</label>
                </FloatLabel>

                {/* Fecha de regreso */}
                <FloatLabel>
                    <Calendar
                        id="dateEnd"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.value || null)}
                        className="border-solid border-2 p-2"
                        disabled
                    />
                    <label htmlFor="dateEnd">Fecha de regreso</label>
                </FloatLabel>
            </div>
        </div>
    );
};

export default FlightInformation;
