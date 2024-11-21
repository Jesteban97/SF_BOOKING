'use client'
import React from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import FlightCard from './components/FlightCard';
import Footer from './components/Footer';

const flights = [
  {
    id: 1,
    origin: "Medellín",
    departureDate: "11-09-2024",
    departureTime: "18:25",
    destination: "Bogotá",
    returnDate: "12-09-2024",
    returnTime: "11:25",
    price: "$300,000.00",
  },
  {
    id: 2,
    origin: "Cartagena",
    departureDate: "15-09-2024",
    departureTime: "09:00",
    destination: "Bogotá",
    returnDate: "16-09-2024",
    returnTime: "13:45",
    price: "$450,000.00",
  },
  {
    id: 3,
    origin: "Cali",
    departureDate: "20-09-2024",
    departureTime: "14:30",
    destination: "Medellín",
    returnDate: "22-09-2024",
    returnTime: "18:00",
    price: "$350,000.00",
  },
];

export default function SearchFlight() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow ">
        <div className='w-10/12 mx-auto mt-3'>
          <SearchForm />
        </div>
        <div className="max-w-4xl mx-auto mt-4">
          {flights.map((flight) => {
            return (
              <FlightCard
                key={flight.id}
                origin={flight.origin}
                departureDate={flight.departureDate}
                departureTime={flight.departureTime}
                destination={flight.destination}
                returnDate={flight.returnDate}
                returnTime={flight.returnTime}
                price={flight.price}
              />
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
