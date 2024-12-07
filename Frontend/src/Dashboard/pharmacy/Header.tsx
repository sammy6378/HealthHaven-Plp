// Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="p-4 bg-white flex justify-end items-center space-x-4">
      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 p-2 rounded-lg"
      />
      <img src="flag.png" alt="Language" className="w-6 h-6" />
      <img src="profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
    </div>
  );
};

export default Header;
