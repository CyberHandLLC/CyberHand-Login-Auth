
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { register, loading } = useAuth();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    await register(email, password, { firstName, lastName, phoneNumber });
  };

  return (
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
              required
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
              required
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
          </div>
        </div>

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
            autoComplete="email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <Label htmlFor="phoneNumber" className="text-sm font-medium">
            Phone Number
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
        </div>

        <div className="form-group">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              autoComplete="new-password"
              disabled={loading}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 8 characters long
          </p>
        </div>

        <div className="form-group">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError('');
            }}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoComplete="new-password"
            disabled={loading}
          />
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </Button>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
