export type Role = 'USER' | 'ADMIN';

export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export type SpeakingSessionStatus = 'RECORDED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
export type TranscriptionStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface SpeakingSession {
  sessionId: string;
  userId: string;
  title?: string;
  audioKey?: string; // Immutable source of truth key in Backblaze B2: audio/{uid}/{sessionId}/recording.webm
  audioUrl?: string; // Temporary derived pre-signed URL for initial playback (subject to expiration)
  originalFilename?: string;
  mimeType?: string;
  fileSize?: number;
  durationSeconds?: number;
  language: string;
  storageProvider?: 'backblaze-b2';
  status: SpeakingSessionStatus;
  transcriptionStatus?: TranscriptionStatus;
  transcriptAnalysisId?: string | null;
  createdAt: string;
  updatedAt: string;
  uploadedAt?: string;
}

export interface SpeechSegment {
  start: number;
  end: number;
  text: string;
}

export interface SpeechAnalysis {
  analysisId: string;
  sessionId: string;
  userId: string;
  type?: string;
  status?: string;
  transcript?: string;
  transcription?: string;
  language?: string;
  durationSeconds?: number;
  segments?: SpeechSegment[];
  overallScore?: number;
  fluencyScore?: number;
  pronunciationScore?: number;
  grammarScore?: number;
  vocabularyScore?: number;
  speakingRateWpm?: number;
  pauseCount?: number;
  averagePauseDuration?: number;
  fillerWordCount?: number;
  fillerWords?: string[];
  repetitionCount?: number;
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
  createdAt: string;
  updatedAt: string;
}

export type InterviewStatus = 'STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type InterviewDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface InterviewSession {
  sessionId: string;
  userId: string;
  title?: string;
  difficulty?: InterviewDifficulty;
  status: InterviewStatus;
  overallScore?: number;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  questionId: string;
  sessionId: string;
  userId: string;
  question: string;
  answer?: string;
  audioUrl?: string;
  score?: number;
  feedback?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type ConversationStatus = 'ACTIVE' | 'COMPLETED';

export interface ConversationSession {
  sessionId: string;
  userId: string;
  topic?: string;
  messages?: ConversationMessage[];
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
}

export type PracticeType = 'PRONUNCIATION' | 'FLUENCY' | 'GRAMMAR' | 'VOCABULARY' | 'SPEAKING';

export interface PracticeSession {
  sessionId: string;
  userId: string;
  type: PracticeType;
  target?: string;
  score?: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LearningTaskItem {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
}

export type LearningPlanStatus = 'ACTIVE' | 'COMPLETED' | 'PAUSED';

export interface LearningPlan {
  planId: string;
  userId: string;
  title: string;
  description?: string;
  goals?: string[];
  tasks?: LearningTaskItem[];
  progressPercentage?: number;
  status: LearningPlanStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProgressRecord {
  progressId: string;
  userId: string;
  date: string;
  speakingScore?: number;
  fluencyScore?: number;
  pronunciationScore?: number;
  grammarScore?: number;
  vocabularyScore?: number;
  speakingTimeSeconds?: number;
  sessionsCompleted?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AchievementRecord {
  achievementId: string;
  userId: string;
  type: string;
  title: string;
  description?: string;
  icon?: string;
  unlockedAt: string;
}

export interface NotificationRecord {
  notificationId: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export type AppointmentStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';

export interface AppointmentRecord {
  appointmentId: string;
  userId: string;
  title: string;
  description?: string;
  scheduledAt: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPlanRecord {
  planId: string;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  features?: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogRecord {
  logId: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}
