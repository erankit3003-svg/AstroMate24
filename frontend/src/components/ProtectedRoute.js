import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUser } from '../utils/auth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly) {
    const user = getUser();
    if (!user?.is_admin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
