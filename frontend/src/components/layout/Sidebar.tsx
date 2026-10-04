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

  const navSections = isAdmin ? [
    {
      title: 'ADMINISTRATION',
      items: [
        { label: 'Admin Overview', route: 'admin', icon: Shield },
        { label: 'Speech Studio', route: 'studio', icon: Mic },
        { label: 'User Directory', route: 'admin-users', icon: UserIcon },
        { label: 'System Logs', route: 'admin-logs', icon: History },
      ]
    }
  ] : [
    {
      title: 'MAIN',
      items: [
        { label: 'Dashboard', route: 'dashboard', icon: LayoutDashboard },
        { label: 'Speech Studio', route: 'studio', icon: Mic },
      ]
    },
    {
      title: 'PRACTICE',
      items: [
        { label: 'AI Interview', route: 'interview', icon: Briefcase },
        { label: 'AI Conversation', route: 'conversation', icon: MessageSquare },
      ]
    },
    {
      title: 'PROGRESS',
      items: [
        { label: 'Speech History', route: 'history', icon: History },
        { label: 'Learning Plan', route: 'learning', icon: Target },
        { label: 'Achievements', route: 'achievements', icon: Award },
      ]
    },
    {
      title: 'ACCOUNT',
      items: [
        { label: 'Profile Settings', route: 'profile', icon: UserIcon },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between shrink-0 shadow-xs">
      <div className="space-y-6">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {section.title}
            </div>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.route;

              return (
                <button
                  key={item.route}
                  onClick={() => onNavigate(item.route)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                    isActive
                      ? 'bg-sky-50 text-sky-800 font-semibold border-l-3 border-sky-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-700' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Subscription Card Widget */}
      {!isAdmin && (
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-800">Professional Plan</span>
            <Badge variant="teal" size="sm">Active</Badge>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            Clinical AI Speech Analysis, Whisper STT & Disfluency Profiling.
          </p>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-full py-1.5 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 rounded-md transition-colors border border-slate-200 shadow-2xs"
          >
            Manage Plan
          </button>
        </div>
      )}
    </aside>
  );
};

