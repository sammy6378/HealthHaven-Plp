import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaPills, FaUser, FaCog, FaSignOutAlt, FaBell, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { TAuthResponse } from '../../services/service';
import { useConfirmLogout } from '../DoctorDash/pages/LogoutHook';
import MobileNavbar from './component/Mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { openModal, ConfirmLogoutModal } = useConfirmLogout();
  const location = useLocation();

  // Redux selector to get user data
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.patient as TAuthResponse | null;
  const firstName = user ? user.first_name : 'User';

  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility on small screens
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Close sidebar after clicking a link
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-gray-800 opacity-50 lg:hidden" onClick={toggleSidebar}></div>}

      <div
        className={`fixed top-0 left-0 lg:static lg:w-1/5 w-2/3 bg-white p-4 h-full z-30 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:h-auto lg:overflow-auto overflow-y-auto`}
        style={{ maxHeight: '100vh' }} // Ensure the sidebar height is limited to the screen size
      >
        <button className="lg:hidden absolute top-4 right-4 text-gray-600" onClick={toggleSidebar}>
          <FaTimes size={24} />
        </button>

        <div className="flex flex-col gap-2">
          <div className="border-b rounded-md flex justify-center shadow-lg cursor-pointer p-4">
            <img
              src="https://i.pinimg.com/564x/d4/90/9c/d4909cf3a4de812c4b39a63dcc41d48f.jpg"
              className="w-16"
              alt="logo image"
            />
            <h3 className="text-2xl font-bold mt-4">HealthHaven</h3>
          </div>
          <h5 className="text-gray-500">Pharmacy</h5>
        </div>

        <ul className="flex flex-col gap-4 mt-12">
          <li
            className={`${
              location.pathname === '/pharmacy-dashboard' ? 'bg-slate-200 text-blue-600' : ''
            } py-2 px-4 rounded-sm`}
          >
            <Link to="/pharmacy-dashboard" className="flex items-center gap-x-2" onClick={handleLinkClick}>
              <FaTachometerAlt /> <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={`${
              location.pathname === '/pharmacy-dashboard/medicine' ? 'bg-slate-200 text-blue-600' : ''
            } py-2 px-4 rounded-sm`}
          >
            <Link to="/pharmacy-dashboard/medicine" className="flex items-center gap-x-2" onClick={handleLinkClick}>
              <FaPills /> <span>Medicine</span>
            </Link>
          </li>
          <li
            className={`${
              location.pathname === '/pharmacy-dashboard/Prescriptions' ? 'bg-slate-200 text-blue-600' : ''
            } py-2 px-4 rounded-sm`}
          >
            <Link to="/pharmacy-dashboard/Prescriptions" className="flex items-center gap-x-2" onClick={handleLinkClick}>
              <FaUser /> <span>Prescriptions</span>
            </Link>
          </li>
          <li
            className={`${
              location.pathname === '/pharmacy-dashboard/notifications' ? 'bg-slate-200 text-blue-600' : ''
            } py-2 px-4 rounded-sm`}
          >
            <Link to="/pharmacy-dashboard/notifications" className="flex items-center gap-x-2" onClick={handleLinkClick}>
              <FaBell /> <span>Notifications</span>
            </Link>
          </li>
          <li
            className={`${
              location.pathname === '/pharmacy-dashboard/settings' ? 'bg-slate-200 text-blue-600' : ''
            } py-2 px-4 rounded-sm`}
          >
            <Link to="/pharmacy-dashboard/settings" className="flex items-center gap-x-2" onClick={handleLinkClick}>
              <FaCog /> <span>Settings</span>
            </Link>
          </li>
          <li className="py-2 px-4 rounded-sm">
            <button onClick={openModal} className="flex items-center gap-x-2">
              <FaSignOutAlt /> <span>Logout</span>
            </button>
            <ConfirmLogoutModal />
          </li>
        </ul>
      </div>
      <MobileNavbar toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Sidebar;
