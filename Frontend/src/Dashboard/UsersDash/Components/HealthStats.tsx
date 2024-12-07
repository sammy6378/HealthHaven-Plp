import React from 'react';
import { RootState } from '../../../store/Store';
import { TAuthResponse } from '../../../services/service';
import { useSelector } from 'react-redux';


const HealthStats = () => {
  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.patient as TAuthResponse | null;

  const first_name = user ? user.first_name : '';

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <div className="flex flex-col items-center space-y-4">
        {/* Patient Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold">{first_name}</h3>
          <p className="text-gray-500">Age: 23 | Blood Group: O+</p>
        </div>
        
        {/* Health Stats */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-pink-500">75%</h4>
            <p className="text-gray-500">General Health</p>
          </div>
          <div className="text-center">
            <h4 className="text-2xl font-bold text-blue-500">83%</h4>
            <p className="text-gray-500">Water Balance</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full pt-4">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-green-500">6</h4>
            <p className="text-gray-500">Appointments</p>
          </div>
          
          <div className="text-center">
            <h4 className="text-2xl font-bold text-violet-600">10</h4>
            <p className="text-gray-500">Current Prescription</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HealthStats;