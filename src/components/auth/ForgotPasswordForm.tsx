
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const { forgotPassword, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <p className="text-xs text-gray-500 mt-1">
          We'll send you a link to reset your password
        </p>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? 'Sending...' : 'Send reset link'}
      </Button>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
            Back to sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
