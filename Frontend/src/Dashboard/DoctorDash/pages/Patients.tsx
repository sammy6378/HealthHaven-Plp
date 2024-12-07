import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const patientsData = [
  {
    name: 'Andrea Hiyahiya',
    gender: 'Female',
    age: 25,
    diagnosis: 'Cancer',
    phone: '(280) 548-0124',
    address: 'Nampa, Tennessee',
    blood: 'O+',
    status: 'Treated',
  },
  {
    name: 'Bianca Lalema',
    gender: 'Female',
    age: 42,
    diagnosis: 'Heart attack',
    phone: '(124) 864-1794',
    address: 'Nampa, Tennessee',
    blood: 'AB+',
    status: 'In Progress',
  },
  {
    name: 'John Smith',
    gender: 'Male',
    age: 27,
    diagnosis: 'Cancer',
    phone: '(789) 164-4876',
    address: 'San Francisco, Oregon',
    blood: 'A+',
    status: 'In Progress',
  },
  // Add more patients here...
];

const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === 'All' || patient.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (patient) => {
    navigate('/dashboard/patient-list/more-details', { state: { patient } });
  };

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Patient Records</h2>
      
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Gender Filter */}
        <select
          className="p-2 border rounded w-full md:w-1/3"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Patient Table */}
      <div className="overflow-x-auto">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-blue-100 text-gray-700">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Gender</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">Diagnosis</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {currentPatients.length > 0 ? (
              currentPatients.map((patient, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition duration-150 cursor-pointer"
                  onClick={() => handleRowClick(patient)}
                >
                  <td className="p-4 whitespace-nowrap">{patient.name}</td>
                  <td className="p-4">{patient.gender}</td>
                  <td className="p-4 whitespace-nowrap">{patient.age} yo</td>
                  <td className="p-4">{patient.diagnosis}</td>
                  <td className="p-4 whitespace-nowrap">{patient.phone}</td>
                  <td className="p-4 truncate whitespace-nowrap overflow-hidden">{patient.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === 1}
          onClick={() => handlePageChange('prev')}
        >
          Previous
        </button>
        <p className="text-sm">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition ${
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange('next')}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientList;
