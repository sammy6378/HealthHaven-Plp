import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SyncLoader } from 'react-spinners';

type ConfirmLogoutProps = {
  onClose: () => void;
  onConfirm: () => void;
};

function ConfirmLogout({ onClose, onConfirm }: ConfirmLogoutProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    // Simulate a delay for the logout process
    setTimeout(() => {
      onConfirm();
    }, 2000); 
  };

  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Confirm Logout</h2>
        {!loading ? (
          <>
            <p className="text-center mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-around">
              <button
                onClick={handleConfirm}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Yes, Logout
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <SyncLoader color="#36D7B7" loading={loading} size={15} />
            <p className="mt-4 text-center">Logging out...</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default ConfirmLogout;
