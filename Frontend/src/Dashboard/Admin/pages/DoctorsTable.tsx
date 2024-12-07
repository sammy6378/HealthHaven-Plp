import React from 'react';
import {  FaTrash, FaBan,FaCheckCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useGetDoctorsQuery,useToggleDoctorMutation,useDeleteDoctorMutation } from '../../../services/service';
import { toast, ToastContainer  } from 'react-toastify'
const DoctorsManagement: React.FC = () => {

  const { data:getdoctors,isLoading,refetch } = useGetDoctorsQuery();
  const [deleteDoctor] = useDeleteDoctorMutation();
  const [toggleDoctorStatus] = useToggleDoctorMutation();

  const toggleStatus = async (userId: number) => {
    try {

      await toggleDoctorStatus(userId).unwrap();
  
      // Refetch doctors after successful toggle
      refetch();
      toast.success("Doctor status updated successfully!");
    } catch {
      toast.error("Failed to update Doctor status.");
    }
  };
  
  

  const deleteUser = async (userId: number) => {
    try {
      await deleteDoctor(userId).unwrap();
  
      // Refetch doctors after successful delete
      refetch();
      toast.success("Doctor deleted successfully!");
    } catch {
      toast.error("Failed to delete Doctor.");
    }
  };
  


  return (
    <>
      <Helmet>
        <title>Telemedicine - Doctors Management</title>
      </Helmet>
    <ToastContainer />
      <div className="p-8 flex flex-col">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Doctors Management</h2>

        <div className="flex justify-between items-center mb-6 flex-wrap">
          <div className="flex items-center border border-blue-300 rounded-lg shadow-sm overflow-hidden w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search doctors..."
              className="p-3 w-full sm:w-72 outline-none text-gray-700"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-8">
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr className="bg-blue-100 text-gray-700">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">First Name</th>
                  <th className="p-4 text-left">Last Name</th>
                  <th className="p-4 text-left">Specialization</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                { 
                  isLoading? (
                    <tr>
                      <td colSpan={9} className="py-4 text-center">Loading...</td>
                    </tr>
                  ) : (
                    getdoctors?.map((doctor) => (
                      <tr key={doctor.doctor_id} className="hover:bg-blue-50 transition duration-150">
                        <td className="p-4">{doctor.doctor_id}</td>
                        <td className="p-4">{doctor.first_name}</td>
                        <td className="p-4">{doctor.last_name}</td>
                        <td className="p-4">{doctor.specialization}</td>
                        <td className="p-4">{doctor.email}</td>
                        <td className="p-4">{doctor.phone}</td>
                        <td className="p-4">{doctor.role}</td>
                        <td className="p-4">
                        <span className={doctor.status ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                          {doctor.status ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="p-4 flex space-x-2">
                        <button
                          className={`p-2 ${
                            doctor.status ? "text-yellow-600 hover:text-yellow-800" : "text-green-600 hover:text-green-800"
                          } transition duration-200`}
                          onClick={() => toggleStatus(doctor.doctor_id)}
                        >
                          {doctor.status ? <FaCheckCircle title="Disable Account" /> : <FaBan title="Activate Account" />}
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 transition duration-200"
                          onClick={() => deleteUser(doctor.doctor_id)}
                        >
                          <FaTrash title="Delete Account" />
                        </button>
                      </td>
                      </tr>
                  )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsManagement;
