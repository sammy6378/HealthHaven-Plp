import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy data for medical records
const dummyRecords = [
  { record_id: 1, patient_name: 'Samuel Mwangi', condition: 'Hypertension', date_of_visit: '2024-09-15', doctor: 'Dr. Emily Smith', treatment: 'Blood pressure medication', notes: 'Monitor blood pressure regularly' },
  { record_id: 2, patient_name: 'Samuel Mwangi', condition: 'Diabetes', date_of_visit: '2024-08-20', doctor: 'Dr. Mark Johnson', treatment: 'Insulin therapy', notes: 'Monthly check-ups required' },
  { record_id: 3, patient_name: 'Samuel Mwangi', condition: 'Asthma', date_of_visit: '2024-10-05', doctor: 'Dr. Sarah Adams', treatment: 'Inhaler prescribed', notes: 'Avoid allergens and cold air exposure' },
  { record_id: 4, patient_name: 'Samuel Mwangi', condition: 'Allergy', date_of_visit: '2024-07-10', doctor: 'Dr. Mike Lee', treatment: 'Antihistamines', notes: 'Avoid dust and pollen' },
  { record_id: 5, patient_name: 'Samuel Mwangi', condition: 'Cold', date_of_visit: '2024-06-22', doctor: 'Dr. Kelly Brown', treatment: 'Rest and fluids', notes: 'Get plenty of rest' },
  { record_id: 6, patient_name: 'Samuel Mwangi', condition: 'Migraine', date_of_visit: '2024-05-15', doctor: 'Dr. Susan White', treatment: 'Pain relievers', notes: 'Reduce screen time' },
  // Add more records as needed
];

const MedicalRecordsPage = () => {
  const [records] = useState(dummyRecords);
  const [selectedRecord, setSelectedRecord] = useState<typeof dummyRecords[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const navigate = useNavigate();

  // Calculate the start and end index of records based on the current page
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = records.slice(startIndex, endIndex);

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const handleRowClick = (record) => {
    navigate('/dashboard/medical-records/more-details', { state: { record } });
  };

  const viewDetails = (record_id) => {
    const record = records.find(record => record.record_id === record_id);
    setSelectedRecord(record || null);
  };

  return (
    <div className="min-h-screen pt-5 flex items-start justify-center">
      <div className="max-w-4xl w-full p-4">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">My Medical Records</h2>

        <div className="flex-1 overflow-y-auto">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr  className="bg-blue-100 text-gray-700">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Condition</th>
                <th className="p-4 text-left">Date of Visit</th>
                <th className="p-4 text-left">Doctor</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map(record => (
                <tr key={record.record_id} onClick={() => handleRowClick(record)} className="hover:bg-blue-50 transition duration-150">
                  <td className="whitespace-nowrap  p-4">{record.record_id}</td>
                  <td className=" whitespace-nowrap p-4">{record.patient_name}</td>
                  <td className=" whitespace-nowrap p-4">{record.condition}</td>
                  <td className=" whitespace-nowrap p-4">{record.date_of_visit}</td>
                  <td className="whitespace-nowrap  p-4">{record.doctor}</td>
                  <td className="whitespace-nowrap  p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering row click
                        viewDetails(record.record_id);
                        handleRowClick(record)
                      }}
                      
                      className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
           className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        {/* Conditional rendering for the selected record's details */}
        {selectedRecord && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Record Details</h3>
            <p><strong>Patient:</strong> {selectedRecord.patient_name}</p>
            <p><strong>Condition:</strong> {selectedRecord.condition}</p>
            <p><strong>Date of Visit:</strong> {selectedRecord.date_of_visit}</p>
            <p><strong>Doctor:</strong> {selectedRecord.doctor}</p>
            <p><strong>Treatment:</strong> {selectedRecord.treatment}</p>
            <p><strong>Notes:</strong> {selectedRecord.notes}</p>
          </div>
        )}
      </div>
   
    </div>
  );
};

export default MedicalRecordsPage;
