import React from 'react';
import { Mic, Sparkles, ChevronRight, CheckCircle2, MessageSquare, Briefcase, Target } from 'lucide-react';
import type { User, SessionAnalysis, LearningTask } from '../types';
import { MetricsOverview } from '../components/dashboard/MetricsOverview';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface DashboardPageProps {
  user: User;
  sessions: SessionAnalysis[];
  tasks: LearningTask[];
  onNavigate: (route: string) => void;
  onToggleTask: (taskId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  user,
  sessions,
  tasks,
  onNavigate,
  onToggleTask
}) => {
  const latestSession = sessions[0];
  const completedTasksCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome & Primary Quick Action Header */}
      <div className="glass-panel p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-sky-500/20 glow-blue">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="sky" icon={<Sparkles className="w-3.5 h-3.5" />}>
            FluentAI Speech Fluency Assistant
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Target Goal: <span className="text-white font-semibold">{user.targetGoal || 'Improve speech fluency & reduce block frequency'}</span>
          </p>
        </div>

        <Button
          onClick={() => onNavigate('studio')}
          variant="primary"
          size="lg"
          icon={<Mic className="w-5 h-5" />}
        >
          Start Speech Recording
        </Button>
      </div>

      {/* 2. Key Metrics & Fluency Overview */}
      <MetricsOverview user={user} sessions={sessions} />

      {/* 3. Quick Action Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest px-1">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('studio')}
            className="glass-panel-interactive p-4 text-left space-y-2 flex items-start gap-3 border-sky-500/20"
          >
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-400 border border-sky-500/30 shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Speech Studio</div>
              <div className="text-xs text-slate-400">Record text passages with live FFT visualizer</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('interview')}
            className="glass-panel-interactive p-4 text-left space-y-2 flex items-start gap-3 border-indigo-500/20"
          >
            <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">AI Interview</div>
              <div className="text-xs text-slate-400">Practice technical & behavioral questions</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('conversation')}
            className="glass-panel-interactive p-4 text-left space-y-2 flex items-start gap-3 border-amber-500/20"
          >
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">AI Dialogue</div>
              <div className="text-xs text-slate-400">Natural conversation practice with real-time feedback</div>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Two Column Layout: Recent Session Breakdown & Daily Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Speech Session Report */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-5 border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Latest Analyzed Speech Session</h3>
              <p className="text-xs text-slate-400">Detailed breakdown of disfluencies and speech rate</p>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
            >
              View History <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {latestSession ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-200">{latestSession.title}</span>
                <span>{latestSession.date}</span>
              </div>

              {/* Fluency & Pace Progress Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-400">Fluency Score</div>
                  <div className="text-2xl font-black text-sky-400">{latestSession.fluencyScore}%</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-400">Speech Rate</div>
                  <div className="text-2xl font-black text-amber-400">{latestSession.speechRateWpm} WPM</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-xs font-semibold text-slate-400">Disfluencies</div>
                  <div className="text-2xl font-black text-rose-400">{latestSession.disfluencies.length} Events</div>
                </div>
              </div>

              {/* AI Transcript */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <div className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">Verbatim Transcript</div>
                <p className="italic leading-relaxed">"{latestSession.transcript}"</p>
              </div>

              {/* AI Coach Remark */}
              <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-300 space-y-1">
                <div className="font-extrabold uppercase tracking-wider text-[10px]">AI Speech Coach Remark</div>
                <p className="leading-relaxed">{latestSession.aiFeedbackSummary}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">No speech sessions recorded yet.</div>
          )}
        </div>

        {/* Right Column: Daily Learning Plan Tasks */}
        <div className="glass-panel p-6 space-y-4 border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">Daily Speech Tasks</h3>
            </div>
            <Badge variant="amber" size="sm">
              {completedTasksCount} / {tasks.length} Done
            </Badge>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  task.completed
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-slate-900/90 border-slate-800 hover:border-sky-500/50'
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                  task.completed
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'border-slate-700 bg-slate-800'
                }`}>
                  {task.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div className="space-y-1">
                  <div className={`text-xs font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-relaxed">{task.description}</div>
                  <div className="text-[10px] text-sky-400 font-semibold">Duration: {task.durationMinutes} mins</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('learning')}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors flex items-center justify-center gap-1.5 border border-slate-800"
          >
            View Complete Learning Plan <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
