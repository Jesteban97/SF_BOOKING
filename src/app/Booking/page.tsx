'use client'
import { Button } from 'primereact/button';
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { Panel } from 'primereact/panel';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PrincipalInformation from '../components/PrincipalInformation';
import PassengerInformation from '../components/PassengerInformation';
import FlightInformation from '../components/FlightInformation';
import { crearReserva } from '../ReservasServices';

interface Passenger {
    name: string;
    surname: string;
    documentType: string;
    document: string;
    phone: string;
    email: string;
}

const Booking = () => {
    const router = useRouter();



    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);




    const handleSaveReservation = async () => {
        setLoading(true);
        try {

            // Crear reserva
            const newReservation = await crearReserva({
                idCliente: Math.floor(Math.random() * 1000), // Replace with actual client ID
                idVuelo: Math.floor(Math.random() * 1000), // Replace with actual flight ID
                idPago: Math.floor(Math.random() * 1000), // Replace with actual payment ID
                telefonoContacto: parseInt(phone),
                correoContacto: email,
                estadoReserva: "pendiente",
                pasajeros: passengers.map(p => ({
                    nombrePasajero: p.name,
                    apellidoPasajero: p.surname,
                    tipoDocumento: p.documentType,
                    numeroDocumento: p.document,
                    telefonoContacto: p.phone,
                    correoContacto: p.email
                })),
            });
            //setReservationId(newReservation.crearReserva.idReserva);
            alert(`Reserva creada con ID: ${newReservation.crearReserva.idReserva}`);
            router.push('/BookingSearch');

        } catch (error) {
            alert("Error al guardar la reserva.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow w-8/12 mx-auto mt-4">
                <div>
                    <Panel  header={<span className='flex'><PiAirplaneTakeoffFill className='mr-1' /> Información del Vuelo</span>} toggleable
                        collapseIcon={<i className='pi pi-sort-up-fill'></i>}
                        expandIcon={<i className='pi pi-sort-down-fill'></i>}>
                        <FlightInformation
                            origin={origin}
                            setOrigin={setOrigin}
                            destination={destination}
                            setDestination={setDestination}
                            dateStart={dateStart}
                            setDateStart={setDateStart}
                            dateEnd={dateEnd}
                            setDateEnd={setDateEnd} />
                    </Panel>
                </div>
                <div>
                    <Panel  header={<span><i className='pi pi-user'></i> Información del titular</span>} toggleable
                        collapseIcon={<i className='pi pi-sort-up-fill'></i>}
                        expandIcon={<i className='pi pi-sort-down-fill'></i>}>
                        <PrincipalInformation
                            setEmail={setEmail}
                            setPhone={setPhone}
                            email={email}
                            phone={phone}
                        />
                    </Panel>
                </div>
                <div>
                    <Panel  header={<span><i className='pi pi-users'></i> Información de los pasajeros</span>} toggleable
                        collapseIcon={<i className='pi pi-sort-up-fill'></i>}
                        expandIcon={<i className='pi pi-sort-down-fill'></i>}>
                        <PassengerInformation setPassengers={setPassengers} passenger={passengers} />
                    </Panel>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        label="Guardar"
                        icon="pi pi-save"
                        onClick={handleSaveReservation}
                        loading={loading}
                        className="p-button-primary"
                    />
                    {/* <Button
                        label="Cancelar Reserva"
                        icon="pi pi-times"
                        onClick={handleCancelReservation}
                        className="p-button-danger"
                    /> */}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Booking;
