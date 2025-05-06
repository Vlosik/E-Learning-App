import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const role = sessionStorage.getItem('role');

    if (allowedRoles.includes(role)) {
        return element;
    } else {
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;