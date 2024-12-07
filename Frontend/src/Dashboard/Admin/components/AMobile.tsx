import React from 'react';
import { FaTachometerAlt, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useConfirmLogout } from '../../DoctorDash/pages/LogoutHook';

interface MobileNavbarProps {
  toggleSidebar: () => void;
}

const AMobileNavbar: React.FC<MobileNavbarProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  const { openModal, ConfirmLogoutModal } = useConfirmLogout();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white z-10 shadow-lg flex justify-around py-2 border-t border-gray-300 lg:hidden">
      <button onClick={toggleSidebar} className="flex flex-col items-center">
        <FaTachometerAlt size={24} />
        <span className="text-xs">Dashboard</span>
      </button>
      <Link
        to="/pharmacy-dashboard/notifications"
        className={`flex flex-col items-center ${
          location.pathname === '/pharmacy-dashboard/notifications' ? 'text-blue-600' : 'text-gray-500'
        }`}
      >
        <FaBell size={24} />
        <span className="text-xs">Notifications</span>
      </Link>
      <Link
        to="/pharmacy-dashboard/settings"
        className={`flex flex-col items-center ${
          location.pathname === '/pharmacy-dashboard/settings' ? 'text-blue-600' : 'text-gray-500'
        }`}
      >
        <FaCog size={24} />
        <span className="text-xs">Settings</span>
      </Link>
      <div
        className={`flex flex-col items-center ${
          location.pathname === '/logout' ? 'text-blue-600' : 'text-gray-500'
        }`}
      >
        <button onClick={openModal} className="flex flex-col items-center">
          <FaSignOutAlt size={24} />
          <span className="text-xs">LogOut</span>
        </button>
        <ConfirmLogoutModal />
      </div>
    </div>
  );
};

export default AMobileNavbar;
