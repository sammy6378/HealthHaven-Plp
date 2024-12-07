import React, { useState, ReactElement } from 'react';
import Notifications from './notificationPage'; // Adjust the import path as necessary
import Sidebar from './Sidebar';
import PNav from './PNav';


const PLayout = ({ children }: { children: React.ReactNode }) =>{
  const [unreadCount, setUnreadCount] = useState(0);
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Sidebar: Fixed height */}
      <Sidebar isOpen={true} toggleSidebar={() => {}} />

      <div className="flex-1 flex flex-col overflow-y-auto">
      <PNav unreadCount={unreadCount} />

        <div className="flex-1 md: mb-12">
         {/* Check if children is Notifications and pass setUnreadCount */}
         {React.isValidElement(children) && children.type === Notifications
            ? React.cloneElement(children as ReactElement<{ setUnreadCount: (count: number) => void }>, { setUnreadCount })
            : children}
        </div>
        </div>
      </div>
  );
};

export default PLayout;
