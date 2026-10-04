import type { User, SessionAnalysis, LearningTask, Achievement, AuditLog } from '../types';

export const DEMO_USER: User = {
  id: 'usr-101',
  email: 'alex.rivera@fluentai.app',
  name: 'Alex Rivera',
  role: 'user',
  subscriptionTier: 'pro',
  streakCount: 5,
  totalSessions: 18,
  avgFluency: 82,
  targetGoal: 'Reduce speech blocks & master technical interview presentation',
  joinedDate: '2026-01-15'
};

export const DEMO_ADMIN_USER: User = {
  id: 'adm-001',
  email: 'admin@fluentai.app',
  name: 'System Admin',
  role: 'admin',
  subscriptionTier: 'enterprise',
  streakCount: 30,
  totalSessions: 120,
  avgFluency: 95,
  joinedDate: '2025-11-01'
};

export const INITIAL_SESSIONS: SessionAnalysis[] = [
  {
    id: 'sess-201',
    userId: 'usr-101',
    title: 'Software Engineer Behavioral Mock Interview',
    date: '2026-09-25 14:30',
    durationSeconds: 145,
    fluencyScore: 84,
    speechRateWpm: 148,
    transcript: "Hello, my name is Alex. Today I'm going to walk you through a high-throughput distributed messaging architecture that I designed for real-time telemetry processing.",
    disfluencies: [
      { id: 'ev-1', event: 'pause', time: '00:05', duration: 1.2 },
      { id: 'ev-2', event: 'sound_rep', time: '00:14', word: 'th-th-through', duration: 0.7 },
      { id: 'ev-3', event: 'block', time: '00:28', word: 'architecture', duration: 1.4 }
    ],
    pausesCount: 3,
    fillerWordsCount: 2,
    pronunciationScore: 88,
    grammarScore: 92,
    vocabularyScore: 90,
    aiFeedbackSummary: 'Excellent articulation of technical terminology. Smooth breath management during initial onset.',
    strengths: [
      'Maintained consistent speech rate (148 WPM target range)',
      'High lexical diversity in engineering vocabulary',
      'Strong vocal confidence on key phrases'
    ],
    actionItems: [
      'Practice gentle onset when starting sentences beginning with vowel sounds',
      'Reduce 1.4s block duration using voluntary prolongation drills'
    ]
  },
  {
    id: 'sess-200',
    userId: 'usr-101',
    title: 'Gentle Onset Passage Reading',
    date: '2026-09-22 10:15',
    durationSeconds: 90,
    fluencyScore: 78,
    speechRateWpm: 132,
    transcript: "In early spring, gentle breezes refresh the coastal landscape as migrating birds return north.",
    disfluencies: [
      { id: 'ev-4', event: 'prolongation', time: '00:03', word: 'sssspring', duration: 1.8 },
      { id: 'ev-5', event: 'word_rep', time: '00:18', word: 'as as', duration: 0.9 }
    ],
    pausesCount: 5,
    fillerWordsCount: 1,
    pronunciationScore: 85,
    grammarScore: 95,
    vocabularyScore: 84,
    aiFeedbackSummary: 'Good phrasing control with steady diaphragmatic support.',
    strengths: ['Low filler word frequency', 'Good sentence pause placement'],
    actionItems: ['Focus on softening sibilant consonant transitions']
  }
];

export const INITIAL_LEARNING_TASKS: LearningTask[] = [
  {
    id: 'task-1',
    title: 'Prolonged Speech Drill (5 Mins)',
    description: 'Stretch vowel sounds gently for 3 seconds per word to smooth out speech transitions.',
    category: 'fluency',
    durationMinutes: 5,
    completed: true
  },
  {
    id: 'task-2',
    title: 'Diaphragmatic Breathing Routine',
    description: 'Perform 3-cycle deep abdominal breath exercises before beginning recording.',
    category: 'pace',
    durationMinutes: 3,
    completed: false
  },
  {
    id: 'task-3',
    title: 'System Design Pitch Practice',
    description: 'Record a 2-minute elevator pitch detailing an architectural decision.',
    category: 'vocabulary',
    durationMinutes: 10,
    completed: false
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Step',
    description: 'Completed your first AI speech analysis session.',
    iconName: 'Sparkles',
    unlocked: true,
    unlockedAt: '2026-01-16'
  },
  {
    id: 'ach-2',
    title: '5-Day Streak',
    description: 'Practiced speech exercises 5 days in a row.',
    iconName: 'Flame',
    unlocked: true,
    unlockedAt: '2026-09-25'
  },
  {
    id: 'ach-3',
    title: 'Fluency Master',
    description: 'Achieve a speech fluency score over 85%.',
    iconName: 'Award',
    unlocked: false
  },
  {
    id: 'ach-4',
    title: 'Interview Ace',
    description: 'Complete 10 AI interview simulation modules.',
    iconName: 'Briefcase',
    unlocked: false
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '2026-09-26 09:15:22',
    action: 'USER_REGISTERED',
    actor: 'alex.rivera@fluentai.app',
    details: 'New user account created successfully via email authentication.'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-26 09:30:10',
    action: 'AUDIO_SESSION_ANALYZED',
    actor: 'system-ai-engine',
    details: 'Processed 145s speech recording. Whisper STT accuracy 98.4%.'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-26 09:42:00',
    action: 'SUBSCRIPTION_UPGRADED',
    actor: 'alex.rivera@fluentai.app',
    details: 'Upgraded plan from Free Tier to Pro Tier.'
  }
];
