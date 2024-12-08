

import React from 'react';
import { FaPills, FaUsers, FaShoppingCart, FaDollarSign, FaFileAlt, FaChartBar } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const PDashboard: React.FC = () => {
 
  return (
    <>
      <Helmet>
        <title>Pharmacy Dashboard</title>
      </Helmet>
      <div className="flex flex-col md:flex-row h-screen">
      
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
            {[
              { icon: <FaPills />, value: "523", label: "Medicines Sold", bgColor: "bg-blue-500" },
              { icon: <FaDollarSign />, value: "$19,989.00", label: "Revenue", bgColor: "bg-green-500" },
              { icon: <FaChartBar />, value: "$5,999.00", label: "Profit", bgColor: "bg-yellow-500" },
              { icon: <FaPills />, value: "$96,000.00", label: "Stock Value", bgColor: "bg-orange-500" },
              { icon: <FaDollarSign />, value: "$3,449.00", label: "Outstanding Payments", bgColor: "bg-pink-500" },
              { icon: <FaUsers />, value: "156", label: "Total Patients", bgColor: "bg-purple-500" },
              { icon: <FaFileAlt />, value: "8", label: "Total Suppliers", bgColor: "bg-red-500" },
              { icon: <FaUsers />, value: "7", label: "Pharmacy Staff", bgColor: "bg-teal-500" },
            ].map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} text-white p-5 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{stat.icon}</div>
                  <div>
                    <p className="text-lg font-semibold">{stat.value}</p>
                    <p className="text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tables for Today's Sales, Expenses, and Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Today's Sale */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <FaShoppingCart className="mr-2 text-blue-500" /> Today's Medicines Sold
              </h2>
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr>
                    <th className="text-left py-2">Medicine</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Paracetamol</td>
                    <td className="py-1">40</td>
                    <td className="py-1">320.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">Ibuprofen</td>
                    <td className="py-1">25</td>
                    <td className="py-1">200.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Today's Expense */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <FaDollarSign className="mr-2 text-teal-500" /> Today's Expenses
              </h2>
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr>
                    <th className="text-left py-2">Description</th>
                    <th className="text-left py-2">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Stock Purchase</td>
                    <td className="py-1">500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Today's Report */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <FaFileAlt className="mr-2 text-pink-500" /> Today's Financial Summary
              </h2>
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr>
                    <th className="text-left py-2">Category</th>
                    <th className="text-left py-2">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">Total Sales</td>
                    <td className="py-1">720.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">Total Expenses</td>
                    <td className="py-1">500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PDashboard;

