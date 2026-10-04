import React from 'react';
import { Activity, Flame, Mic, TrendingUp, Sparkles, Clock } from 'lucide-react';
import type { User, SessionAnalysis } from '../../types';

interface MetricsOverviewProps {
  user: User;
  sessions: SessionAnalysis[];
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ user, sessions }) => {
  const latestSession = sessions[0];
  const avgFluency = user.avgFluency || 80;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Fluency Score Card */}
      <div className="glass-panel p-5 border-sky-500/20 glow-blue space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Overall Fluency</span>
          <div className="p-2 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white">{avgFluency}%</span>
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3.5 h-3.5" /> +4%
          </span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
          <div 
            className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${avgFluency}%` }}
          />
        </div>
      </div>

      {/* Daily Streak Card */}
      <div className="glass-panel p-5 border-amber-500/20 glow-gold space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Practice Streak</span>
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white">{user.streakCount} Days</span>
          <span className="text-xs text-amber-400 font-bold">Active</span>
        </div>
        <p className="text-xs text-slate-400">Complete 1 session today to keep your streak!</p>
      </div>

      {/* Total Sessions Completed */}
      <div className="glass-panel p-5 border-indigo-500/20 glow-indigo space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Sessions</span>
          <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
            <Mic className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white">{sessions.length}</span>
          <span className="text-xs text-slate-400 font-medium">analyzed</span>
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span className="truncate">Last: {latestSession ? latestSession.date : 'None'}</span>
        </div>
      </div>

      {/* Target Speech WPM */}
      <div className="glass-panel p-5 border-emerald-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Speech Pace (WPM)</span>
          <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white">
            {latestSession ? latestSession.speechRateWpm : 145}
          </span>
          <span className="text-xs font-bold text-emerald-400">Optimal Pace</span>
        </div>
        <p className="text-xs text-slate-400">Target Range: 140–160 WPM</p>
      </div>

    </div>
  );
};
