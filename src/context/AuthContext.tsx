
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { UserRole, getUserRole, signInWithOAuth, OAuthProvider, isUserProfileComplete } from '@/lib/supabase';
import { toast } from 'sonner';

interface UserMetadata {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
  register: (email: string, password: string, metadata?: UserMetadata) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Initialize authentication state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          setIsAuthenticated(true);
          const userId = data.session.user.id;
          const role = await getUserRole(userId);
          setUserRole(role);
          
          // Check if profile is complete for OAuth users
          if (window.location.pathname !== '/auth/complete-profile' && 
              window.location.pathname !== '/auth/callback') {
            const isComplete = await isUserProfileComplete(userId);
            if (!isComplete) {
              navigate('/auth/complete-profile');
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        const role = await getUserRole(session.user.id);
        setUserRole(role);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      if (data.user) {
        const role = await getUserRole(data.user.id);
        setUserRole(role);
        setIsAuthenticated(true);
        
        // Redirect based on role
        if (role === 'ADMIN') {
          navigate('/admin');
        } else if (role === 'STAFF') {
          navigate('/staff');
        } else if (role === 'CLIENT') {
          navigate('/client');
        } else {
          navigate('/observer');
        }
        
        toast.success('Logged in successfully');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to log in');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithOAuth = async (provider: OAuthProvider) => {
    try {
      setLoading(true);
      const { error } = await signInWithOAuth(provider);
      
      if (error) {
        throw error;
      }
      
      // The redirect will happen automatically, no need to navigate here
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
      console.error('OAuth error:', error);
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, metadata?: UserMetadata) => {
    try {
      setLoading(true);
      console.log('Registering with metadata:', metadata);
      
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: metadata,
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (error) {
        throw error;
      }

      console.log('Registration response:', data);
      
      if (data.user) {
        console.log('User created with ID:', data.user.id);
        toast.success('Registration successful! Please check your email to confirm your account.');
        navigate('/login');
      } else {
        console.error('User was not created in the response');
        toast.error('Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw error;
      }

      toast.success('Password reset email sent. Please check your inbox.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setIsAuthenticated(false);
      setUserRole(null);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to log out');
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    userRole,
    loading,
    login,
    loginWithOAuth,
    register,
    forgotPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
