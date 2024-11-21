import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Passenger {
  idPasajero?: string; // idPasajero es opcional
  name: string;
  surname: string;
  documentType: string;
  document: string;
  phone: string;
  email: string;
}

interface PassengerInformationProps {
  setPassengers: (passengers: Passenger[]) => void;
  passenger: Passenger[]; // Lista de pasajeros
  idreserva?: string | string[] | undefined; // idreserva opcional, solo disponible cuando sea necesario
}

const PassengerInformation: React.FC<PassengerInformationProps> = ({ setPassengers, passenger, idreserva }) => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passengers, setPassengerList] = useState<Passenger[]>(passenger); // Usa la prop passenger directamente
  const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(null); // Para manejar la edición

  // UseEffect para asegurar que el estado de passengers se actualiza cuando llega nueva prop passenger
  useEffect(() => {
    setPassengerList(passenger);
  }, [passenger]);

  const savePassenger = () => {
    const newPassenger = {
      idPasajero: editingPassenger ? editingPassenger.idPasajero : undefined, // Solo asigna idPasajero cuando se edita
      name,
      surname,
      documentType,
      document,
      phone,
      email,
    };

    let updatedPassengers;
    if (editingPassenger) {
      // Si estamos editando, actualizamos el pasajero en la lista
      updatedPassengers = passengers.map(p =>
        p.idPasajero === editingPassenger.idPasajero ? newPassenger : p
      );
    } else {
      // Si no estamos editando, agregamos el nuevo pasajero
      updatedPassengers = [...passengers, newPassenger];
    }

    setPassengerList(updatedPassengers);
    setPassengers(updatedPassengers);

    // Clear fields after adding or editing
    setName('');
    setSurname('');
    setDocumentType('');
    setDocument('');
    setPhone('');
    setEmail('');
    setEditingPassenger(null); // Reset editing state
  };

  const removePassenger = (passenger: Passenger) => {
    const updatedPassengers = passengers.filter(p => p.idPasajero !== passenger.idPasajero); // Filtra por idPasajero
    setPassengerList(updatedPassengers);
    setPassengers(updatedPassengers);
  };

  const editPassenger = (passenger: Passenger) => {
    // Set fields with the data of the passenger to edit
    setName(passenger.name);
    setSurname(passenger.surname);
    setDocumentType(passenger.documentType);
    setDocument(passenger.document);
    setPhone(passenger.phone);
    setEmail(passenger.email);

    // Set the passenger being edited
    setEditingPassenger(passenger);
    removePassenger(passenger); // Elimina el pasajero de la lista de pasajeros
  };

  const actionBodyTemplate = (rowData: Passenger) => {
    return (
      <>
        {idreserva && ( // Solo mostrar botón de editar si idreserva está presente
          <Button
            icon="pi pi-pencil"
            className="p-button-warning p-mr-2"
            onClick={() => editPassenger(rowData)} // Acción de editar
          />
        )}
        <Button
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => removePassenger(rowData)} // Acción de eliminar
        />
      </>
    );
  };

  return (
    <div>
      {/* Input fields */}
      <div className='flex flex-row justify-between'>
        <div className="flex flex-column gap-2">
          <label htmlFor="name" className="text-xs font-bold">Nombres</label>
          <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombres" className="border-solid border-2 p-2" />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="surname" className="text-xs font-bold">Apellidos</label>
          <InputText id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Apellidos" className="border-solid border-2 p-2" />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="documentType" className="text-xs font-bold">Tipo de documento</label>
          <InputText id="documentType" value={documentType} onChange={(e) => setDocumentType(e.target.value)} placeholder="Tipo de documento" className="border-solid border-2 p-2" />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="document" className="text-xs font-bold">Número de documento</label>
          <InputText id="document" value={document} onChange={(e) => setDocument(e.target.value)} placeholder="Documento" className="border-solid border-2 p-2" />
        </div>
      </div>
      <div className='flex flex-row justify-around m-4'>
        <div className="flex flex-column gap-2">
          <label htmlFor="phone" className="text-xs font-bold">Teléfono</label>
          <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" className="border-solid border-2 p-2" />
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="email" className="text-xs font-bold">Correo Electrónico</label>
          <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border-solid border-2 p-2" />
        </div>
      </div>
      {/* Add or Update Passenger Button */}
      <Button label={editingPassenger ? "Actualizar Pasajero" : "Agregar Pasajero"} icon="pi pi-plus" onClick={savePassenger} className="mt-4 p-button-success" />

      {/* Passenger DataTable */}
      <DataTable value={passengers} className="mt-4" responsiveLayout="scroll">
        <Column field="name" header="Nombres" />
        <Column field="surname" header="Apellidos" />
        <Column field="documentType" header="Tipo de documento" />
        <Column field="document" header="Documento" />
        <Column field="phone" header="Teléfono" />
        <Column field="email" header="Correo Electrónico" />
        <Column body={actionBodyTemplate} header="Acciones" />
      </DataTable>
    </div>
  );
};

export default PassengerInformation;
