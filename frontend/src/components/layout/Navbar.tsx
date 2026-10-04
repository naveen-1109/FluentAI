import React from 'react';
import { Mic, User as UserIcon, LogOut, Shield, Calendar, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate(currentUser ? (currentUser.role === 'admin' ? 'admin' : 'dashboard') : 'landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-sky-800 flex items-center justify-center text-white shadow-xs group-hover:bg-sky-900 transition-colors">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-900 tracking-tight">FluentAI</span>
              <Badge variant="sky" size="sm">Professional Plan</Badge>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Clinical Speech Analysis & Communication Platform</p>
          </div>
        </div>

        {/* User Stats & Controls */}
        {currentUser ? (
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Practice Consistency */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium text-xs">
              <Calendar className="w-4 h-4 text-sky-700 shrink-0" />
              <span>{currentUser.streakCount} Days Active</span>
            </div>

            {/* User Profile Tag */}
            <div 
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 cursor-pointer transition-all"
            >
              <div className="w-7 h-7 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                {currentUser.role === 'admin' ? (
                  <Shield className="w-4 h-4 text-sky-800" />
                ) : (
                  <UserIcon className="w-4 h-4 text-slate-700" />
                )}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-semibold text-slate-900">{currentUser.name}</div>
                <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  {currentUser.role} • {currentUser.subscriptionTier}
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-lg bg-slate-100 hover:bg-rose-50 border border-slate-200 text-slate-600 hover:text-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
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

