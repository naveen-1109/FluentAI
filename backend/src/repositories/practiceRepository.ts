import { adminDb } from '../config/firebase';
import type { 
  PracticeSession, 
  LearningPlan, 
  ProgressRecord, 
  AchievementRecord 
} from '../types/firestore';

export class PracticeRepository {
  private collection = 'practiceSessions';

  async create(session: PracticeSession): Promise<PracticeSession> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(session.sessionId).set(session);
    }
    return session;
  }

  async findByUserId(userId: string): Promise<PracticeSession[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((doc) => doc.data() as PracticeSession);
  }
}

export class LearningPlanRepository {
  private collection = 'learningPlans';

  async create(plan: LearningPlan): Promise<LearningPlan> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(plan.planId).set(plan);
    }
    return plan;
  }

  async findByUserId(userId: string): Promise<LearningPlan[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('userId', '==', userId)
      .get();
    return snap.docs.map((doc) => doc.data() as LearningPlan);
  }
}

export class ProgressRepository {
  private collection = 'progress';

  async create(record: ProgressRecord): Promise<ProgressRecord> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(record.progressId).set(record);
    }
    return record;
  }

  async findByUserId(userId: string): Promise<ProgressRecord[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .get();
    return snap.docs.map((doc) => doc.data() as ProgressRecord);
  }
}

export class AchievementRepository {
  private collection = 'achievements';

  async create(achievement: AchievementRecord): Promise<AchievementRecord> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(achievement.achievementId).set(achievement);
    }
    return achievement;
  }

  async findByUserId(userId: string): Promise<AchievementRecord[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('userId', '==', userId)
      .get();
    return snap.docs.map((doc) => doc.data() as AchievementRecord);
  }
}
