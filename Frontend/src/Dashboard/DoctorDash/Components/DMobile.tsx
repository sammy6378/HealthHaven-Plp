import React from 'react';
import { FaTachometerAlt, FaBell, FaCog, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

interface MobileNavbarProps {
  toggleSidebar: () => void;
}

const DMobile: React.FC<MobileNavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white z-10 shadow-lg flex justify-around py-2 border-t border-gray-300 lg:hidden">
      <button onClick={toggleSidebar} className="flex flex-col items-center">
        <FaTachometerAlt size={24} />
        <span className="text-xs">Dashboard</span>
      </button>
      <Link to="/doctor-dashboard/appointments" className={`flex flex-col items-center ${location.pathname === '/pharmacy-dashboard/notifications' ? 'text-blue-600' : 'text-gray-500'}`}>
        <FaBell size={24} />
        <span className="text-xs">Notifications</span>
      </Link>
      <Link to="/doctor-dashboard/settings" className={`flex flex-col items-center ${location.pathname === '/pharmacy-dashboard/settings' ? 'text-blue-600' : 'text-gray-500'}`}>
        <FaCog size={24} />
        <span className="text-xs">Settings</span>
      </Link>
      <Link to="/doctor-dashboard/profile-page" className={`flex flex-col items-center ${location.pathname === '/pharmacy-dashboard/profile-page' ? 'text-blue-600' : 'text-gray-500'}`}>
        <FaUser size={24} />
        <span className="text-xs">Profile</span>
      </Link>
    </div>
  );
};

export default DMobile;
