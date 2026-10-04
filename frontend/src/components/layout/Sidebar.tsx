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
    <aside className="w-64 bg-white border-r border-[#DCE4EA] min-h-[calc(100vh-65px)] p-4 flex flex-col justify-between shrink-0 shadow-xs">
      <div className="space-y-6">
        {navSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold text-[#718496] uppercase tracking-widest">
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
                      ? 'bg-[#EAF3F9] text-[#1769AA] font-semibold border-l-3 border-[#1769AA] shadow-2xs'
                      : 'text-[#52687A] hover:text-[#172B3A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1769AA]' : 'text-[#718496]'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Subscription Card Widget */}
      {!isAdmin && (
        <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#DCE4EA] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#172B3A]">Professional Plan</span>
            <Badge variant="teal" size="sm">Active</Badge>
          </div>
          <p className="text-[11px] text-[#52687A] leading-normal">
            Clinical AI Speech Analysis, Whisper STT & Disfluency Profiling.
          </p>
          <button 
            onClick={() => onNavigate('profile')}
            className="w-full py-1.5 text-xs font-medium bg-white hover:bg-[#F8FAFC] text-[#172B3A] rounded-md transition-colors border border-[#DCE4EA] shadow-2xs"
          >
            Manage Plan
          </button>
        </div>
      )}
    </aside>
  );
};


