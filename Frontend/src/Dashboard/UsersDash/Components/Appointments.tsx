import React from 'react';
import { Link } from 'react-router-dom';

const appointments = [
  { type: 'Dentist', doctor: 'Dr. Gorex Mathew', time: '9:00 AM', daysUntil: 0 },
  { type: 'Cardiologist', doctor: 'Dr. Craig Gemx', time: '12:00 PM', daysUntil: 1 },
  { type: 'Orthopedist', doctor: 'Dr. Bruce Williams', time: '3:00 PM', daysUntil: 2 },
  { type: 'Physician', doctor: 'Dr. Kiera Knight', time: '4:00 PM', daysUntil: 3 },
  { type: 'Endocrinologist', doctor: 'Dr. Anni Roy', time: '6:00 PM', daysUntil: 5 },
];

const getDayLabel = (daysUntil) => {
  if (daysUntil === 0) return 'Today';
  if (daysUntil === 1) return 'Tomorrow';
  return `In ${daysUntil} days`;
};

const Appointments = () => {
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold text-orange-500 mb-4">Doctor Appointments</h3>
        <Link to="/user-dashboard/appointments" className="text-blue-500">View all</Link>
      </div>
      <ul className="space-y-2">
        {appointments.map((appointment, index) => (
          <li key={index} className="flex justify-between items-center p-2 border-b">
            <Link to={`/user-dashboard/appointments/${index}`} className="flex justify-between w-full items-center">
              <div>
                <h4 className="text-md font-semibold">{appointment.type}</h4>
                <p className="text-sm text-gray-500">{appointment.doctor}</p>
                {/* <p className="text-sm text-gray-500">{appointment.time}</p> */}
              </div>
              <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full font-semibold">{getDayLabel(appointment.daysUntil)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appointments;
