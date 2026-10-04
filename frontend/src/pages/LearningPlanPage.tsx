import React from 'react';
import { Target, CheckCircle2, Clock } from 'lucide-react';
import type { LearningTask } from '../types';
import { Badge } from '../components/common/Badge';

interface LearningPlanPageProps {
  tasks: LearningTask[];
  onToggleTask: (taskId: string) => void;
}

export const LearningPlanPage: React.FC<LearningPlanPageProps> = ({ tasks, onToggleTask }) => {
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 border-sky-500/20 space-y-1">
        <Badge variant="sky" icon={<Target className="w-3.5 h-3.5" />}>
          SPEECH CURRICULUM
        </Badge>
        <h1 className="text-2xl font-bold text-white">4-Week Speech Fluency & Prolongation Plan</h1>
        <p className="text-xs text-slate-400">Tailored daily targets designed by AI speech pathologists to reduce stuttering blocks</p>
      </div>

      {/* Structured Journey Panel */}
      <div className="glass-panel p-6 space-y-5 border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white">Week 1 Target Exercises</h2>
          <Badge variant="emerald" size="sm">
            {completedCount} / {tasks.length} Completed
          </Badge>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                task.completed
                  ? 'bg-slate-900/40 border-slate-800 opacity-60'
                  : 'bg-slate-900/90 border-slate-800 hover:border-sky-500/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center border transition-colors shrink-0 ${
                  task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700 bg-slate-800'
                }`}>
                  {task.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-bold shrink-0">
                <Clock className="w-3.5 h-3.5" /> {task.durationMinutes} mins
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
