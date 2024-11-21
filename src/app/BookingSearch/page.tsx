'use client';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { listarReservas } from '../ReservasServices';
import { useRouter } from 'next/navigation';

interface Pasajero {
    idPasajero: string;
    nombrePasajero: string;
    apellidoPasajero: string;
    tipoDocumento: string;
    numeroDocumento: string;
    correoContacto: string;
    telefonoContacto: string;
}

interface Reserva {
    idReserva: string;
    idCliente: number;
    idVuelo: number;
    idPago: number;
    telefonoContacto: number;
    correoContacto: string;
    fechaReserva: string;
    estadoReserva: string;
    pasajeros: Pasajero[];
}

const ReservasTable: React.FC = () => {
    const [reservas, setReservas] = useState<Reserva[]>([]); // Lista de reservas
    const [idReserva, setIdReserva] = useState<string>(''); // Filtro por ID reserva
    const [idCliente, setIdCliente] = useState<string>(''); // Filtro por ID cliente
    const router = useRouter();
    // Función para manejar búsqueda
    const handleSearch = async () => {
        try {
            const response = await listarReservas();
            console.log()
            if (response.listarReservas) {
                const filtered = response.listarReservas.filter(
                    (reserva: Reserva) =>
                        (idReserva ? reserva.idReserva.includes(idReserva) : true) &&
                        (idCliente ? reserva.idCliente.toString().includes(idCliente) : true)
                );
                console.log(filtered)
                setReservas(filtered);
            } else {
                console.error('No se encontraron datos de reservas.');
            }
        } catch (error) {
            console.error('Error al buscar reservas:', error);
        }
    };

    // Cargar todas las reservas al inicio
    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const response = await listarReservas();
                if (response?.data?.listarReservas) {
                    setReservas(response.data.listarReservas);
                }
            } catch (error) {
                console.error('Error al listar reservas:', error);
            }
        };

        fetchReservas();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <main className="flex-grow w-8/12 mx-auto mt-4">
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">Gestión de Reservas</h2>

                    {/* Filtros de búsqueda */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex flex-column gap-2">
                            <label htmlFor="idReserva">Buscar por ID Reserva</label>
                            <InputText
                                id="idReserva"
                                value={idReserva}
                                onChange={(e) => setIdReserva(e.target.value)}
                                placeholder="ID Reserva"
                                className="p-2"
                            />
                        </div>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="idCliente">Buscar por ID Cliente</label>
                            <InputText
                                id="idCliente"
                                value={idCliente}
                                onChange={(e) => setIdCliente(e.target.value)}
                                placeholder="ID Cliente"
                                className="p-2"
                            />
                        </div>
                        <Button
                            label="Buscar"
                            icon="pi pi-search"
                            onClick={handleSearch}
                            className="mt-5"
                        />
                    </div>

                    {/* DataTable */}
                    <DataTable
                        value={reservas}
                        paginator
                        rows={10}
                        emptyMessage="No hay reservas disponibles."
                        className="shadow-md"
                    >
                        <Column field="idReserva" header="ID Reserva" />
                        <Column field="idCliente" header="ID Cliente" />
                        <Column field="fechaReserva" header="Fecha de Reserva" />
                        <Column field="estadoReserva" header="Estado" />
                        <Column
                            body={(rowData) => (
                                <Button
                                    label="Editar"
                                    icon="pi pi-pencil"
                                    className="p-button-sm"
                                    onClick={() =>  router.push(`/Booking/${rowData.idReserva}`)}
                                />
                            )}
                            header="Acciones"
                        />
                    </DataTable>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ReservasTable;
