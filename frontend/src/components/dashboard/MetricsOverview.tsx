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
          <span className="text-xs font-semibold text-[#718496] uppercase tracking-wider">Speech Fluency</span>
          <div className="p-2 rounded-lg bg-[#EAF3F9] text-[#1769AA] border border-[#1769AA]/20">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#172B3A]">{avgFluency}%</span>
          <span className="text-xs font-semibold text-[#167A5B] flex items-center gap-0.5 bg-[#EAF6F1] px-1.5 py-0.5 rounded border border-[#167A5B]/20">
            <TrendingUp className="w-3 h-3" /> +4%
          </span>
        </div>
        <div className="w-full bg-[#F8FAFC] rounded-full h-2 overflow-hidden border border-[#DCE4EA]">
          <div 
            className="bg-[#1769AA] h-full rounded-full transition-all duration-500"
            style={{ width: `${avgFluency}%` }}
          />
        </div>
        <p className="text-[11px] text-[#718496]">Based on recent recordings</p>
      </div>

      {/* Speech Rate (WPM) Card */}
      <div className="clinical-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#718496] uppercase tracking-wider">Speech Rate</span>
          <div className="p-2 rounded-lg bg-[#E7F5F2] text-[#0F766E] border border-[#0F766E]/20">
            <Gauge className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#172B3A]">
            {latestSession ? latestSession.speechRateWpm : 148} <span className="text-sm font-medium text-[#52687A]">WPM</span>
          </span>
        </div>
        <div className="text-xs text-[#167A5B] font-medium flex items-center gap-1 bg-[#EAF6F1] px-2 py-0.5 rounded border border-[#167A5B]/20 w-max">
          Within target range (140–160 WPM)
        </div>
      </div>

      {/* Total Sessions Completed Card */}
      <div className="clinical-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#718496] uppercase tracking-wider">Total Sessions</span>
          <div className="p-2 rounded-lg bg-[#F8FAFC] text-[#172B3A] border border-[#DCE4EA]">
            <Mic className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#172B3A]">{sessions.length}</span>
          <span className="text-xs text-[#52687A] font-medium">assessments</span>
        </div>
        <div className="text-xs text-[#718496] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#718496]" />
          <span className="truncate">Latest: {latestSession ? latestSession.date : 'None'}</span>
        </div>
      </div>

      {/* Practice Consistency Card */}
      <div className="clinical-card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#718496] uppercase tracking-wider">Practice Consistency</span>
          <div className="p-2 rounded-lg bg-[#FFF7E6] text-[#A66A16] border border-[#A66A16]/20">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#172B3A]">{user.streakCount}</span>
          <span className="text-xs text-[#52687A] font-medium">consecutive days</span>
        </div>
        <p className="text-[11px] text-[#718496]">Regular practice improves long-term fluency score.</p>
      </div>

    </div>
  );
};


