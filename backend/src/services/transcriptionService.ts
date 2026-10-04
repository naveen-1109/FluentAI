import { B2StorageService } from './b2StorageService';
import { SpeakingSessionService } from './speakingSessionService';
import { SpeechAnalysisRepository } from '../repositories/speakingSessionRepository';
import { config } from '../config/env';
import type { SpeechAnalysis, SpeechSegment } from '../types/firestore';

export class TranscriptionService {
  private storageService = new B2StorageService();
  private speakingSessionService = new SpeakingSessionService();
  private speechAnalysisRepo = new SpeechAnalysisRepository();

  async transcribeSessionAudio(sessionId: string, userId: string): Promise<SpeechAnalysis> {
    // 1. Fetch speaking session & enforce ownership privacy
    const session = await this.speakingSessionService.getSessionById(sessionId, userId);
    if (!session) {
      throw new Error(`Speaking session not found: ${sessionId}`);
    }

    if (session.userId !== userId) {
      throw new Error(`Forbidden: You do not have access to speaking session ${sessionId}`);
    }

    // 2. Derive permanent audioKey in Backblaze B2
    const audioKey = session.audioKey || this.storageService.getAudioKey(userId, sessionId, session.originalFilename || 'recording.webm');

    // 3. Download audio buffer securely from private Backblaze B2 bucket
    const audioBuffer = await this.storageService.getAudioObjectBuffer(audioKey);

    // 4. Update session transcription status to processing
    await this.speakingSessionService.updateSession(sessionId, {
      transcriptionStatus: 'processing',
    });

    // 5. Package audio into FormData for Python FastAPI AI service
    const filename = session.originalFilename || (session.mimeType?.includes('wav') ? 'recording.wav' : 'recording.webm');
    const mimeType = session.mimeType || 'audio/webm';
    const audioBlob = new Blob([new Uint8Array(audioBuffer)], { type: mimeType });

    const formData = new FormData();
    formData.append('audio', audioBlob, filename);

    // 6. Send audio bytes to FastAPI STT service
    const aiEndpoint = `${config.aiServiceUrl}/api/v1/transcribe`;
    let response: Response;
    try {
      response = await fetch(aiEndpoint, {
        method: 'POST',
        body: formData,
      });
    } catch (fetchErr: any) {
      await this.speakingSessionService.updateSession(sessionId, { transcriptionStatus: 'failed' });
      console.error(`[TRANSCRIPTION FAILED] AI service unreachable at ${aiEndpoint}:`, fetchErr?.message || fetchErr);
      throw new Error(`AI transcription service unavailable: ${fetchErr?.message || 'Connection refused'}`);
    }

    if (!response.ok) {
      await this.speakingSessionService.updateSession(sessionId, { transcriptionStatus: 'failed' });
      const errText = await response.text().catch(() => 'Unknown error');
      console.error(`[TRANSCRIPTION FAILED] AI service returned status ${response.status}:`, errText);
      throw new Error(`AI transcription engine failed with HTTP ${response.status}: ${errText}`);
    }

    const aiResult = await response.json();
    if (!aiResult || !aiResult.success) {
      await this.speakingSessionService.updateSession(sessionId, { transcriptionStatus: 'failed' });
      throw new Error(aiResult?.error || 'AI transcription failed to generate transcript');
    }

    // 7. Construct structured SpeechAnalysis document for Firestore
    const analysisId = `analysis-${Date.now()}`;
    const now = new Date().toISOString();
    const segments: SpeechSegment[] = (aiResult.segments || []).map((seg: any) => ({
      start: Number(seg.start || 0),
      end: Number(seg.end || 0),
      text: String(seg.text || '').trim(),
    }));

    const analysis: SpeechAnalysis = {
      analysisId,
      sessionId,
      userId,
      type: 'speech_to_text',
      status: 'completed',
      transcript: aiResult.transcript || '',
      transcription: aiResult.transcript || '',
      language: aiResult.language || 'en',
      durationSeconds: Number(aiResult.durationSeconds || session.durationSeconds || 0),
      segments,
      createdAt: now,
      updatedAt: now,
    };

    // 8. Store transcript record in Firestore speechAnalyses collection
    await this.speechAnalysisRepo.create(analysis);

    // 9. Update speakingSessions collection reference
    await this.speakingSessionService.updateSession(sessionId, {
      transcriptionStatus: 'completed',
      transcriptAnalysisId: analysisId,
    });

    // 10. Safe development logging (no binary audio or credentials logged)
    console.log(`[TRANSCRIPTION]
Session ID: ${sessionId}
Firebase UID: ${userId}
Audio key: ${audioKey}
Audio size: ${audioBuffer.length} bytes
AI service: ${config.aiServiceUrl}
Transcription completed
Language: ${analysis.language}
Duration: ${analysis.durationSeconds}s`);

    return analysis;
  }
}
