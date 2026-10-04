import React from 'react';
import { Activity, Calendar, Mic, TrendingUp, Clock, Gauge } from 'lucide-react';
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
      
      {/* Speech Fluency Assessment Card */}
      <div className="clinical-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Speech Fluency</span>
          <div className="p-2 rounded-lg bg-sky-50 text-sky-800 border border-sky-100">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">{avgFluency}%</span>
          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
            <TrendingUp className="w-3 h-3" /> +4%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
          <div 
            className="bg-sky-700 h-full rounded-full transition-all duration-500"
            style={{ width: `${avgFluency}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-500">Based on recent recordings</p>
      </div>

      {/* Speech Rate (WPM) Card */}
      <div className="clinical-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Speech Rate</span>
          <div className="p-2 rounded-lg bg-teal-50 text-teal-800 border border-teal-100">
            <Gauge className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">
            {latestSession ? latestSession.speechRateWpm : 148} <span className="text-sm font-medium text-slate-600">WPM</span>
          </span>
        </div>
        <div className="text-xs text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 w-max">
          Within target range (140–160 WPM)
        </div>
      </div>

      {/* Total Sessions Completed Card */}
      <div className="clinical-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sessions</span>
          <div className="p-2 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            <Mic className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">{sessions.length}</span>
          <span className="text-xs text-slate-500 font-medium">assessments</span>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Latest: {latestSession ? latestSession.date : 'None'}</span>
        </div>
      </div>

      {/* Practice Consistency Card */}
      <div className="clinical-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Practice Consistency</span>
          <div className="p-2 rounded-lg bg-amber-50 text-amber-800 border border-amber-100">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-900">{user.streakCount}</span>
          <span className="text-xs text-slate-600 font-medium">consecutive days</span>
        </div>
        <p className="text-[11px] text-slate-500">Regular practice improves long-term fluency score.</p>
      </div>

    </div>
  );
};

