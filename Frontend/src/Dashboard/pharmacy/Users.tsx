import React, { useState } from 'react';
import { FaUser, FaClipboardCheck, FaCheckCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [usersData, setUsersData] = useState([
    {
      id: 1,
      name: 'John Doe',
      diagnosis: 'Hypertension',
      prescribedMedicine: 'Lisinopril 10mg',
      dosage: 'Once daily',
    },
    {
      id: 2,
      name: 'Jane Smith',
      diagnosis: 'Type 2 Diabetes',
      prescribedMedicine: 'Metformin 500mg',
      dosage: 'Twice daily',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      diagnosis: 'Asthma',
      prescribedMedicine: 'Albuterol 100mg',
      dosage: 'As needed',
    },
    {
      id: 4,
      name: 'Bob Brown',
      diagnosis: 'Hypercholesterolemia',
      prescribedMedicine: 'Atorvastatin 20mg',
      dosage: 'Once daily',
    },
    {
      id: 5,
      name: 'Eve Wilson',
      diagnosis: 'Depression',
      prescribedMedicine: 'Sertraline 50mg',
      dosage: 'Once daily',
    },
    {
      id: 6,
      name: 'Michael Lee',
      diagnosis: 'Acid Reflux',
      prescribedMedicine: 'Omeprazole 20mg',
      dosage: 'Once daily',
    },
  ]);

  // remove a user from the list and show a toast notification
  const clearPatient = (id: number) => {
    setUsersData(usersData.filter((user) => user.id !== id));
    toast.success('Patient cleared successfully', {
      position: 'top-right',
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="p-2">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Patients List</h1>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full bg-white min-w-max">
              <thead>
                <tr className="bg-blue-100 text-gray-700">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Diagnosis</th>
                  <th className="p-4 text-left">Prescribed Medicine</th>
                  <th className="p-4 text-left">Dosage</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50 transition duration-150 whitespace-nowrap">
                    <td className="p-4">{user.id}</td>
                    <td className="p-4 flex items-center space-x-2">
                      <FaUser className="h-5 w-5 text-blue-500" />
                      <span>{user.name}</span>
                    </td>
                    <td className="p-4 overflow-hidden text-ellipsis">{user.diagnosis}</td>
                    <td className="p-4 flex items-center space-x-2">
                      <FaClipboardCheck className="h-5 w-5 text-green-500" />
                      <span>{user.prescribedMedicine}</span>
                    </td>
                    <td className="p-4">{user.dosage}</td>
                    <td className="p-4">
                      <button
                        onClick={() => clearPatient(user.id)}
                        className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                      >
                        <FaCheckCircle className="h-5 w-5" />
                        <span>Clear</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
