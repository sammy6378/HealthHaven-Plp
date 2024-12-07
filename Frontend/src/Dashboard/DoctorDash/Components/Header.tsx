import React from 'react';
import { FaUsers } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="flex flex-col p-5">
      <h1 className="text-xl font-mono">Good Morning, </h1>
      <p className='text-3xl font-semibold'>Mike Parker</p>
      <div className="flex flex-col justify-center items-center mt-4 bg-white rounded-lg shadow-md p-4">

      <div className="relative flex items-baseline">
      <h4 className="text-2xl text-orange-500 font-semibold">4.6</h4>
      <span className="text-orange-500 absolute top-0 right-[-15px] text-sm">★</span>
    </div>
    <p className="text-sm text-gray-500 ml-3">Review score (Overall)</p>
      </div>

      <div className="flex flex-col justify-center items-center mt-4 bg-white rounded-lg shadow-md p-4">
      <div className="relative flex items-baseline">
        <h4 className="text-2xl text-blue-700 font-semibold">146</h4>
        <span className="text-blue-700 absolute top-0 right-[-15px] text-sm"><FaUsers/></span>
        </div>
        <p className="text-sm text-gray-500 ml-6">Patients (Consulted) </p>
      </div>
    </div>
  );
};

export default Header;