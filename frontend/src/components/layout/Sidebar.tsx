import React from 'react';
import { 
  LayoutDashboard, Mic, History, Briefcase, MessageSquare, 
  Target, Award, Shield, User as UserIcon
} from 'lucide-react';
import type { User } from '../../types';
import { Badge } from '../common/Badge';

interface SidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  currentUser: User | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate, currentUser }) => {
  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  const userNavItems = [
    { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
    { label: 'Speech Studio', route: 'studio', icon: Mic },
    { label: 'AI Interview', route: 'interview', icon: Briefcase },
    { label: 'AI Conversation', route: 'conversation', icon: MessageSquare },
    { label: 'Learning Plan', route: 'learning', icon: Target },
    { label: 'Speech History', route: 'history', icon: History },
    { label: 'Achievements', route: 'achievements', icon: Award },
    { label: 'Profile Settings', route: 'profile', icon: UserIcon },
  ];

  const adminNavItems = [
    { label: 'Admin Overview', route: 'admin', icon: Shield },
    { label: 'Speech Studio', route: 'studio', icon: Mic },
    { label: 'User Directory', route: 'admin-users', icon: UserIcon },
    { label: 'System Logs', route: 'admin-logs', icon: History },
  ];

  const items = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className="w-64 bg-slate-950/60 border-r border-slate-800/80 min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-1.5">
        <div className="px-3.5 py-2 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
          {isAdmin ? 'ADMINISTRATION PORTAL' : 'NAVIGATION MENU'}
        </div>

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;

          return (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                isActive
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Subscription Card Widget */}
      {!isAdmin && (
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400">Pro Subscription</span>
            <Badge variant="sky" size="sm">Active</Badge>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Unlimited AI Speech Analysis, Interview Simulations & Whisper Transcriptions.
          </p>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-full py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700/60"
          >
            Manage Plan
          </button>
        </div>
      )}
    </aside>
  );
};
