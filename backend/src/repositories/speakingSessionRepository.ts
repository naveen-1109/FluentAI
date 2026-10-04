import { adminDb } from '../config/firebase';
import type { SpeakingSession, SpeechAnalysis } from '../types/firestore';

const memorySessionsMap = new Map<string, SpeakingSession>();

export class SpeakingSessionRepository {
  private collection = 'speakingSessions';

  async create(session: SpeakingSession): Promise<SpeakingSession> {
    memorySessionsMap.set(session.sessionId, session);
    if (adminDb) {
      try {
        await adminDb.collection(this.collection).doc(session.sessionId).set(session);
      } catch (err) {
        console.warn("Firestore save warning:", err);
      }
    }
    return session;
  }

  async findById(sessionId: string): Promise<SpeakingSession | null> {
    if (adminDb) {
      try {
        const snap = await adminDb.collection(this.collection).doc(sessionId).get();
        if (snap.exists) {
          return snap.data() as SpeakingSession;
        }
      } catch (err) {
        console.warn("Firestore findById warning:", err);
      }
    }
    return memorySessionsMap.get(sessionId) || null;
  }

  async findByUserId(userId: string): Promise<SpeakingSession[]> {
    if (adminDb) {
      try {
        const snap = await adminDb
          .collection(this.collection)
          .where('userId', '==', userId)
          .orderBy('createdAt', 'desc')
          .get();
        if (!snap.empty) {
          return snap.docs.map((doc) => doc.data() as SpeakingSession);
        }
      } catch (err) {
        console.warn("Firestore findByUserId warning:", err);
      }
    }
    
    return Array.from(memorySessionsMap.values())
      .filter((s) => s.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async update(sessionId: string, data: Partial<SpeakingSession>): Promise<void> {
    const existing = memorySessionsMap.get(sessionId);
    if (existing) {
      memorySessionsMap.set(sessionId, { ...existing, ...data, updatedAt: new Date().toISOString() });
    }
    if (adminDb) {
      try {
        await adminDb.collection(this.collection).doc(sessionId).update({
          ...data,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn("Firestore update session warning:", err);
      }
    }
  }
}

export class SpeechAnalysisRepository {
  private collection = 'speechAnalyses';

  async create(analysis: SpeechAnalysis): Promise<SpeechAnalysis> {
    if (adminDb) {
      try {
        await adminDb.collection(this.collection).doc(analysis.analysisId).set(analysis);
      } catch (err) {
        console.warn("Firestore SpeechAnalysis save warning:", err);
      }
    }
    return analysis;
  }

  async findBySessionId(sessionId: string): Promise<SpeechAnalysis | null> {
    if (!adminDb) return null;
    try {
      const snap = await adminDb
        .collection(this.collection)
        .where('sessionId', '==', sessionId)
        .limit(1)
        .get();
      return snap.empty ? null : (snap.docs[0].data() as SpeechAnalysis);
    } catch (err) {
      console.warn("Firestore findBySessionId warning:", err);
      return null;
    }
  }
}
