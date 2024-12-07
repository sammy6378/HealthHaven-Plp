import React, { useState, ReactElement } from 'react';
import Sidebar from './ASidebar';
import ANav from './ANav';


const ALayout = ({ children }: { children: React.ReactNode }) =>{
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar: Fixed height */}
      <Sidebar isOpen={true} toggleSidebar={() => {}} />

      <div className="flex-1 flex flex-col overflow-y-auto">
      <ANav unreadCount={unreadCount} />

        <div className="flex-1 md: mb-12">
         {children}
        </div>
        </div>
      </div>
  );
};

export default ALayout;
