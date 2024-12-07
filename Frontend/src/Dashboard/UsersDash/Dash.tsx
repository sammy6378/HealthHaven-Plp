import React,{useState} from 'react';
import Sidebar from '../../Dashboard/UsersDash/Components/Sidebar';
import Nav from './Components/Nav';

const Dash = ({ children }: { children: React.ReactNode }) =>{

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar: Fixed height */}
      <Sidebar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col">
        {/* Navigation Bar at the Top */}
        <Nav toggleSidebar={toggleSidebar} />
    

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-5 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dash;
