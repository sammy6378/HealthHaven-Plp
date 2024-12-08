
// export default Sidebar;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt,
  FaUserMd,
  FaUserFriends,
  FaUsers,
  FaSignOutAlt,
  FaCog,
  FaListAlt,
  FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/Store';
import { TAuthResponse } from '../../../services/service';
import { useConfirmLogout } from '../../DoctorDash/pages/LogoutHook';
import AMobileNavbar from './AMobile';

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

        <div className="border-b rounded-md flex justify-center shadow-lg cursor-pointer p-4">
          <img
            src="https://i.pinimg.com/564x/d4/90/9c/d4909cf3a4de812c4b39a63dcc41d48f.jpg"
            className="w-16"
            alt="logo image"
          />
          <h3 className="text-2xl font-bold mt-4">HealthHaven</h3>
        </div>

        <ul className="flex flex-col gap-4 mt-12">
  <li className={`${location.pathname === '/admin-dashboard' ? 'bg-slate-200 text-blue-600' : ''} py-2 px-4 rounded-sm`}>
    <Link to="/admin-dashboard" className="flex items-center gap-x-2" onClick={handleLinkClick}>
      <FaTachometerAlt /> <span>Dashboard</span>
    </Link>
  </li>
  <li className={`${location.pathname === '/admin-dashboard/create-doctors' ? 'bg-slate-200 text-blue-600' : ''} py-2 px-4 rounded-sm`}>
    <Link to="/admin-dashboard/create-doctors" className="flex items-center gap-x-2" onClick={handleLinkClick}>
      <FaUserMd /> <span>Create Doctor</span>
    </Link>
  </li>
  <li className={`${location.pathname === '/admin-dashboard/all-doctors' ? 'bg-slate-200 text-blue-600' : ''} py-2 px-4 rounded-sm`}>
    <Link to="/admin-dashboard/all-doctors" className="flex items-center gap-x-2" onClick={handleLinkClick}>
      <FaListAlt /> <span>All Doctors</span>
    </Link>
  </li>
  <li className={`${location.pathname === '/admin-dashboard/create-user' ? 'bg-slate-200 text-blue-600' : ''} py-2 px-4 rounded-sm`}>
    <Link to="/admin-dashboard/create-user" className="flex items-center gap-x-2" onClick={handleLinkClick}>
      <FaUsers /> <span>Create User</span>
    </Link>
  </li>
  <li className={`${location.pathname === '/admin-dashboard/all-users' ? 'bg-slate-200 text-blue-600' : ''} py-2 px-4 rounded-sm`}>
    <Link to="/admin-dashboard/all-users" className="flex items-center gap-x-2" onClick={handleLinkClick}>
      <FaUserFriends /> <span>All Users</span>
    </Link>
  </li>
  <li className={`${location.pathname === '/admin-dashboard/settings' ? 'bg-slate-200 text-blue-600' : ''} py-2 px-4 rounded-sm`}>
    <Link to="/admin-dashboard/settings" className="flex items-center gap-x-2" onClick={handleLinkClick}>
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
      <AMobileNavbar toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Sidebar;
