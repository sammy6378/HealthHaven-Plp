import React, { useState } from 'react';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useConfirmLogout } from '../../DoctorDash/pages/LogoutHook';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/Store'; // Adjust import path based on your structure

function ANav({ unreadCount }: { unreadCount: number }) {
  const { openModal, ConfirmLogoutModal } = useConfirmLogout();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Retrieve user data from the store
  const user = useSelector((state: RootState) => state.adminAuth.admin);

  // Safely get first and last name
  const { first_name, last_name } = user || { first_name: '', last_name: '' };

  // Combine initials
  const initials = `${first_name.charAt(0).toUpperCase()}${last_name.charAt(0).toUpperCase()}`;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className="flex justify-end items-center mt-4 pr-6">
        <div className="flex items-center space-x-4">
          {/* Display initials */}
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg text-white font-semibold">
            <button onClick={toggleDropdown}>{initials}</button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div className="absolute right-14 top-14 w-48 bg-white rounded-md shadow-lg z-10">
          <Link
            to="/admin-dashboard/settings"
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

export default ANav;
