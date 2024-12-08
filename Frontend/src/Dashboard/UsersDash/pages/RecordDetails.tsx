import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MedicalRecordDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the record data passed via navigate
  const { record } = location.state || {};

  if (!record) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-600">
          No record details available.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Records
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center py-10 px-4">
      <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3">
          Medical Record Details
        </h2>

        {/* Display the full details of the medical record */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center">
            <p className="w-full sm:w-1/2 mb-2">
              <span className="font-semibold">Record ID:</span> {record.record_id}
            </p>
            <p className="w-full sm:w-1/2 mb-2">
              <span className="font-semibold">Date of Visit:</span> {record.date_of_visit}
            </p>
          </div>

          <div className="flex flex-wrap items-center">
            <p className="w-full sm:w-1/2 mb-2">
              <span className="font-semibold">Patient Name:</span> {record.patient_name}
            </p>
            <p className="w-full sm:w-1/2 mb-2">
              <span className="font-semibold">Doctor:</span> {record.doctor}
            </p>
          </div>

          <div>
            <p className="font-semibold mb-1">Condition:</p>
            <p className="text-gray-700">{record.condition}</p>
          </div>

          <div>
            <p className="font-semibold mb-1">Treatment:</p>
            <p className="text-gray-700">{record.treatment}</p>
          </div>

          <div>
            <p className="font-semibold mb-1">Notes:</p>
            <p className="text-gray-700 whitespace-pre-line">{record.notes}</p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Back to Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordDetails;
