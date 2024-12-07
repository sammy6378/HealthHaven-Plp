import React from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Helper function to calculate relative time
const getRelativeTime = (date: string): string => {
  const today = new Date();
  const appointmentDate = new Date(date);
  const diffTime = Math.ceil(
    (appointmentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffTime === 0) return 'Today';
  if (diffTime === 1) return 'Tomorrow';
  if (diffTime > 1) return `In ${diffTime} days`;
  return 'Past';
};

const appointments = [
  { date: '2024-11-17', patient: 'Dave Johnson' },
  { date: '2024-11-18', patient: 'Abby Stevenson' },
  { date: '2024-11-20', patient: 'Jerry Spenser' },
  { date: '2024-11-22', patient: 'Mark Gylenhaal' },
];

const Appointments = () => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        <Link to={'/dashboard/appointments'} className="text-blue-600 underline">
          View all
        </Link>
      </div>
      <ul>
        <li className="flex justify-between mb-3 p-2 text-orange-600">
          <div>Date</div>
          <div>Patient</div>
          <div>Status</div>
        </li>
        {appointments.map((appointment, index) => (
          <li key={index} className="flex justify-between border-b hover:bg-gray-100 p-2">
            <div>{appointment.date}</div>
            <div >{appointment.patient}</div>
            <div className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full font-semibold">{getRelativeTime(appointment.date)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
