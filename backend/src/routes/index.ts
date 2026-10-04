import { Router } from 'express';
import { getHealth } from '../controllers/healthController';
import { getMe, notImplemented } from '../controllers/userController';
import { 
  createSession, 
  getSessions, 
  getSessionById 
} from '../controllers/speakingSessionController';
import { 
  getProgress, 
  getAchievements, 
  getNotifications, 
  markNotificationRead, 
  getSubscriptionPlans 
} from '../controllers/dataController';
import { 
  uploadAudio, 
  getSignedUrl 
} from '../controllers/storageController';
import { transcribeSessionAudio } from '../controllers/speechController';
import { authMiddleware } from '../middleware/authMiddleware';
import { uploadSingleAudio } from '../middleware/uploadMiddleware';

const router = Router();

// Public Health & Subscription Endpoints
router.get('/health', getHealth);
router.get('/subscription-plans', getSubscriptionPlans);

// Authenticated User Profile Endpoints
router.get('/auth/me', authMiddleware, getMe);
router.get('/users/me', authMiddleware, getMe);

// Speaking Session Endpoints
router.get('/speaking-sessions', authMiddleware, getSessions);
router.post('/speaking-sessions', authMiddleware, createSession);
router.get('/speaking-sessions/:sessionId', authMiddleware, getSessionById);

// Backblaze B2 Private Cloud Storage Endpoints
router.post('/storage/upload-audio', authMiddleware, uploadSingleAudio, uploadAudio);
router.get('/storage/signed-url/:sessionId', authMiddleware, getSignedUrl);

// AI Speech-to-Text Transcription Endpoints
router.post('/speech/transcribe/:sessionId', authMiddleware, transcribeSessionAudio);

// Progress & Analytics Endpoints
router.get('/progress', authMiddleware, getProgress);
router.get('/achievements', authMiddleware, getAchievements);

// Notifications Endpoints
router.get('/notifications', authMiddleware, getNotifications);
router.patch('/notifications/:notificationId/read', authMiddleware, markNotificationRead);

// Placeholder endpoints reserved for future phases
router.all('/interviews*', authMiddleware, notImplemented);
router.all('/practice*', authMiddleware, notImplemented);

export default router;
