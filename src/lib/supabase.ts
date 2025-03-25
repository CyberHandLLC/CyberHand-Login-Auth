
import { supabase } from '@/integrations/supabase/client';

// Type definitions for our user data
export type UserRole = 'ADMIN' | 'STAFF' | 'CLIENT' | 'OBSERVER';
export type OAuthProvider = 'google' | 'github' | 'facebook' | 'twitter';

export interface UserData {
  id: string;
  role: UserRole;
  email: string;
  created_at: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  // Add other fields as needed
}

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signInWithOAuth = async (provider: OAuthProvider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  return { data, error };
};

export const signUp = async (email: string, password: string, metadata?: { firstName?: string; lastName?: string; phoneNumber?: string }) => {
  console.log('Signing up with metadata:', metadata);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata
    }
  });
  
  console.log('Sign up response:', data, error);
  return { data, error };
};

export const updateUserMetadata = async (metadata: { firstName?: string; lastName?: string; phoneNumber?: string }) => {
  const { data, error } = await supabase.auth.updateUser({
    data: metadata
  });
  
  return { data, error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getUserRole = async (userId: string): Promise<UserRole | null> => {
  console.log('Getting user role for ID:', userId);
  const { data, error } = await supabase
    .from('User')
    .select('role')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
  
  console.log('User role data:', data);
  return data?.role as UserRole;
};

export const getUserProfile = async (userId: string): Promise<UserData | null> => {
  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data as UserData;
};

export const isUserProfileComplete = async (userId: string): Promise<boolean> => {
  const profile = await getUserProfile(userId);
  return profile !== null && !!profile.phoneNumber;
};
