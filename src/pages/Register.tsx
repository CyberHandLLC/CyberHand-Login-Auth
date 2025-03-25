
import React from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from '@/components/auth/RegisterForm';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const { isAuthenticated, userRole } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated && userRole) {
    const dashboardRoutes = {
      ADMIN: '/admin',
      STAFF: '/staff',
      CLIENT: '/client',
      OBSERVER: '/observer',
    };
    return <Navigate to={dashboardRoutes[userRole]} replace />;
  }

  return (
    <PageTransition>
      <div className="auth-container">
        <div className="auth-card animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-2">Create an account</h1>
            <p className="text-gray-500">Sign up to get started</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
