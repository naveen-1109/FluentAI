import { SpeakingSessionRepository } from '../repositories/speakingSessionRepository';
import type { SpeakingSession } from '../types/firestore';

export class SpeakingSessionService {
  private repo = new SpeakingSessionRepository();

  async createSession(userId: string, data: Partial<SpeakingSession>): Promise<SpeakingSession> {
    const now = new Date().toISOString();
    const sessionId = data.sessionId || `sess-${Date.now()}`;

    const session: SpeakingSession = {
      sessionId,
      userId, // STRICTLY DERIVED FROM VERIFIED AUTH TOKEN
      title: data.title || 'Speech Practice Attempt',
      audioKey: data.audioKey,
      audioUrl: data.audioUrl,
      originalFilename: data.originalFilename,
      mimeType: data.mimeType,
      fileSize: data.fileSize,
      durationSeconds: data.durationSeconds || 0,
      language: data.language || 'en-US',
      storageProvider: data.storageProvider || 'backblaze-b2',
      status: data.status || 'RECORDED',
      createdAt: now,
      updatedAt: now,
      uploadedAt: data.uploadedAt || now,
    };

    return await this.repo.create(session);
  }

  async getSessionById(sessionId: string, requestingUserId: string): Promise<SpeakingSession | null> {
    const session = await this.repo.findById(sessionId);
    if (!session) return null;
    
    // ENFORCE USER OWNERSHIP PRIVACY
    if (session.userId !== requestingUserId) {
      throw new Error('Forbidden: You do not have access to this speaking session');
    }

    return session;
  }

  async getUserSessions(userId: string): Promise<SpeakingSession[]> {
    return await this.repo.findByUserId(userId);
  }

  async updateSession(sessionId: string, data: Partial<SpeakingSession>): Promise<void> {
    await this.repo.update(sessionId, data);
  }
}
