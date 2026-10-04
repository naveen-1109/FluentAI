import React, { useState } from 'react';
import { User as UserIcon, CheckCircle2, Save } from 'lucide-react';
import type { User } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (updated: User) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user.name);
  const [targetGoal, setTargetGoal] = useState(user.targetGoal || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      targetGoal
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="clinical-card p-6 space-y-1">
        <Badge variant="teal" icon={<UserIcon className="w-3.5 h-3.5" />}>
          PROFILE & PREFERENCES
        </Badge>
        <h1 className="text-2xl font-bold text-slate-900">Profile Preferences</h1>
        <p className="text-xs text-slate-500">Manage your subscription, target speech goals, and profile information</p>
      </div>

      {/* Form Container */}
      <div className="clinical-card p-8 space-y-6">
        {savedSuccess && (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Profile preferences updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Target Speech Goals
            </label>
            <textarea
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              rows={3}
              className="w-full bg-white border border-slate-300 rounded-lg p-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 transition-colors placeholder-slate-400"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Save className="w-4 h-4" />}
            >
              Save Profile Preferences
            </Button>
          </div>
        </form>
      </div>

    </div>
  );
};

