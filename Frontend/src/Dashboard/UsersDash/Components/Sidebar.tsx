import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useConfirmLogout } from '../../DoctorDash/pages/LogoutHook';
import { FaCalendarAlt, FaCog, FaSignOutAlt, FaPen, FaUserMd, FaFileMedical, FaFileInvoiceDollar, FaBars, FaTimes } from 'react-icons/fa';
import { LayoutDashboard } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/Store';
import { TAuthResponse } from '../../../services/service';



const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { openModal, ConfirmLogoutModal } = useConfirmLogout();
  const [imageSrc, setImageSrc] = useState('https://i.pinimg.com/564x/e6/21/c2/e621c2c9381c059cc61f17f76647de20.jpg');

  const location = useLocation();

  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.patient as TAuthResponse | null;

  const first_name = user ? user.first_name : '';

  return (
    <>
      {/* Sidebar Background for mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-gray-800 opacity-50 lg:hidden" onClick={toggleSidebar}></div>}

      <div className={`fixed top-0 left-0 lg:static lg:w-1/4 bg-white border-r-2 p-4 h-full z-30 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Close button for mobile */}
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
            <h4 className="text-lg font-bold">{first_name}</h4>
            <p className="text-sm text-gray-600">OutPatient</p>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
          <li className={`${location.pathname === '/user-dashboard' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
            <Link to="/user-dashboard" className="mb-3 flex items-center gap-x-2">
              <LayoutDashboard /> <span>Dashboard</span>
            </Link>
          </li>
          <li className={`${location.pathname === '/user-dashboard/appointments' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
            <Link to="/user-dashboard/appointments" className="mb-3 flex items-center gap-x-2">
              <FaCalendarAlt /> <span>Appointments</span>
            </Link>
          </li>
          <li className={`${location.pathname === '/user-dashboard/find-doctor' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
            <Link to="/user-dashboard/find-doctor" className="mb-3 flex items-center gap-x-2">
              <FaUserMd /> <span>Find Doctor</span>
            </Link>
          </li>
          <li className={`${location.pathname === '/user-dashboard/medical-records' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
            <Link to="/user-dashboard/medical-records" className="mb-3 flex items-center gap-x-2">
              <FaFileMedical /> <span>Medical Records</span>
            </Link>
          </li>
          <li className={`${location.pathname === '/user-dashboard/billings' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
            <Link to="/user-dashboard/billings" className="mb-3 flex items-center gap-x-2">
              <FaFileInvoiceDollar /> <span>Billings</span>
            </Link>
          </li>
          <li className={`${location.pathname === '/user-dashboard/settings' ? 'bg-slate-200 text-blue-600' : ''} py-1 px-4 rounded-sm`}>
            <Link to="/user-dashboard/settings" className="mb-3 flex items-center gap-x-2">
              <FaCog /> <span>Settings</span>
            </Link>
          </li>
          <li className={`py-1 px-4 rounded-sm`}>
            <a href="#" onClick={openModal} className="flex items-center">
              <FaSignOutAlt className="mr-3" /> Log Out
            </a>
            <ConfirmLogoutModal />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
