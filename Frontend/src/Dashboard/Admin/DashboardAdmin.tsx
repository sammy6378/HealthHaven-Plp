// import React, { useState, useEffect } from 'react';

// // Dummy data for example
// const dummyStats = {
//   totalUsers: 150,
//   totalDoctors: 45,
//   totalAppointments: 230,
//   totalPrescriptions: 180,
// };

// function DashboardAdmin() {
//   const [stats, setStats] = useState(dummyStats);

//   // You can replace this with an API call to fetch live data
//   useEffect(() => {
//     // Example of fetching stats from an API (you would replace this with actual API calls)
//     setTimeout(() => {
//       setStats({
//         totalUsers: 160, // update with live data
//         totalDoctors: 50,
//         totalAppointments: 250,
//         totalPrescriptions: 200,
//       });
//     }, 1000); // Simulate API delay
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-blue-500 text-white p-4 rounded-lg">
//           <h3 className="font-medium">Total Users</h3>
//           <p className="text-2xl">{stats.totalUsers}</p>
//         </div>
        
//         <div className="bg-green-500 text-white p-4 rounded-lg">
//           <h3 className="font-medium">Total Doctors</h3>
//           <p className="text-2xl">{stats.totalDoctors}</p>
//         </div>

//         <div className="bg-yellow-500 text-white p-4 rounded-lg">
//           <h3 className="font-medium">Total Appointments</h3>
//           <p className="text-2xl">{stats.totalAppointments}</p>
//         </div>

//         <div className="bg-purple-500 text-white p-4 rounded-lg">
//           <h3 className="font-medium">Total Prescriptions</h3>
//           <p className="text-2xl">{stats.totalPrescriptions}</p>
//         </div>
//       </div>

//       {/* Additional section for Reports */}
//       <div className="mt-6">
//         <h2 className="text-xl font-semibold">Reports</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
//           <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="font-medium text-lg">User Growth Report</h3>
//             <p className="text-sm text-gray-700">Shows the growth of users over time.</p>
//           </div>

//           <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="font-medium text-lg">Appointment Trends</h3>
//             <p className="text-sm text-gray-700">Shows trends in appointment bookings.</p>
//           </div>

//           <div className="bg-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="font-medium text-lg">Doctor Performance</h3>
//             <p className="text-sm text-gray-700">Shows performance metrics for doctors.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardAdmin;

import React from 'react';
import { FaPills, FaUsers, FaShoppingCart, FaDollarSign, FaFileAlt, FaChartBar } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const DashboardAdmin: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="flex flex-col md:flex-row h-screen">
        <main className="flex-1 p-6">
          {/* Metrics and Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
            {[
              { icon: <FaUsers />, value: "1,532", label: "Total Users", bgColor: "bg-blue-500" },
              { icon: <FaShoppingCart />, value: "523", label: "Orders Processed", bgColor: "bg-green-500" },
              { icon: <FaDollarSign />, value: "$1,245,300", label: "Total Revenue", bgColor: "bg-yellow-500" },
              { icon: <FaPills />, value: "1,200", label: "Medicines Sold", bgColor: "bg-orange-500" },
              { icon: <FaChartBar />, value: "$120,000", label: "Profit", bgColor: "bg-purple-500" },
              { icon: <FaUsers />, value: "120", label: "Doctors Registered", bgColor: "bg-pink-500" },
              { icon: <FaFileAlt />, value: "5", label: "Pending Reports", bgColor: "bg-teal-500" },
              { icon: <FaUsers />, value: "30", label: "Staff", bgColor: "bg-red-500" },
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
            {/* Today's Sales */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <FaShoppingCart className="mr-2 text-blue-500" /> Today's Sales
              </h2>
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr>
                    <th className="text-left py-2">Order ID</th>
                    <th className="text-left py-2">Quantity</th>
                    <th className="text-left py-2">Amount ($)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1">A10001</td>
                    <td className="py-1">5</td>
                    <td className="py-1">300.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">A10002</td>
                    <td className="py-1">3</td>
                    <td className="py-1">180.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Today's Expenses */}
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
                  <tr>
                    <td className="py-1">Salaries</td>
                    <td className="py-1">2,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Today's Report */}
            <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
                <FaFileAlt className="mr-2 text-pink-500" /> Today's Financial Report
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
                    <td className="py-1">1,500.00</td>
                  </tr>
                  <tr>
                    <td className="py-1">Total Expenses</td>
                    <td className="py-1">2,500.00</td>
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

export default DashboardAdmin;
