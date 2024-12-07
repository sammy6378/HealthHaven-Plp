import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PatientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return <div>No patient selected</div>;
  }

  return (
    <div className="p-4">
      {/* Back button */}
      <button 
        className="mb-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" 
        onClick={() => navigate('/dashboard/patient-lists')}
      >
        Back to Patient List
      </button>
      
      <div className="flex flex-col md:flex-row p-6 gap-x-3">
        {/* Left side - Patient image and basic info */}
        <div className="w-full md:w-1/3 flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-2 mb-6 md:mb-0">
          <img 
            src={`https://via.placeholder.com/150`} 
            alt={`${patient.name}`} 
            className="rounded-full w-32 h-32 mb-4 border border-gray-300"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{patient.name}</h2>
          <p className="text-gray-600">{patient.gender}, {patient.age} years old</p>
          <p className="text-gray-600">Phone: {patient.phone}</p>
          <p className="text-gray-600">Address: {patient.address}</p>
          <p className="text-gray-600">Blood Type: <strong>{patient.blood}</strong></p>
        </div>

        {/* Right side - Patient details */}
        <div className="w-full md:w-2/3 md:pl-6 bg-white shadow-lg rounded-lg p-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient Details</h3>
          
          <p className="text-gray-700 mb-2"><strong>Diagnosis:</strong> {patient.diagnosis}</p>
          <p className="text-gray-700 mb-6"><strong>Triage Level:</strong> 
            <span className={`ml-2 px-2 py-1 rounded-full text-sm ${getTriageClass(patient.triage)}`}>
              {patient.triage}
            </span>
          </p>

          {/* Medications Section */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Medications</h3>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Medication 1</li>
            <li>Medication 2</li>
          </ul>

          {/* Prescription Section */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Prescription</h3>
          <p className="text-gray-700 mb-6">No recent prescriptions.</p>

          {/* About the patient */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About Patient</h3>
          <p className="text-gray-700">{/* Add details about patient history or treatments here */}</p>
        </div>
      </div>
    </div>
  );
};

// Function to handle triage level class
const getTriageClass = (triage) => {
  switch (triage) {
    case 'Non Urgent':
      return 'bg-green-100 text-green-800';
    case 'Emergency':
      return 'bg-red-100 text-red-800';
    case 'Urgent':
      return 'bg-yellow-100 text-yellow-800';
    case 'Pass Away':
      return 'bg-gray-100 text-gray-800';
    default:
      return '';
  }
};

export default PatientDetails;
