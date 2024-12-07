import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import PrescriptionForm from '../Components/PrescriptionForm';
import { Link } from 'react-router-dom';

// Sample prescription data
const prescriptionsData = [
  {
    patientName: 'John Doe',
    medicine: 'Paracetamol',
    category: 'Pain Relief',
    quantity: 2,
    issueDate: '2024-11-10',
    price: 10.0,
    expiryDate: '2025-10-01',
  },
  {
    patientName: 'Jane Smith',
    medicine: 'Ibuprofen',
    category: 'Pain Relief',
    quantity: 1,
    issueDate: '2024-11-11',
    price: 8.0,
    expiryDate: '2024-12-15',
  },
  {
    patientName: 'Alice Johnson',
    medicine: 'Cetirizine',
    category: 'Antihistamine',
    quantity: 3,
    issueDate: '2024-11-12',
    price: 12.0,
    expiryDate: '2025-02-20',
  },
];

function Prescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const prescriptionsPerPage = 3;

  const filteredPrescriptions = prescriptionsData.filter((prescription) =>
    prescription.medicine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPrescription = currentPage * prescriptionsPerPage;
  const indexOfFirstPrescription = indexOfLastPrescription - prescriptionsPerPage;
  const currentPrescriptions = filteredPrescriptions.slice(
    indexOfFirstPrescription,
    indexOfLastPrescription
  );

  const totalPages = Math.ceil(filteredPrescriptions.length / prescriptionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Prescriptions</h2>

      {/* Search and Add Prescription */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center border border-blue-300 rounded-lg shadow-sm overflow-hidden w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search medicine..."
            className="p-3 w-full outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link
          className="flex items-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300"
          to="/doctor-dashboard/prescriptions-fill-out-form"
        >
          <FaPlus />
          <span>Add Prescription</span>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-4 text-left">Patient</th>
              <th className="p-4 text-left">Medicine</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Issue Date</th>
              <th className="p-4 text-left">Expiry Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPrescriptions.length > 0 ? (
              currentPrescriptions.map((prescription, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition duration-150 text-gray-700"
                >
                  <td className="p-4">{prescription.patientName}</td>
                  <td className="p-4">{prescription.medicine}</td>
                  <td className="p-4">{prescription.category}</td>
                  <td className="p-4">{prescription.quantity}</td>
                  <td className="p-4">${prescription.price.toFixed(2)}</td>
                  <td className="p-4">{prescription.issueDate}</td>
                  <td className="p-4">{prescription.expiryDate}</td>
                  <td className="p-4">
                    <button className="p-2 text-blue-600 hover:text-blue-800 transition duration-200">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`p-2 px-4 rounded-lg ${
            currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 px-4 rounded-lg ${
            currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Prescriptions;
