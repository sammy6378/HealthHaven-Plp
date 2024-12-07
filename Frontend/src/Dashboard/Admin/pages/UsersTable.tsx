import React,{useState} from 'react';
import {  FaTrash, FaBan,FaCheckCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useGetUsersQuery,useDeleteUserMutation,useToggleStatusMutation } from '../../../services/service';
import { toast,ToastContainer } from 'react-toastify';

const UsersManagement: React.FC = () => {
  const { data: users, isLoading,refetch } = useGetUsersQuery();
  const [deletPatient] = useDeleteUserMutation();
  const [togglePatientStatus] = useToggleStatusMutation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users?.filter((user) =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = async (userId: number) => {
    try {

      await togglePatientStatus(userId).unwrap();
  
      // Refetch users after successful toggle
      refetch();
      toast.success("User status updated successfully!");
    } catch {
      toast.error("Failed to update user status.");
    }
  };
  
  

  const deleteUser = async (userId: number) => {
    try {
      await deletPatient(userId).unwrap();
  
      // Refetch users after successful delete
      refetch();
      toast.success("User deleted successfully!");
    } catch {
      toast.error("Failed to delete user.");
    }
  };
  
  
  return (
    <>
      <Helmet>
        <title>Telemedicine - Users Management</title>
      </Helmet>
      <ToastContainer />
      <div className="p-8 flex flex-col">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">User Management</h2>
        <div className="flex justify-between items-center mb-6 flex-wrap">
          <div className="flex items-center border border-blue-300 rounded-lg shadow-sm overflow-hidden w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Phone</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="text-center">Loading...</td>
                  </tr>
                ) : filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.patient_id} className="hover:bg-blue-50 transition duration-150">
                      <td className="p-4">{user.patient_id}</td>
                      <td className="p-4">{user.first_name}</td>
                      <td className="p-4">{user.last_name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">{user.phone}</td>
                      <td className="p-4">{user.role}</td>
                      <td className="p-4">
                        <span className={user.status ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                          {user.status ? "Active" : "Disabled"}
                        </span>
                      </td>
                      <td className="p-4 flex space-x-2">
                        <button
                          className={`p-2 ${
                            user.status ? "text-yellow-600 hover:text-yellow-800" : "text-green-600 hover:text-green-800"
                          } transition duration-200`}
                          onClick={() => toggleStatus(user.patient_id)}
                        >
                          {user.status ? <FaCheckCircle title="Disable Account" /> : <FaBan title="Activate Account" />}
                        </button>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 transition duration-200"
                          onClick={() => deleteUser(user.patient_id)}
                        >
                          <FaTrash title="Delete Account" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersManagement;
