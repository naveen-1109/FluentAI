import React, { useState } from 'react';
import { Briefcase, ChevronRight, Volume2 } from 'lucide-react';
import type { SessionAnalysis } from '../types';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface InterviewModePageProps {
  onSessionAnalyzed: (session: SessionAnalysis) => void;
}

export const InterviewModePage: React.FC<InterviewModePageProps> = () => {
  const [selectedDomain, setSelectedDomain] = useState('Software Engineering');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      category: 'System Architecture',
      text: 'Tell me about a time you designed a high-throughput, low-latency API architecture under strict SLA constraints.'
    },
    {
      category: 'Conflict Resolution',
      text: 'Describe how you handle technical disagreements regarding code quality or database schema design within a team.'
    },
    {
      category: 'Problem Solving',
      text: 'Explain how you debug and resolve intermittent production memory leaks under heavy traffic.'
    }
  ];

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="clinical-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Badge variant="teal" icon={<Briefcase className="w-3.5 h-3.5" />}>
            AI INTERVIEW SIMULATOR
          </Badge>
          <h1 className="text-2xl font-bold text-slate-900">Simulated Behavioral & Technical Interview</h1>
          <p className="text-xs text-slate-500">Practice responding to real interview questions while AI evaluates speech rate & fluency</p>
        </div>

        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          className="bg-white border border-slate-300 text-slate-800 rounded-lg px-3.5 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 cursor-pointer shadow-xs"
        >
          <option value="Software Engineering">Domain: Software Engineering</option>
          <option value="Product Management">Domain: Product Management</option>
          <option value="Data Science">Domain: Data Science</option>
        </select>
      </div>

      {/* Question Card */}
      <div className="clinical-card p-8 sm:p-10 space-y-8 text-center">
        <div className="flex justify-center">
          <Badge variant="slate" size="md">
            Question {currentQuestionIndex + 1} of {questions.length} • {currentQ.category}
          </Badge>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 max-w-3xl mx-auto leading-relaxed">
          "{currentQ.text}"
        </h2>

        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => {
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(currentQ.text);
                window.speechSynthesis.speak(utterance);
              }
            }}
            variant="outline"
            size="md"
            icon={<Volume2 className="w-4 h-4 text-sky-800" />}
          >
            Read Question Aloud
          </Button>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-200">
          <Button
            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            variant="ghost"
            size="sm"
          >
            Previous Question
          </Button>

          <Button
            onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            variant="primary"
            size="sm"
            icon={<ChevronRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Next Question
          </Button>
        </div>
      </div>

    </div>
  );
};

