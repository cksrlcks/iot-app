import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin }) {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (requireAdmin && !user?.admin) {
        alert('권한이 없습니다.');
        return <Navigate to="/home" replace />;
    }
    return children;
}
