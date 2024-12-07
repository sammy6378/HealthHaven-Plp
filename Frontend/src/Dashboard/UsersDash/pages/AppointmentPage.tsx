
import React, { useState } from 'react';
import AppointmentForm from '../Components/AppointmentForm';
import AppointmentTable from '../Components/AppointmentTable';
import BasicDateCalendar from '../Components/Calendar';
import '../../../index.css';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState<any[]>([]); // List of appointments
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]); // Events for selected date

 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // const addEvent = (event) => {
  //   const formattedDate = new Date(event.date).toLocaleDateString('en-CA'); // Format to YYYY-MM-DD
  //   const eventWithFormattedDate = { ...event, date: formattedDate };
  //   setAppointments((prev) => [...prev, eventWithFormattedDate]);
  //   console.log('New appointment added:', eventWithFormattedDate);
  // };

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
  
  
  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString('en-CA'); // Use same format for date comparison
    const eventsForDate = appointments.filter((event) => event.date === formattedDate);
    setSelectedDateEvents(eventsForDate);
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
      <div className="flex bg-white p-6 rounded-lg shadow-md space-x-8 mt-10">
        <BasicDateCalendar 
          appointments={appointments} 
          onDateClick={handleDateClick} // Pass handleDateClick to calendar
        />
        
        {/* Event Display Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-orange-500">Appointments</h2>
          <ul>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <li key={index} className="p-2 border-b border-gray-200">
                   <p>Appointment with Dr. {event.doctor}</p>
                  <p>{event.time}</p>
                </li>
              ))
            ) : (
              <p>No appointments for this date.</p>
            )}
          </ul>
        </div>
      </div>

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
