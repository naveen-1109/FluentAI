import { Request, Response } from 'express';
import { TranscriptionService } from '../services/transcriptionService';
import { sendSuccess, sendError } from '../utils/response';

const transcriptionService = new TranscriptionService();

export async function transcribeSessionAudio(req: Request, res: Response) {
  if (!req.user) {
    return sendError(res, 'Unauthorized: Firebase ID token verification required', 'UNAUTHORIZED', 401);
  }

  const sessionId = Array.isArray(req.params.sessionId) ? req.params.sessionId[0] : req.params.sessionId;

  if (!sessionId) {
    return sendError(res, 'Missing required sessionId parameter', 'VALIDATION_ERROR', 400);
  }

  try {
    const analysis = await transcriptionService.transcribeSessionAudio(sessionId, req.user.uid);

    return sendSuccess(res, 'Speech transcribed successfully', {
      analysisId: analysis.analysisId,
      sessionId: analysis.sessionId,
      userId: analysis.userId,
      type: analysis.type,
      status: analysis.status,
      transcript: analysis.transcript,
      language: analysis.language,
      durationSeconds: analysis.durationSeconds,
      segments: analysis.segments,
      createdAt: analysis.createdAt,
    }, 200);

  } catch (err: any) {
    const message = err?.message || 'Failed to process speech-to-text transcription';
    console.error(`[SPEECH CONTROLLER ERROR] Session ID "${sessionId}":`, message);

    if (message.includes('Forbidden')) {
      return sendError(res, message, 'FORBIDDEN', 403);
    }
    if (message.includes('not found')) {
      return sendError(res, message, 'NOT_FOUND', 404);
    }
    if (message.includes('unavailable') || message.includes('failed')) {
      return sendError(res, message, 'AI_SERVICE_ERROR', 503);
    }

    return sendError(res, message, 'TRANSCRIPTION_ERROR', 500);
  }
}
