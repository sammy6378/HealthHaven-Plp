import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const MedicineInventory: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Telemedicine - Medicine Page</title>
      </Helmet>

      <div className="p-8 flex flex-col">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Medicine Inventory</h2>

        <div className="flex justify-between items-center mb-6 flex-wrap">
          <div className="flex items-center border border-blue-300 rounded-lg shadow-sm overflow-hidden w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search medicine..."
              className="p-3 w-full sm:w-72 outline-none text-gray-700"
            />
          </div>
          <Link
            className="flex items-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-300 mt-4 sm:mt-0"
            to={"/pharmacy-dashboard/medicine-fill-out-form"}
          >
            <FaPlus />
            <span>Add Medicine</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto mb-8">
          {/* Table Section */}
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white table-auto">
              <thead>
                <tr className="bg-blue-100 text-gray-700">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50 transition duration-150">
                  <td className="p-4">001</td>
                  <td className="p-4">Paracetamol</td>
                  <td className="p-4">Pain Relief</td>
                  <td className="p-4">200</td>
                  <td className="p-4">$5.00</td>
                  <td className="p-4 flex space-x-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800 transition duration-200">
                      <FaEdit />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-800 transition duration-200">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-blue-50 transition duration-150">
                  <td className="p-4">002</td>
                  <td className="p-4">Ibuprofen</td>
                  <td className="p-4">Pain Relief</td>
                  <td className="p-4">150</td>
                  <td className="p-4">$8.00</td>
                  <td className="p-4 flex space-x-2">
                    <button className="p-2 text-blue-600 hover:text-blue-800 transition duration-200">
                      <FaEdit />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-800 transition duration-200">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineInventory;
