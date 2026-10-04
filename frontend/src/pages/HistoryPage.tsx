import React from 'react';
import { History, Calendar, Clock } from 'lucide-react';
import type { SessionAnalysis } from '../types';
import { Badge } from '../components/common/Badge';

interface HistoryPageProps {
  sessions: SessionAnalysis[];
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ sessions }) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 border-sky-500/20 space-y-1">
        <Badge variant="sky" icon={<History className="w-3.5 h-3.5" />}>
          SESSION LOGS
        </Badge>
        <h1 className="text-2xl font-bold text-white">Historical Speech & Disfluency Reports</h1>
        <p className="text-xs text-slate-400">Review all past audio recordings, WPM trends, and AI coach remarks</p>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((sess) => (
          <div key={sess.id} className="glass-panel p-6 space-y-4 border-slate-800 hover:border-sky-500/30 transition-colors">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800/80 pb-4 gap-3">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-white">{sess.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-sky-400" /> {sess.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-indigo-400" /> {sess.durationSeconds}s</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="sky" size="sm">Fluency: {sess.fluencyScore}%</Badge>
                <Badge variant="amber" size="sm">{sess.speechRateWpm} WPM</Badge>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic bg-slate-900/40 p-3 rounded-xl border border-slate-800/60 leading-relaxed">
              "{sess.transcript}"
            </p>

            <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 space-y-1">
              <span className="font-extrabold uppercase tracking-wider text-[10px]">AI Coach Remark: </span>
              <span className="leading-relaxed">{sess.aiFeedbackSummary}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
