import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/Store';
import React from 'react';
import { AuthState } from './UsersSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: 'user' | 'admin' | 'doctor';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const authState = useSelector((state: RootState) => state.auth) as AuthState;
    const { isAuthenticated, role } = authState;

    if (!isAuthenticated || role !== requiredRole) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
