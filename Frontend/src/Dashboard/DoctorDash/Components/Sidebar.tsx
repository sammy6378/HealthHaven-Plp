import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaCalendarAlt,FaUsers,FaChartLine,FaCog,FaSignOutAlt,FaPills,FaTimes } from 'react-icons/fa';
import { LayoutDashboard } from 'lucide-react';
import  '../../../index.css'
import { useState } from 'react';

import { useConfirmLogout } from '../pages/LogoutHook';
import DMobile from './DMobile';

const Sidebar = () => {
  const { openModal, ConfirmLogoutModal } = useConfirmLogout();

  const [imageSrc, setImageSrc] = useState('https://i.pinimg.com/564x/e6/21/c2/e621c2c9381c059cc61f17f76647de20.jpg');

  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility on small screens
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const location = useLocation();

  return (
    <>
  {isOpen && <div className="fixed inset-0 bg-gray-800 opacity-50 lg:hidden" onClick={toggleSidebar}></div>}

  <div className={`fixed top-0 left-0 overflow-y-auto scrollbar-thin sidebar-container lg:static lg:w-1/4 bg-white p-4 h-full z-30 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <button className="lg:hidden absolute top-4 right-4 text-gray-600" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </button>

        <div className=' border-b rounded-md flex justify-center shadow-lg cursor-pointer'>
            <img src='https://i.pinimg.com/564x/d4/90/9c/d4909cf3a4de812c4b39a63dcc41d48f.jpg' className='w-16' alt="logo image" />
            <h3 className="text-2xl font-bold mt-4">TeleMed Health</h3>
        </div>
        <div className="flex items-center my-6">
      {/* Profile image container */}
      <div className="relative">
        <img
          src={imageSrc}
          alt="profile"
          className="rounded-full w-24 h-24 border shadow-md object-cover"
        />
       
      </div>

      {/* User information */}
      <div className="ml-3">
        <h4 className="text-lg font-bold">Mike Parker</h4>
        <p className="text-sm text-gray-600">Dermatologist</p>
      </div>
    </div>

<ul className='flex flex-col gap-2'>
  <li className={` cursor-pointer ${location.pathname === '/doctor-dashboard' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
    <Link to="/doctor-dashboard" className="mb-3 flex items-center  gap-x-2">
      <LayoutDashboard /> <span>Dashboard</span>
    </Link>
  </li>
  
  <li className={`${location.pathname === '/doctor-dashboard/appointments' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
    <Link to="/doctor-dashboard/appointments" className="mb-3 flex items-center gap-x-2">
      <FaCalendarAlt /> <span>Appointments</span>
    </Link>
  </li>
  
  <li className={`${location.pathname === '/doctor-dashboard/patient-lists' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
    <Link to="/doctor-dashboard/patient-lists" className="mb-3 flex items-center gap-x-2">
      <FaUsers /> <span>Patient Records</span>
    </Link>
  </li>

  <li className={`${location.pathname === '/doctor-dashboard/all-medicines' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
    <Link to="/doctor-dashboard/all-medicines" className="mb-3 flex items-center gap-x-2">
      <FaPills /> <span>Medicines</span>
    </Link>
  </li>

  <li className={`${location.pathname === '/doctor-dashboard/Prescriptions' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
    <Link to="/doctor-dashboard/Prescriptions" className="mb-3 flex items-center gap-x-2">
      <FaChartLine /> <span>Prescriptions</span>
      
    </Link>
  </li>
  
  <li className={`${location.pathname === '/doctor-dashboard/settings' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
    <Link to="/doctor-dashboard/settings" className="mb-3 flex items-center gap-x-2">
      <FaCog /> <span>Settings</span>
    </Link>
  </li>
  
  <li className={`${location.pathname === '/logout' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
  <a href='#'  onClick={openModal} className="flex items-center">
      <FaSignOutAlt className=' mr-3' /> Log Out
      </a>
      <ConfirmLogoutModal />
  </li>
</ul>
    </div>
<DMobile toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Sidebar;