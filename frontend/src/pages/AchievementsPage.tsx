import React from 'react';
import { Award, Lock } from 'lucide-react';
import type { Achievement } from '../types';
import { Badge } from '../components/common/Badge';

interface AchievementsPageProps {
  achievements: Achievement[];
}

export const AchievementsPage: React.FC<AchievementsPageProps> = ({ achievements }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 border-amber-500/20 glow-gold space-y-1">
        <Badge variant="amber" icon={<Award className="w-3.5 h-3.5" />}>
          REWARDS & MILESTONES
        </Badge>
        <h1 className="text-2xl font-bold text-white">Achievements & Speech Milestones</h1>
        <p className="text-xs text-slate-400">Unlock badges and maintain streaks as you advance your speech fluency</p>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`glass-panel p-5 space-y-4 relative overflow-hidden transition-all ${
              ach.unlocked ? 'border-amber-500/30 shadow-lg shadow-amber-500/5' : 'opacity-50 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                ach.unlocked ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-slate-800 text-slate-500'
              }`}>
                {ach.unlocked ? <Award className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
              </div>
              {ach.unlocked && (
                <Badge variant="amber" size="sm">Unlocked</Badge>
              )}
            </div>

            <div className="space-y-1">
              <h2 className="text-sm font-bold text-white">{ach.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{ach.description}</p>
            </div>

            {ach.unlockedAt && (
              <div className="text-[10px] text-slate-500 font-semibold pt-1 border-t border-slate-800/80">
                Earned on: {ach.unlockedAt}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
