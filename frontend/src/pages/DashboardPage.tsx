import React from 'react';
import { Mic, ChevronRight, CheckCircle2, MessageSquare, Briefcase, Target, Activity } from 'lucide-react';
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
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* 1. Clinical Dashboard Hero Introduction */}
      <div className="clinical-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <Badge variant="teal" icon={<Activity className="w-3.5 h-3.5" />}>
            Clinical Speech & Communication Assessment
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good morning, {user.name}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Continue improving your communication skills. Your latest assessment shows steady progress in speech fluency.
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Primary Goal: <span className="text-slate-800 font-semibold">{user.targetGoal || 'Improve speech fluency & reduce block frequency'}</span>
          </p>
        </div>

        <Button
          onClick={() => onNavigate('studio')}
          variant="primary"
          size="lg"
          icon={<Mic className="w-5 h-5" />}
        >
          Start Speech Session
        </Button>
      </div>

      {/* 2. Key Metrics & Fluency Overview */}
      <MetricsOverview user={user} sessions={sessions} />

      {/* 3. Quick Action Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Assessment Workspaces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onNavigate('studio')}
            className="clinical-card-interactive p-4 text-left space-y-2 flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-100 shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Speech Studio</div>
              <div className="text-xs text-slate-500">Record reading passages for FFT disfluency analysis</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('interview')}
            className="clinical-card-interactive p-4 text-left space-y-2 flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-100 shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">AI Interview</div>
              <div className="text-xs text-slate-500">Practice behavioral and clinical Q&A scenarios</div>
            </div>
          </button>

          <button
            onClick={() => onNavigate('conversation')}
            className="clinical-card-interactive p-4 text-left space-y-2 flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">AI Dialogue</div>
              <div className="text-xs text-slate-500">Natural conversation practice with real-time feedback</div>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Two Column Layout: Latest Speech Assessment & Today's Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Latest Speech Assessment Summary */}
        <div className="lg:col-span-2 clinical-card p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Latest Speech Assessment</h3>
              <p className="text-xs text-slate-500">Detailed breakdown of speech fluency and pace</p>
            </div>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs font-semibold text-sky-800 hover:text-sky-900 flex items-center gap-1 transition-colors"
            >
              View History <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {latestSession ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{latestSession.title}</span>
                <span>{latestSession.date}</span>
              </div>

              {/* Fluency & Pace Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-500">Fluency Score</div>
                  <div className="text-2xl font-bold text-sky-800">{latestSession.fluencyScore}%</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-500">Speaking Rate</div>
                  <div className="text-2xl font-bold text-teal-800">{latestSession.speechRateWpm} WPM</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-xs font-semibold text-slate-500">Disfluencies</div>
                  <div className="text-2xl font-bold text-slate-800">{latestSession.disfluencies.length} Events</div>
                </div>
              </div>

              {/* Verbatim Transcript */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Verbatim Transcript</div>
                <p className="italic leading-relaxed">"{latestSession.transcript}"</p>
              </div>

              {/* AI Assessment Remark */}
              <div className="p-4 rounded-lg bg-sky-50 border border-sky-100 text-xs text-sky-900 space-y-1">
                <div className="font-bold uppercase tracking-wider text-[10px] text-sky-800">Speech Assessment Observations</div>
                <p className="leading-relaxed">{latestSession.aiFeedbackSummary}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-sm">No speech sessions recorded yet.</div>
          )}
        </div>

        {/* Right Column: Today's Practice Tasks */}
        <div className="clinical-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-800" />
              <h3 className="text-base font-bold text-slate-900">Today's Practice</h3>
            </div>
            <Badge variant="sky" size="sm">
              {completedTasksCount} / {tasks.length} Done
            </Badge>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                  task.completed
                    ? 'bg-slate-50 border-slate-200 opacity-70'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                  task.completed
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}>
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-0.5">
                  <div className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {task.title}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-normal">{task.description}</div>
                  <div className="text-[10px] text-sky-700 font-medium">Duration: {task.durationMinutes} mins</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('learning')}
            className="w-full py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
          >
            View Full Learning Plan <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

