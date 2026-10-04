import { adminDb } from '../config/firebase';
import type { InterviewSession, InterviewQuestion, ConversationSession } from '../types/firestore';

export class InterviewRepository {
  private sessionsCollection = 'interviewSessions';
  private questionsCollection = 'interviewQuestions';

  async createSession(session: InterviewSession): Promise<InterviewSession> {
    if (adminDb) {
      await adminDb.collection(this.sessionsCollection).doc(session.sessionId).set(session);
    }
    return session;
  }

  async findSessionById(sessionId: string): Promise<InterviewSession | null> {
    if (!adminDb) return null;
    const snap = await adminDb.collection(this.sessionsCollection).doc(sessionId).get();
    return snap.exists ? (snap.data() as InterviewSession) : null;
  }

  async createQuestion(question: InterviewQuestion): Promise<InterviewQuestion> {
    if (adminDb) {
      await adminDb.collection(this.questionsCollection).doc(question.questionId).set(question);
    }
    return question;
  }

  async findQuestionsBySessionId(sessionId: string): Promise<InterviewQuestion[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.questionsCollection)
      .where('sessionId', '==', sessionId)
      .orderBy('order', 'asc')
      .get();
    return snap.docs.map((doc) => doc.data() as InterviewQuestion);
  }
}

export class ConversationRepository {
  private collection = 'conversationSessions';

  async create(session: ConversationSession): Promise<ConversationSession> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(session.sessionId).set(session);
    }
    return session;
  }

  async findById(sessionId: string): Promise<ConversationSession | null> {
    if (!adminDb) return null;
    const snap = await adminDb.collection(this.collection).doc(sessionId).get();
    return snap.exists ? (snap.data() as ConversationSession) : null;
  }

  async findByUserId(userId: string): Promise<ConversationSession[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((doc) => doc.data() as ConversationSession);
  }
}
