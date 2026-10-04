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
      <div className="glass-panel p-6 border-sky-500/20 space-y-1">
        <Badge variant="sky" icon={<UserIcon className="w-3.5 h-3.5" />}>
          PROFILE & PREFERENCES
        </Badge>
        <h1 className="text-2xl font-bold text-white">Profile Preferences</h1>
        <p className="text-xs text-slate-400">Manage your subscription, target speech goals, and profile information</p>
      </div>

      {/* Form Container */}
      <div className="glass-panel p-8 space-y-6 border-slate-800">
        {savedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Profile preferences updated successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full bg-slate-900/40 border border-slate-800/60 rounded-xl px-4 py-3 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Target Speech Goals
            </label>
            <textarea
              value={targetGoal}
              onChange={(e) => setTargetGoal(e.target.value)}
              rows={3}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors placeholder-slate-500"
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
