import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/Store';
import React from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaBell, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TAuthResponse } from '../../../services/service';
import { useConfirmLogout } from '../../DoctorDash/pages/LogoutHook';
import NotificationPanel from '../pages/Notifications';

const Nav = ({ toggleSidebar }) => {
  const { openModal, ConfirmLogoutModal } = useConfirmLogout();
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.patient as TAuthResponse | null;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0); 

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleNotificationModal = () => {
    setNotificationModalVisible(!notificationModalVisible);
  };


  const first_name = user ? user.first_name : '';

  return (
    <nav className="z-50 w-full bg-[#12ac8e]">
      <div className="px-4 py-3 flex justify-between items-center">
        {/* Sidebar Toggle for mobile */}
        <button onClick={toggleSidebar} className="lg:hidden text-white">
          <FaBars size={24} />
        </button>

        <h2 className='text-2xl font-bold text-white'>
          Welcome, {first_name}!
        </h2>

        {/* Right Section: Profile Image and Notification Icon */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button onClick={toggleNotificationModal} className="text-white relative">
            <FaBell size={24} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Section */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              type="button"
              className="flex items-center text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              aria-expanded={dropdownVisible}
            >
              <img
                className="w-8 h-8 rounded-full"
                src="https://i.pinimg.com/564x/e6/21/c2/e621c2c9381c059cc61f17f76647de20.jpg"
                alt="user avatar"
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownVisible && (
              <div className="absolute right-2 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/user-dashboard/profile-page"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaUser className="mr-2" /> Profile
                </Link>
                <Link
                  to="/user-dashboard/notifications"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FaBell className="mr-2" /> Notifications
                </Link>
                <Link
                  to="/user-dashboard/settings"
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
          </div>
        </div>

        {/* Notification Modal */}
        {notificationModalVisible && (
          <div className="absolute top-16 right-24 w-80 bg-white rounded-md shadow-lg z-40">
              <NotificationPanel setUnreadCount={setUnreadCount} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
