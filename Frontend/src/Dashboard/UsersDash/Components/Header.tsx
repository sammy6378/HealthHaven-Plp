import React from 'react';
import { useSelector } from 'react-redux';
import HealthStats from './HealthStats';
import { RootState } from '../../../store/Store';
import { TAuthResponse } from '../../../services/service';

const Header = () => {

  const authState = useSelector((state: RootState) => state.auth);
  const user = authState.patient as TAuthResponse | null;

  const first_name = user ? user.first_name : '';


  // Determine greeting based on the current time
  const hours = new Date().getHours();
  let greeting = '';

  if (hours < 12) {
    greeting = 'Good Morning';
  } else if (hours < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <div className="flex flex-col p-5">
      <div className="mb-4">
        <h1 className="text-xl font-mono">{greeting},</h1>
        <p className="text-3xl font-semibold">{first_name}</p>
      </div>
      <HealthStats />
    </div>
  );
};

export default Header;
