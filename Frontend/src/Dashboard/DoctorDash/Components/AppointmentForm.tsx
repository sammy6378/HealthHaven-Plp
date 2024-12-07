import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

const AppointmentForm = ({ setAppointments, closeModal,addEvent }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctor: '',
    notes: '',
  });

  const [appointment, setAppointment] = useState({}); // Current appointment being added

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Update the appointment object with the new data
    const currentObj = { [name]: value };
    setAppointment((prev) => ({ ...prev, ...currentObj }));
  };

  const socket = io('localhost:8000');

  function connectSocket() {
    socket.on('connection', (socket) => {
      console.log("Connected", socket);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newAppointment = { ...formData, id: Date.now() };
  
    // Set appointments and also create a new event for the calendar
    setAppointments((prev) => [...prev, newAppointment]);
    // Assuming you have a method to add events to your calendar, like `addEvent`
    addEvent({
      title: newAppointment.doctor,
      start: new Date(`${newAppointment.date}T${newAppointment.time}`),
      end: new Date(`${newAppointment.date}T${newAppointment.time}`), // Adjust end time as needed
      reminderTime: 10, // Set a default reminder or use another field from your form
    });
  
    setFormData({ date: '', time: '', doctor: '', notes: '' });

    // Emit the data and update the scores state
    socket.emit('appointments', appointment);

    // Success message on successful submission
    toast.success("appointments submitted successfully!");


    closeModal(); // Close modal after submission
  };

 

  useEffect(() => {
    connectSocket();
  });
  
  return (
    
    <div className="fixed inset-0 left-1/4 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg transform transition-transform duration-500 ease-in-out animate-slide-up"
      >
          <ToastContainer /> 
        <h2 className="text-2xl font-semibold text-center mb-6">Create Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            placeholder="Doctor's Name"
            className="w-full border border-gray-300 p-3 rounded"
            required
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full border border-gray-300 p-3 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded">
            Create Appointment
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-full bg-gray-400 text-white p-3 rounded mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

AppointmentForm.propTypes = {
  setAppointments: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
};

export default AppointmentForm;
