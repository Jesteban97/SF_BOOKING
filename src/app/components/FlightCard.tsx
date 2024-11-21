import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
interface FlightCardProps {
  origin: string;
  departureDate: string;
  departureTime: string;
  destination: string;
  returnDate: string;
  returnTime: string;
  price: string;
}

const FlightCard: React.FC<FlightCardProps> = ({
  origin,
  departureDate,
  departureTime,
  destination,
  returnDate,
  returnTime,
  price
}) =>{
    const router = useRouter()
    return (
  <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center my-2 shadow-sm">
    <div className="flex items-center space-x-4">
    <Image src="/logo.png" alt="Logo" width={70} 
        height={70} priority />
      <div>
        <p className="font-bold">Ida</p>
        <p>{origin} - {departureDate} {departureTime}</p>
        <p className="font-bold">Vuelta</p>
        <p>{destination} - {returnDate} {returnTime}</p>
      </div>
    </div>
    <div className="text-center">
      <p className="font-bold">Valor en COP</p>
      <p>{price}</p>
    </div>
    <button className="bg-blue-900 text-white px-4 py-2 rounded" onClick={()=>{router.push('/Booking')}}>Seleccionar Vuelo</button>
  </div>
);
}
export default FlightCard;

