
import React, { useState } from 'react';
import AppointmentForm from '../Components/AppointmentForm';
import AppointmentTable from '../Components/AppointmentTable';

import '../../../index.css';
import Calendar_comp from '../Components/calendar_comp';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]); // List of appointments
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addEvent = (event) => {
    // Ensure the event.date is in the correct format (e.g., "YYYY-MM-DD")
    const inputDate = event.date; // Adjust based on how the date is coming in
    const parsedDate = new Date(inputDate); // Attempt to create a date
  
    // Check if the date is valid
    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date:', inputDate);
      return; // Early return if date is invalid
    }
  
    const formattedDate = parsedDate.toLocaleDateString('en-CA'); // Format to YYYY-MM-DD
    const eventWithFormattedDate = { ...event, date: formattedDate };
  
    setAppointments((prev) => [...prev, eventWithFormattedDate]);
    console.log('New appointment added:', eventWithFormattedDate);
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-orange-500">Appointments</h1>
        <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded">
          Create Appointment
        </button>
      </div>

      <AppointmentTable appointments={appointments} />
      <Calendar_comp  appointments={appointments} />

      {isModalOpen && (
        <AppointmentForm 
          setAppointments={setAppointments} 
          closeModal={closeModal} 
          addEvent={addEvent}
        />
      )}
    </div>
  );
};

export default AppointmentPage;
