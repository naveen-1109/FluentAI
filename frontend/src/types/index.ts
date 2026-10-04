export type Role = 'user' | 'therapist' | 'admin';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  subscriptionTier: SubscriptionTier;
  streakCount: number;
  totalSessions: number;
  avgFluency: number;
  targetGoal?: string;
  joinedDate: string;
}

export type DisfluencyType = 'block' | 'word_rep' | 'sound_rep' | 'prolongation' | 'interjection' | 'pause';

export interface DisfluencyEvent {
  id: string;
  event: DisfluencyType;
  time: string; // e.g., "00:04"
  word?: string;
  duration?: number; // seconds
}

export interface SessionAnalysis {
  id: string;
  userId: string;
  title: string;
  date: string;
  durationSeconds: number;
  fluencyScore: number;       // 0-100
  speechRateWpm: number;      // Words Per Minute
  transcript: string;
  disfluencies: DisfluencyEvent[];
  pausesCount: number;
  fillerWordsCount: number;
  pronunciationScore: number;  // 0-100
  grammarScore: number;        // 0-100
  vocabularyScore: number;     // 0-100
  aiFeedbackSummary: string;
  strengths: string[];
  actionItems: string[];
  audioUrl?: string;
}

export interface InterviewQuestion {
  id: string;
  category: string;
  questionText: string;
  difficulty: 'easy' | 'medium' | 'hard';
  expectedKeywords: string[];
}

export interface LearningTask {
  id: string;
  title: string;
  description: string;
  category: 'fluency' | 'pronunciation' | 'pace' | 'vocabulary';
  durationMinutes: number;
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  details: string;
}
