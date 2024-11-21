import React from 'react';
import Image from 'next/image';
const Header = () => (
  <header className="bg-blue-900 p-4 flex justify-between items-center text-white">
    <div>
    <i className="pi pi-bars" style={{ fontSize: '1.5rem' }}></i>
    </div>
    <div className="text-2xl font-bold flex items-center space-x-2">
      <Image src="/logo.png" alt="Logo" width={70} 
        height={70} priority />
      <span>Aerolínea</span>
    </div>
    <div>
    <i className="pi pi-user" style={{ fontSize: '1.5rem' }}></i>
    </div>
  </header>
);

export default Header;
