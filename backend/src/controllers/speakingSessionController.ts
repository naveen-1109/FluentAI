import { Request, Response } from 'express';
import { SpeakingSessionService } from '../services/speakingSessionService';
import { validateSpeakingSessionPayload } from '../validators';
import { sendSuccess, sendError } from '../utils/response';

const sessionService = new SpeakingSessionService();

export async function createSession(req: Request, res: Response) {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  }

  const validation = validateSpeakingSessionPayload(req.body);
  if (!validation.valid) {
    return sendError(res, validation.error || 'Invalid request payload', 'VALIDATION_ERROR', 400);
  }

  try {
    const session = await sessionService.createSession(req.user.uid, req.body);
    return sendSuccess(res, 'Speaking session created successfully', session, 201);
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to create speaking session');
  }
}

export async function getSessions(req: Request, res: Response) {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  }

  try {
    const sessions = await sessionService.getUserSessions(req.user.uid);
    return sendSuccess(res, 'User speaking sessions retrieved successfully', sessions);
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to retrieve speaking sessions');
  }
}

export async function getSessionById(req: Request, res: Response) {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  }

  const sessionId = Array.isArray(req.params.sessionId) ? req.params.sessionId[0] : req.params.sessionId;

  try {
    const session = await sessionService.getSessionById(sessionId, req.user.uid);
    if (!session) {
      return sendError(res, 'Speaking session not found', 'NOT_FOUND', 404);
    }
    return sendSuccess(res, 'Speaking session retrieved', session);
  } catch (err: any) {
    const statusCode = err.message.includes('Forbidden') ? 403 : 500;
    return sendError(res, err.message, statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR', statusCode);
  }
}
