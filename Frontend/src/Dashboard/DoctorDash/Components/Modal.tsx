import React from 'react';

const Modal = ({ appointment, onClose }) => {
  const renderButton = () => {
    switch (appointment.type) {
      case 'Video':
        return (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => window.location.href = appointment.link}
          >
            Share Video Link
          </button>
        );
      case 'Chat':
        return (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => window.location.href = appointment.link}
          >
            Chat Now
          </button>
        );
      case 'Phone':
        return (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={() => window.location.href = appointment.link}
          >
            Call Now
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-5 w-80">
        <h2 className="text-xl font-semibold">{appointment.name}</h2>
        <p className="text-sm">{appointment.condition}</p>
        <p className="mt-2">Time: {appointment.time}</p>
        <p className="mt-2">Date: {appointment.date}</p>
        <div>
          {renderButton()} {/* Render the appropriate button based on appointment type */}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
