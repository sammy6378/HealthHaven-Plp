import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Appointments from '../Components/Appointments';
import BasicDateCalendar from '../Components/Calendar';

const DashboardUi = () => {
  return (
    <div className="p-6 min-h-screen flex flex-col gap-y-8">

      <div className="grid grid-cols-2 gap-6 w-full">
        <Header />

        {/* Upcoming Appointments */}
        <Appointments />
        </div>

        <div className="grid grid-cols-2 gap-6 w-full">
          {/* Active Doctor */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-orange-500">Active Doctor</h2>
              <Link to="/user-dashboard/find-doctor" className="text-blue-500">View all</Link>
            </div>
            <ul className="space-y-3">
              {['Subash Chandra Das', 'MD. Saifur Rahman Rana', 'Roknuzzaman Ruku', 'MD. Fahim Reza'].map((doctor, index) => (
                <li key={index}>
                  <Link to={`/user-dashboard/doctor/${doctor}`} className="text-gray-700 hover:text-blue-500">
                    {doctor}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-orange-500">Notifications</h2>
              <Link to="/dashboard/notifications" className="text-blue-500">View all</Link>
            </div>
            <ul className="space-y-3">
              {[
                'Making this the first true generator Internet...',
                'The standard chunk of Lorem Ipsum used...',
                'Model sentence structures form generator...',
                'Finibus Bonorum et Malorum the extremes...',
              ].map((notification, index) => (
                <li key={index}>
                  <Link to={`/dashboard/notification/${index}`} className="text-gray-700 text-sm hover:text-blue-500">
                    {notification}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
      </div>
      
      <div className='flex justify-between bg-white p-6 rounded-lg shadow-md'>
      <BasicDateCalendar onDateClick={() => { /* handle date click */ }} />
      <h2 className='text-xl font-semibold text-orange-500'>Events Update</h2>
      </div>
    </div>
  );
};

export default DashboardUi;
