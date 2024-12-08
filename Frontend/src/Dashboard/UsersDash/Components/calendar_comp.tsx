import React, { useState } from 'react';
import BasicDateCalendar from './Calendar';

function Calendar_comp({ appointments }) {
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([]);

  const handleDateClick = (date) => {
    const formattedDate = date.format('YYYY-MM-DD'); // Match format of appointments array
    const eventsForDate = appointments.filter((event) => event.date === formattedDate);
    setSelectedDateEvents(eventsForDate);
  };

  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md space-y-8 lg:space-y-0 lg:space-x-16 mt-10">
      {/* Calendar Component */}
      <div className="flex-shrink-0 lg:w-1/3">
        <BasicDateCalendar 
          appointments={appointments} 
          onDateClick={handleDateClick} 
        />
      </div>

      {/* Event Display Section */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-orange-500">Appointments</h2>
        <ul>
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event, index) => (
              <li key={index} className="p-2 border-b border-gray-200">
                <p>Appointment with Doctor: {event.doctor || 'Unknown'}</p>
                <p>Time for the appointment: {event.time || 'TBA'}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No appointments for this date.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Calendar_comp;
