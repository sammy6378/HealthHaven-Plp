import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../forms/Auth/UsersSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmLogout from './ConfirmLogout';
import { RootState } from '../../../store/Store';
import { useSelector } from 'react-redux';
import { TAuthResponse } from '../../../services/service';
import React from 'react';

export function useConfirmLogout() {
  const userAuthState = useSelector((state: RootState) => state.auth);
  

  const user = userAuthState.user as TAuthResponse | null;
  

  const role = user?.role ||  '';


  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirmLogout = () => {
    if(role === 'user'){
        dispatch(logout());
        closeModal();
        navigate('/login');
    }else if (role === 'doctor'){
      dispatch(logout());
      closeModal();
      navigate('/login');
    }else if (role === 'admin'){
      dispatch(logout());
      closeModal();
      navigate('/login');
    }else{
      console.error("Invalid role. Cannot log out.");
    }
    
  };

  const ConfirmLogoutModal = () => (
    isOpen ? <ConfirmLogout onClose={closeModal} onConfirm={handleConfirmLogout} /> : null
  );

  return { openModal, ConfirmLogoutModal };
}
