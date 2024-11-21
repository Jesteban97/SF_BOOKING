'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { PiAirplaneTakeoffFill } from "react-icons/pi";
import { Panel } from 'primereact/panel';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PrincipalInformation from '../../components/PrincipalInformation';
import PassengerInformation from '../../components/PassengerInformation';
import FlightInformation from '../../components/FlightInformation';
import { consultarReserva, editarPasajeros, editarContactoReserva, cancelarReserva } from '../../ReservasServices';

interface Passenger {
    name: string;
    surname: string;
    documentType: string;
    document: string;
    phone: string;
    email: string;
    idPasajero?: string;
}
interface PassengerResponse {
    nombrePasajero: string;
    apellidoPasajero: string;
    tipoDocumento: string;
    numeroDocumento: string;
    telefonoContacto: string;
    correoContacto: string;
    idPasajero?: string;
}
const Booking = () => {
    const params = useParams();
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [origin, setOrigin] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [dateStart, setDateStart] = useState<Date | null>(null);
    const [dateEnd, setDateEnd] = useState<Date | null>(null);
    const [reservationId, setReservationId] = useState<string | string[] | undefined>(params.id);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (reservationId) {
            fetchReservation(reservationId);
        }
    }, [reservationId]);  // Se ejecuta cuando reservationId cambia

    const fetchReservation = async (id: string | string[] | undefined) => {
        try {
            const reservation = await consultarReserva(id);
            console.log(reservation.consultarReserva)  // Se realiza la consulta aquí
            setPhone(reservation.consultarReserva.telefonoContacto.toString());
            setEmail(reservation.consultarReserva.correoContacto);
            setPassengers(reservation.consultarReserva.pasajeros.map((p: PassengerResponse) => ({
                name: p.nombrePasajero,
                surname: p.apellidoPasajero,
                documentType: p.tipoDocumento,
                document: p.numeroDocumento,
                phone: p.telefonoContacto,
                email: p.correoContacto,
            })));
            setOrigin("Origen desconocido"); // Ajustar según datos de reserva
            setDestination("Destino desconocido"); // Ajustar según datos de reserva
            setDateStart(new Date(reservation.consultarReserva.fechaReserva)); // Suponiendo que fechaReserva es la fecha de inicio
            setDateEnd(new Date(reservation.consultarReserva.fechaReserva)); // Ajustar si hay campo para fecha de retorno
        } catch (error) {
            alert("Error al obtener la reserva.");
            console.error(error);
        }
    };

    const handleSaveReservation = async () => {
        setLoading(true);
        try {
            if (reservationId) {
                // Editar reserva
                await editarPasajeros({
                    idReserva: reservationId,
                    telefonoContacto: parseInt(phone, 10),
                    correoContacto: email,
                    pasajeros: passengers.map(p => ({
                        idPasajero: p.idPasajero,
                        nombrePasajero: p.name,
                        apellidoPasajero: p.surname,
                        tipoDocumento: p.documentType,
                        numeroDocumento: p.document,
                        telefonoContacto: p.phone,
                        correoContacto: p.email
                    })),
                });
                await editarContactoReserva({
                    idReserva: reservationId,
                    telefonoContacto: parseInt(phone, 10),
                    correoContacto: email,
                });
                alert(`Reserva con ID ${reservationId} actualizada correctamente.`);
            } else {
                alert("Reserva no válida.");
            }
        } catch (error) {
            alert("Error al guardar la reserva.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelReservation = async () => {
        if (!reservationId) {
            alert("Primero crea una reserva.");
            return;
        }
        try {
            await cancelarReserva(reservationId);
            alert(`Reserva con ID ${reservationId} cancelada.`);
            setReservationId("");
            router.push('/BookingSearch');
        } catch (error) {
            alert("Error al cancelar la reserva.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow w-8/12 mx-auto mt-4">
                <div>
                    <Panel header={<span className='flex'><PiAirplaneTakeoffFill className='mr-1' /> Información del Vuelo</span>} toggleable>
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
                    <Panel header={<span><i className='pi pi-user'></i> Información del titular</span>} toggleable>
                        <PrincipalInformation
                            setEmail={setEmail}
                            setPhone={setPhone}
                            phone={phone}
                            email={email}
                        />
                    </Panel>
                </div>
                <div>
                    <Panel header={<span><i className='pi pi-users'></i> Información de los pasajeros</span>} toggleable>
                        <PassengerInformation setPassengers={setPassengers} passenger={passengers} idreserva={params.id} />
                    </Panel>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        label="Editar"
                        icon="pi pi-save"
                        onClick={handleSaveReservation}
                        loading={loading}
                        className="p-button-primary"
                    />
                    <Button
                        label="Cancelar Reserva"
                        icon="pi pi-times"
                        onClick={handleCancelReservation}
                        className="p-button-danger"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Booking;
