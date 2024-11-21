import React, { Dispatch, SetStateAction } from 'react';
import { InputText } from 'primereact/inputtext';

interface PrincipalInformationProps {
  setPhone: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  phone: string;
  email: string;
}

const PrincipalInformation: React.FC<PrincipalInformationProps> = ({ setPhone, setEmail,phone,email }) => {
  return (
    <div>
        <div className='flex flex-row justify-around'>
      <div className="flex flex-column gap-2">
        <label htmlFor="phone" className='text-xs font-bold'><span className=' text-xs  font-bold pi pi-phone ml-2'></span> Teléfono</label>
        <InputText 
          id="phone" 
          placeholder='Teléfono de contacto'
          onChange={(e) => setPhone(e.target.value)} 
          className='border-solid border-2 p-2'
          value={phone}
        />
      </div>
      <div className="flex flex-column gap-2">
        <label htmlFor="email" className='text-xs font-bold'><span className=' text-xs font-bold pi pi-envelope ml-2'></span> Correo Electrónico</label>
        <InputText 
          id="email" 
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)} 
          className='border-solid border-2 p-2'
          value={email}
        />
        </div>
      </div>
    </div>
  );
};

export default PrincipalInformation;
