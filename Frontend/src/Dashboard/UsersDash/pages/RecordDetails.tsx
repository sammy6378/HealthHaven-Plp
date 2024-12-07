import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const MedicalRecordDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the record data passed via navigate
  const { record } = location.state || {};

  if (!record) {
    return <p>No record details available.</p>;
  }

  return (
    <div className="min-h-screen pt-5 flex items-start justify-center">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Medical Record Details</h2>

        {/* Display the full details of the medical record */}
        <div className="space-y-4">
          <p><strong>Record ID:</strong> {record.record_id}</p>
          <p><strong>Patient Name:</strong> {record.patient_name}</p>
          <p><strong>Condition:</strong> {record.condition}</p>
          <p><strong>Date of Visit:</strong> {record.date_of_visit}</p>
          <p><strong>Doctor:</strong> {record.doctor}</p>
          <p><strong>Treatment:</strong> {record.treatment}</p>
          <p><strong>Notes:</strong> {record.notes}</p>
        </div>

        <button
          onClick={() => navigate(-1)} // Go back to previous page
          className="mt-6 bg-blue-500 text-white px-3 py-2 rounded-lg"
        >
          Back to Records
        </button>
      </div>
    </div>
  );
};

export default MedicalRecordDetails;
