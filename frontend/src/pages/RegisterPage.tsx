import React, { useState } from 'react';
import { Mic, User as UserIcon, Mail, KeyRound, ArrowRight } from 'lucide-react';
import type { User } from '../types';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useAuth } from '../hooks/useAuth';

interface RegisterPageProps {
  onRegisterSuccess: (user: User) => void;
  onNavigateToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const newUser = await register(email, password, name || 'FluentAI User');
      onRegisterSuccess(newUser);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to create account. Please check your credentials.');
    } finally {
      setLoading(false);
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
          <h1 className="text-2xl font-bold text-slate-900">Create FluentAI Account</h1>
          <p className="text-xs text-slate-500">Join the clinical speech pathology & communication platform</p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Alex Rivera"
            icon={<UserIcon className="w-4 h-4" />}
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="alex.rivera@fluentai.app"
            icon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            hint="Minimum 6 characters"
            icon={<KeyRound className="w-4 h-4" />}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Create Account & Get Started
          </Button>
        </form>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-center space-x-1">
          <span className="text-xs text-slate-600">Already have a FluentAI account?</span>
          <button
            type="button"
            onClick={onNavigateToLogin}
            className="text-xs font-semibold text-sky-800 hover:underline"
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

