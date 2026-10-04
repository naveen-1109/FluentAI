import React from 'react';
import { Mic, User as UserIcon, LogOut, Shield, Flame, Sparkles } from 'lucide-react';
import type { User } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface NavbarProps {
  currentUser: User | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser, onNavigate, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#070B14]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate(currentUser ? (currentUser.role === 'admin' ? 'admin' : 'dashboard') : 'landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tight">FluentAI</span>
              <Badge variant="amber" size="sm">PRO ENGINE</Badge>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">AI Speech Fluency & Communication Platform</p>
          </div>
        </div>

        {/* User Stats & Controls */}
        {currentUser ? (
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-400 font-bold text-xs shadow-sm">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>{currentUser.streakCount} Day Streak</span>
            </div>

            {/* User Profile Tag */}
            <div 
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 cursor-pointer transition-all hover:border-sky-500/30"
            >
              <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-400/30 flex items-center justify-center shrink-0">
                {currentUser.role === 'admin' ? (
                  <Shield className="w-4 h-4 text-amber-400" />
                ) : (
                  <UserIcon className="w-4 h-4 text-sky-400" />
                )}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-bold text-white">{currentUser.name}</div>
                <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                  {currentUser.role} • {currentUser.subscriptionTier}
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <Button
              onClick={() => onNavigate('login')}
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-4 h-4" />}
            >
              Get Started
            </Button>
          </div>
        )}

      </div>
    </header>
  );
};
