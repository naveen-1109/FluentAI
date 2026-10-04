import React from 'react';
import { Award, Lock } from 'lucide-react';
import type { Achievement } from '../types';
import { Badge } from '../components/common/Badge';

interface AchievementsPageProps {
  achievements: Achievement[];
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ achievements }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="clinical-card p-6 space-y-1">
        <Badge variant="teal" icon={<Award className="w-3.5 h-3.5" />}>
          CLINICAL MILESTONES
        </Badge>
        <h1 className="text-2xl font-bold text-slate-900">Speech Fluency & Practice Milestones</h1>
        <p className="text-xs text-slate-500">Track key milestones and consistency as you advance your speech fluency</p>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`clinical-card p-5 space-y-4 relative overflow-hidden transition-all ${
              ach.unlocked ? 'border-slate-300' : 'opacity-60 bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                ach.unlocked ? 'bg-sky-50 text-sky-800 border border-sky-100' : 'bg-slate-100 text-slate-400 border border-slate-200'
              }`}>
                {ach.unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              {ach.unlocked && (
                <Badge variant="teal" size="sm">Completed</Badge>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-900">{ach.title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed">{ach.description}</p>
            </div>

            {ach.unlockedAt && (
              <div className="text-[11px] text-slate-500 font-medium pt-1 border-t border-slate-200">
                Achieved: {ach.unlockedAt}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

