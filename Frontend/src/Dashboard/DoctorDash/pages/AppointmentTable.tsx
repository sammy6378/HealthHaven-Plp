import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppointmentForm from '../Components/AppointmentForm';
import { FaClipboardList, FaCalendarCheck, FaClock, FaUserMd } from "react-icons/fa";

const AppointmentTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const itemsPerPage = 5;

  const appointments = [
    {
      id: 1,
      date: '2024-11-17',
      time: '12:00',
      patient: 'Samuel Johnson',
      type: 'Video',
      location: 'Room 301',
      notes: 'Message from Samuel',
    },
    {
      id: 2,
      date: '2024-11-19',
      time: '10:30',
      patient: 'David Smith',
      type: 'In-Person',
      location: 'Clinic A',
      notes: 'Message from David',
    },
    {
      id: 3,
      date: '2024-11-18',
      time: '14:00',
      patient: 'Alice Walker',
      type: 'Chat',
      location: 'Virtual',
      notes: 'Message from Alice',
    },
    // More appointments here
  ];

  // Filtered and paginated appointments
  const filteredAppointments = appointments.filter((appt) =>
    appt.patient.toLowerCase().includes(filter.toLowerCase())
  );
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper for relative status
  const getStatus = (date) => {
    const today = new Date();
    const apptDate = new Date(date);
    const diff = Math.ceil(
      (apptDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff > 1) return `In ${diff} days`;
    return 'Completed';
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="overflow-x-auto my-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Appointments</h1>

      {/* Stats Section */}
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
      {[
        { icon: <FaClipboardList />, value: "123", label: "Total Appointments", bgColor: "bg-blue-500" },
        { icon: <FaCalendarCheck />, value: "56", label: "Completed Appointments", bgColor: "bg-green-500" },
        { icon: <FaClock />, value: "20", label: "Upcoming Appointments", bgColor: "bg-yellow-500" },
        { icon: <FaUserMd />, value: "47", label: "Canceled Appointments", bgColor: "bg-red-500" },
      ].map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} text-white p-5 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out`}
        >
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <p className="text-lg font-semibold">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

     
      {/* Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search Appointments..."
          className="flex-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          onClick={openModal}
        >
          Create Appointment
        </button>
      </div>


      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg mt-6">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedAppointments.map((appt) => (
              <tr
                key={appt.id}
                className="hover:bg-blue-50 transition duration-150 whitespace-nowrap"
              >
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>
                <td className="p-3">{appt.patient}</td>
                <td className="p-3">{appt.type}</td>
                <td className="p-3">{appt.location}</td>
                <td className="text-green-800 p-3">{getStatus(appt.date)}</td>
                <td className="p-3">
                  <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                    Done
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">
                    Clear
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of{' '}
          {Math.ceil(filteredAppointments.length / itemsPerPage)}
        </span>
        <button
          disabled={
            currentPage === Math.ceil(filteredAppointments.length / itemsPerPage)
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && <AppointmentForm closeModal={closeModal} />}
    </div>
  );
};

AppointmentTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      patient: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      notes: PropTypes.string,
    })
  ),
};

export default AppointmentTable;
