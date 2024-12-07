import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../forms/Auth/UserSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmLogout from './ConfirmLogout';
import { RootState } from '../../../store/Store';
import { useSelector } from 'react-redux';
import { TAuthResponse } from '../../../services/service';
import { clearAdmin } from '../../../forms/Auth/AdminSlice';
import React from 'react';

export function useConfirmLogout() {
  const userAuthState = useSelector((state: RootState) => state.auth);
  const adminAuthState = useSelector((state: RootState) => state.adminAuth);

  const user = userAuthState.patient as TAuthResponse | null;
  const admin = adminAuthState.admin as TAuthResponse | null;

  const role = user?.role || admin?.role || '';


  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirmLogout = () => {
    if(role === 'admin') {
        dispatch(clearAdmin())
        closeModal();
        navigate('/login');
    }else if(role === 'user'){
        dispatch(logout());
        closeModal();
        navigate('/login');
    }
    
  };

  const ConfirmLogoutModal = () => (
    isOpen ? <ConfirmLogout onClose={closeModal} onConfirm={handleConfirmLogout} /> : null
  );

  return { openModal, ConfirmLogoutModal };
}
