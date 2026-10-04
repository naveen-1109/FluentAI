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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#DCE4EA] px-4 sm:px-8 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate(currentUser ? (currentUser.role === 'admin' ? 'admin' : 'dashboard') : 'landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#123B5D] flex items-center justify-center text-white shadow-xs group-hover:bg-[#0E4F7A] transition-colors">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#172B3A] tracking-tight">FluentAI</span>
              <Badge variant="sky" size="sm">Professional Plan</Badge>
            </div>
            <p className="text-[11px] text-[#52687A] font-medium hidden sm:block">Clinical Speech Analysis & Communication Platform</p>
          </div>
        </div>

        {/* User Stats & Controls */}
        {currentUser ? (
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Practice Consistency */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#DCE4EA] text-[#172B3A] font-medium text-xs">
              <Calendar className="w-4 h-4 text-[#1769AA] shrink-0" />
              <span>{currentUser.streakCount} Days Active</span>
            </div>

            {/* User Profile Tag */}
            <div 
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#F8FAFC] border border-[#DCE4EA] cursor-pointer transition-all"
            >
              <div className="w-7 h-7 rounded-md bg-[#F8FAFC] border border-[#DCE4EA] flex items-center justify-center shrink-0">
                {currentUser.role === 'admin' ? (
                  <Shield className="w-4 h-4 text-[#123B5D]" />
                ) : (
                  <UserIcon className="w-4 h-4 text-[#52687A]" />
                )}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-semibold text-[#172B3A]">{currentUser.name}</div>
                <div className="text-[10px] font-medium text-[#718496] uppercase tracking-wider">
                  {currentUser.role} • {currentUser.subscriptionTier}
                </div>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-2 rounded-lg bg-[#F8FAFC] hover:bg-[#FDEEEE] border border-[#DCE4EA] text-[#52687A] hover:text-[#C24141] transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>

          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-[#52687A] hover:text-[#172B3A] transition-colors"
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


