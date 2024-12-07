import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store/Store';
import React from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole: 'user' | 'admin';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const userAuthState = useSelector((state: RootState) => state.auth);
    const adminAuthState = useSelector((state: RootState) => state.adminAuth);

    let isAuthenticated = false;

    if (requiredRole === 'user' && userAuthState.isAuthenticated) {
        isAuthenticated = true;
    } else if (requiredRole === 'admin' && adminAuthState.isAuthenticated) {
        isAuthenticated = true;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
