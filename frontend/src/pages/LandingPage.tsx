import React from 'react';
import { Sparkles, Activity, ShieldCheck, ArrowRight, Play, Award, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="space-y-16 py-6 sm:py-10 max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="glass-panel p-8 sm:p-14 text-center relative overflow-hidden space-y-6 border-sky-500/20 glow-blue">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-center">
          <Badge variant="amber" icon={<Sparkles className="w-4 h-4" />}>
            Next-Gen AI Speech Pathology & Communication Studio
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Master Speech Fluency with Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-amber-400">AI Speech Analysis</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
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
            variant="secondary"
            size="lg"
            icon={<Play className="w-4 h-4 text-sky-400" />}
          >
            Watch Live Demo
          </Button>
        </div>

        {/* Feature Pill Tags */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-sky-400" /> 16kHz Web Audio Visualizer
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Whisper STT Transcription
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-amber-400" /> Disfluency Event Profiler
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" /> AI Interview Mode
          </div>
        </div>
      </div>

      {/* Core Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 space-y-3 hover:border-sky-500/30 transition-all border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-2">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-white">Real-Time FFT Visualizer</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Browser Web Audio API captures pitch, amplitude distribution, and spectral frequency live as you speak.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-3 hover:border-amber-500/30 transition-all border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-white">Disfluency & Pause Analytics</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatic detection of blocks, prolongations, filler words, repetitions, and speaking pace in Words Per Minute.
          </p>
        </div>

        <div className="glass-panel p-6 space-y-3 hover:border-indigo-500/30 transition-all border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-2">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-base font-bold text-white">AI Interview & Practice Modes</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Practice technical job interviews, behavioral Q&A, and daily speech drills with intelligent AI feedback.
          </p>
        </div>
      </div>

    </div>
  );
};
