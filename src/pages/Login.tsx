
import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import PageTransition from '@/components/ui/PageTransition';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
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
            <h1 className="text-3xl font-semibold mb-2">Welcome back</h1>
            <p className="text-gray-500">Sign in to your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </PageTransition>
  );
};

export default Login;
