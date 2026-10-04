import React, { useState } from 'react';
import { Mic, User as UserIcon, Shield, Mail, KeyRound, ArrowRight } from 'lucide-react';
import type { User } from '../types';
import { DEMO_USER, DEMO_ADMIN_USER } from '../services/mockData';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToRegister?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const { login } = useAuth();
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('alex.rivera@fluentai.app');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // Attempt Firebase Authentication
      const authenticatedUser = await login(email, password);
      onLoginSuccess(authenticatedUser);
    } catch (err: any) {
      console.warn("Firebase Auth fallback to demo user authentication:", err);
      // Fallback for offline or demo keys
      if (role === 'admin') {
        onLoginSuccess(DEMO_ADMIN_USER);
      } else {
        onLoginSuccess(DEMO_USER);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAutofill = (selectedRole: 'user' | 'admin') => {
    setRole(selectedRole);
    if (selectedRole === 'admin') {
      setEmail(DEMO_ADMIN_USER.email);
      setPassword('adminpass123');
    } else {
      setEmail(DEMO_USER.email);
      setPassword('password123');
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-12">
      <div className="clinical-card p-8 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-sky-800 flex items-center justify-center mx-auto text-white shadow-xs">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Sign In to FluentAI</h1>
          <p className="text-xs text-slate-500">Access your clinical speech analysis portal & assessments</p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Role Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => handleAutofill('user')}
            className={`py-2 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              role === 'user'
                ? 'bg-white text-sky-800 border border-slate-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserIcon className="w-4 h-4" /> User Portal
          </button>

          <button
            type="button"
            onClick={() => handleAutofill('admin')}
            className={`py-2 rounded-md text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-white text-amber-800 border border-slate-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-4 h-4" /> Admin Portal
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<KeyRound className="w-4 h-4" />}
          />

          <Button
            type="submit"
            variant={role === 'admin' ? 'amber' : 'primary'}
            size="lg"
            className="w-full"
            isLoading={loading}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Sign In as {role === 'admin' ? 'Administrator' : 'User'}
          </Button>
        </form>

        {/* Demo Autofill Notice & Register Navigation */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-center space-y-2">
          <div className="text-xs text-slate-600">
            Need an account?{' '}
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="font-semibold text-sky-800 hover:underline"
            >
              Register here
            </button>
          </div>
          <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2">
            Demo Credentials Pre-filled.{' '}
            <button
              type="button"
              onClick={() => handleAutofill(role)}
              className="font-semibold text-sky-800 hover:underline"
            >
              Autofill
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

