import React from 'react';
import Header from '../Components/Header';
import Appointments from '../Components/Appointments';
import Calendar_comp from '../Components/calendar_comp';
import DashboardBarChart from '../Components/Chart';

const DashboardUi = () => {
  return (
    <div className="p-4 min-h-screen flex flex-col gap-y-8  lg:p-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Header />
        <Appointments />
      </div>

      {/* Calendar and Bar Chart Section */}
      <div className="mt-6">
        <Calendar_comp appointments={[]} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold text-orange-500 mb-4">
          Dashboard Insights
        </h2>
        <DashboardBarChart /> {/* Embed the new bar chart */}
      </div>
    </div>
  );
};

export default DashboardUi;
