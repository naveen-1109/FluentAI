import React from 'react';
import { History, Calendar, Clock } from 'lucide-react';
import type { SessionAnalysis } from '../types';
import { Badge } from '../components/common/Badge';

interface HistoryPageProps {
  sessions: SessionAnalysis[];
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ sessions }) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="clinical-card p-6 space-y-1">
        <Badge variant="teal" icon={<History className="w-3.5 h-3.5" />}>
          SESSION LOGS
        </Badge>
        <h1 className="text-2xl font-bold text-slate-900">Historical Speech & Disfluency Reports</h1>
        <p className="text-xs text-slate-500">Review all past audio recordings, WPM trends, and AI coach remarks</p>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((sess) => (
          <div key={sess.id} className="clinical-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900">{sess.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-sky-800" /> {sess.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-slate-500" /> {sess.durationSeconds}s</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="sky" size="sm">Fluency: {sess.fluencyScore}%</Badge>
                <Badge variant="teal" size="sm">{sess.speechRateWpm} WPM</Badge>
              </div>
            </div>

            <p className="text-xs text-slate-700 italic bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed">
              "{sess.transcript}"
            </p>

            <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-900 space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-sky-800">Speech Assessment Observations: </span>
              <span className="leading-relaxed">{sess.aiFeedbackSummary}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

