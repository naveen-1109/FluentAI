import React from 'react';
import { Activity, ShieldCheck, ArrowRight, Play, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="space-y-12 py-6 sm:py-10 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="clinical-card p-8 sm:p-14 text-center relative overflow-hidden space-y-6">
        <div className="flex justify-center">
          <Badge variant="teal" icon={<Activity className="w-4 h-4" />}>
            Clinical Speech Pathology & Communication Platform
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Master Speech Fluency with Objective <span className="text-sky-800">AI Speech Analysis</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          FluentAI delivers real-time audio FFT waveform analysis, Whisper speech-to-text, disfluency profiling (blocks, repetitions, pauses), AI behavioral interview practice, and personalized speech goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Button
            onClick={onGetStarted}
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Start Speech Studio
          </Button>

          <Button
            onClick={onGetStarted}
            variant="outline"
            size="lg"
            icon={<Play className="w-4 h-4 text-sky-800" />}
          >
            Watch Overview
          </Button>
        </div>

        {/* Feature Pill Tags */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-sky-700" /> Web Audio API FFT
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-teal-700" /> Whisper STT Engine
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Disfluency Profiling
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-slate-700" /> Clinical Q&A Simulation
          </div>
        </div>
      </div>

      {/* Core Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="clinical-card-interactive p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-800 mb-2">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Real-Time FFT Visualizer</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Browser Web Audio API captures pitch, amplitude distribution, and spectral frequency live as you speak.
          </p>
        </div>

        <div className="clinical-card-interactive p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 mb-2">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Disfluency & Pause Analytics</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automatic detection of blocks, prolongations, filler words, repetitions, and speaking pace in Words Per Minute.
          </p>
        </div>

        <div className="clinical-card-interactive p-6 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-2">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Clinical Practice Modes</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Practice technical job interviews, behavioral Q&A, and daily speech drills with intelligent AI feedback.
          </p>
        </div>
      </div>

    </div>
  );
};

