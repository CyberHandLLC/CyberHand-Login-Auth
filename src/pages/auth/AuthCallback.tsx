
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { isUserProfileComplete } from '@/lib/supabase';
import { toast } from 'sonner';
import PageTransition from '@/components/ui/PageTransition';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (data.session) {
          const userId = data.session.user.id;
          const isComplete = await isUserProfileComplete(userId);
          
          if (!isComplete) {
            // Redirect to profile completion if phone number is missing
            navigate('/auth/complete-profile');
          } else {
            // Profile is complete, redirect to dashboard
            toast.success('Successfully signed in');
            navigate('/observer');
          }
        } else {
          // No session, redirect to login
          toast.error('Authentication failed');
          navigate('/login');
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        toast.error(error.message || 'Authentication failed');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <PageTransition>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Processing your sign in</h2>
          <p className="text-muted-foreground">Just a moment while we complete your authentication...</p>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthCallback;
