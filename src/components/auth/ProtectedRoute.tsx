
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/supabase';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, userRole, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have the required role, redirect to their dashboard
  if (userRole && !allowedRoles.includes(userRole)) {
    const dashboardRoutes = {
      ADMIN: '/admin',
      STAFF: '/staff',
      CLIENT: '/client',
      OBSERVER: '/observer',
    };

    return <Navigate to={dashboardRoutes[userRole]} replace />;
  }

  // If user is authenticated and has the required role, render the children
  return <Outlet />;
};

export default ProtectedRoute;
