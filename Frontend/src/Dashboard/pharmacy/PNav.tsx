import React, { useState } from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useConfirmLogout } from '../DoctorDash/pages/LogoutHook';

function PNav({ unreadCount }: { unreadCount: number }) {
  const { openModal, ConfirmLogoutModal } = useConfirmLogout();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  
  return (
    <>
      <div className="flex justify-end items-center mt-4 pr-6">
        <div className="flex items-center space-x-4">
          
          {/* Notification Icon */}
          <div className="relative">
            <Link to={"/pharmacy-dashboard/notifications"} className="text-white relative focus:ring-blue-300 focus:outline-none transition duration-200">
            <FaBell className="text-xl text-gray-700 cursor-pointer" />
            </Link>
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg text-white font-semibold">
            <button onClick={toggleDropdown}>JD</button>
          </div>

          
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div className="absolute right-14 top-14 w-48 bg-white rounded-md shadow-lg z-10">
          <Link
            to="/pharmacy-dashboard/profile-page"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaUser className="mr-2" /> Profile
          </Link>
          <Link
            to="/pharmacy-dashboard/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <FaCog className="mr-2" /> Settings
          </Link>
          <div
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
            onClick={openModal}
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </div>
          <ConfirmLogoutModal />
        </div>
      )}
    </>
  );
}

export default PNav;
