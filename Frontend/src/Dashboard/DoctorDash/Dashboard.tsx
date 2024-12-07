import React from 'react';
import Sidebar from '../DoctorDash/Components/Sidebar'
import DNav from './Components/DNav';


const Dashboard = ({ children }: { children: React.ReactNode }) =>{
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar: Fixed height */}
      <Sidebar />

      {/* Main Content: Scrollable */}
      <div className="flex-1 overflow-y-auto p-5">
        <DNav />
        <div className='mt-6 mb-0 sm:mb-4'>
        {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
