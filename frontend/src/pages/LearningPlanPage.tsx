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
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="clinical-card p-6 space-y-1">
        <Badge variant="teal" icon={<Target className="w-3.5 h-3.5" />}>
          SPEECH CURRICULUM
        </Badge>
        <h1 className="text-2xl font-bold text-slate-900">4-Week Speech Fluency & Prolongation Plan</h1>
        <p className="text-xs text-slate-500">Tailored daily targets designed by AI speech pathologists to reduce stuttering blocks</p>
      </div>

      {/* Structured Journey Panel */}
      <div className="clinical-card p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-base font-bold text-slate-900">Week 1 Target Exercises</h2>
          <Badge variant="emerald" size="sm">
            {completedCount} / {tasks.length} Completed
          </Badge>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                task.completed
                  ? 'bg-slate-50 border-slate-200 opacity-70'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 ${
                  task.completed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-0.5">
                  <h3 className={`text-sm font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-normal">{task.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-sky-800 font-semibold shrink-0">
                <Clock className="w-3.5 h-3.5" /> {task.durationMinutes} mins
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

