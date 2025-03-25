
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { updateUserMetadata, isUserProfileComplete } from '@/lib/supabase';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageTransition from '@/components/ui/PageTransition';

const CompleteProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (!data.session) {
          // Not logged in, redirect to login
          navigate('/login');
          return;
        }

        const userId = data.session.user.id;
        const isComplete = await isUserProfileComplete(userId);
        
        if (isComplete) {
          // Profile already complete, redirect to dashboard
          navigate('/observer');
          return;
        }

        // Pre-fill form with any existing data
        const user = data.session.user;
        if (user.user_metadata) {
          setFirstName(user.user_metadata.firstName || '');
          setLastName(user.user_metadata.lastName || '');
          setPhoneNumber(user.user_metadata.phoneNumber || '');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Authentication error');
        navigate('/login');
      } finally {
        setInitialLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber) {
      toast.error('Phone number is required');
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await updateUserMetadata({
        firstName,
        lastName,
        phoneNumber
      });
      
      if (error) {
        throw error;
      }
      
      toast.success('Profile completed successfully');
      navigate('/observer');
    } catch (error: any) {
      console.error('Profile completion error:', error);
      toast.error(error.message || 'Failed to complete profile');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="auth-container">
        <div className="auth-card animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold mb-2">Complete Your Profile</h1>
            <p className="text-gray-500">We need a few more details to complete your registration</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="phoneNumber" className="text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="(123) 456-7890"
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Required for account security and communication
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? 'Saving...' : 'Complete Registration'}
            </Button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
};

export default CompleteProfile;
