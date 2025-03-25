
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { EyeIcon, EyeOffIcon, Github, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithOAuth, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    await loginWithOAuth(provider);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
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
        </div>

        <div className="form-group">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
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
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => handleOAuthLogin('google')}
          className="w-full"
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => handleOAuthLogin('github')}
          className="w-full"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
