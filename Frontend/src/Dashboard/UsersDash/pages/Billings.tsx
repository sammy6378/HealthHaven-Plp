import React, { useState } from 'react';

const BillingPage = () => {
  // Dummy data for billings
  const dummyBillings = [
    {
      booking_id: 1,
      user_name: 'John Doe',
      total_amount: 150,
      booking_date: '2024-10-10',
      booking_status: 'pending',
    },
    {
      booking_id: 2,
      user_name: 'Jane Smith',
      total_amount: 200,
      booking_date: '2024-10-12',
      booking_status: 'paid',
    },
    {
      booking_id: 3,
      user_name: 'Mark Johnson',
      total_amount: 300,
      booking_date: '2024-10-14',
      booking_status: 'pending',
    },
  ];

  // Initialize billings state with dummy data
  const [billings, setBillings] = useState(dummyBillings);

  // Function to review a booking (for now, it does nothing)
  const reviewBooking = (id) => {
    console.log(`Reviewing booking with ID: ${id}`);
  };

  return (
    <div className="min-h-screen pt-5 flex items-start justify-center">
      <div className="max-w-4xl w-full p-4">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">My Billings</h2>
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="p-4 text-left">Transaction ID</th>
                <th className="p-4 text-left">Patient</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {billings.map(billing => (
                <tr key={billing.booking_id} className="hover:bg-blue-50 transition duration-150 cursor-pointer">
                  <td className="whitespace-no-wrap p-4">{billing.booking_id}</td>
                  <td className="whitespace-no-wrap p-4">{billing.user_name}</td>
                  <td className="whitespace-no-wrap p-4">{billing.total_amount}</td>
                  <td className="whitespace-no-wrap p-4">{billing.booking_date}</td>
                  <td className="whitespace-no-wrap p-4">{billing.booking_status}</td>
                  <td className="whitespace-no-wrap p-4">
                    {billing.booking_status === 'pending' && (
                      <button
                        onClick={() => reviewBooking(billing.booking_id)}
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                      >
                        Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
