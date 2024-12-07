import React, { useState } from "react";
import DoctorTable from "./DoctorsTable";


const ManageDoctors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Doctors</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Add Doctor
        </button>
      </div>
      <DoctorTable />
    </div>
  );
};

export default ManageDoctors;