import { Request, Response } from 'express';
import { B2StorageService } from '../services/b2StorageService';
import { SpeakingSessionService } from '../services/speakingSessionService';
import { sendSuccess, sendError } from '../utils/response';

const storageService = new B2StorageService();
const speakingSessionService = new SpeakingSessionService();

export async function uploadAudio(req: Request, res: Response) {
  console.log(`[STORAGE UPLOAD] Request received`);
  console.log(`[STORAGE UPLOAD] Content-Type: ${req.headers['content-type'] || 'N/A'}`);
  console.log(`[STORAGE UPLOAD] Content-Length: ${req.headers['content-length'] || 'N/A'}`);

  if (!req.user) {
    return sendError(res, 'Unauthorized: Firebase ID token verification required', 'UNAUTHORIZED', 401);
  }

  const file = req.file;
  const sessionId = req.body?.sessionId || (req.query?.sessionId as string);
  const durationSeconds = Number(req.body?.durationSeconds || 0);
  const title = req.body?.title;
  const originalFilename = req.body?.originalFilename;
  const mimeType = req.body?.mimeType;

  if (!sessionId) {
    console.warn(`[STORAGE UPLOAD] Validation failed: Missing sessionId for UID: ${req.user.uid}`);
    return sendError(res, 'Missing required sessionId parameter', 'VALIDATION_ERROR', 400);
  }

  let buffer: Buffer;
  let filename: string;
  let contentType: string;

  if (file && file.buffer && file.buffer.length > 0) {
    buffer = file.buffer;
    filename = file.originalname || originalFilename || 'recording.webm';
    contentType = file.mimetype || mimeType || 'audio/webm';
    console.log(`[STORAGE UPLOAD] File received via multipart/form-data: "${filename}"`);
  } else if (req.body?.audioBase64) {
    const cleanBase64 = req.body.audioBase64.replace(/^data:audio\/\w+;base64,/, '');
    buffer = Buffer.from(cleanBase64, 'base64');
    filename = originalFilename || 'recording.webm';
    contentType = mimeType || 'audio/webm';
    console.log(`[STORAGE UPLOAD] Payload received via Base64 JSON: "${filename}"`);
  } else {
    console.warn(`[STORAGE UPLOAD] Validation failed: Missing audio file/payload for sessionId: ${sessionId}`);
    return sendError(res, 'Missing required audio file payload', 'VALIDATION_ERROR', 400);
  }

  console.log(`[STORAGE UPLOAD] File size: ${buffer.length} bytes (${(buffer.length / 1024).toFixed(2)} KB)`);
  console.log(`[STORAGE UPLOAD] MIME: "${contentType}"`);
  console.log(`[STORAGE UPLOAD] Authenticated Firebase UID: "${req.user.uid}", sessionId: "${sessionId}"`);

  try {
    // 1. Upload private object to Backblaze B2: audio/{uid}/{sessionId}/recording.webm
    const b2Result = await storageService.uploadAudioBuffer(
      req.user.uid,
      sessionId,
      buffer,
      contentType,
      filename
    );

    console.log(`[STORAGE UPLOAD] Backblaze B2 upload success - Key: "${b2Result.key}", Bucket: "${b2Result.bucket}", Size: ${b2Result.size} bytes`);

    // 2. Generate temporary pre-signed GET playback URL for authenticated user
    const presignedUrl = await storageService.getSignedPlaybackUrlFromKey(b2Result.key, 3600);

    // 3. Save session & audio metadata in Cloud Firestore under speakingSessions/{sessionId}
    const sessionDoc = await speakingSessionService.createSession(req.user.uid, {
      sessionId,
      userId: req.user.uid, // DERIVED STRICTLY FROM VERIFIED FIREBASE ID TOKEN
      title: title || 'Speech Recording Attempt',
      audioKey: b2Result.key,
      audioUrl: presignedUrl,
      originalFilename: filename,
      mimeType: b2Result.contentType,
      fileSize: b2Result.size,
      durationSeconds: durationSeconds || 0,
      language: req.body?.language || 'en-US',
      storageProvider: 'backblaze-b2',
      status: 'RECORDED',
      uploadedAt: new Date().toISOString(),
    });

    console.log(`[STORAGE UPLOAD] Firestore session record created - ID: "${sessionDoc.sessionId}", audioKey: "${sessionDoc.audioKey}"`);

    return sendSuccess(res, 'Audio recording uploaded and stored in Backblaze B2 successfully', {
      session: sessionDoc,
      audioKey: b2Result.key,
      signedUrl: presignedUrl,
      storageProvider: 'backblaze-b2',
    }, 201);

  } catch (err: any) {
    console.error(`[STORAGE UPLOAD FAILED] Error processing sessionId "${sessionId}":`, err?.message || err);
    const statusCode = err.message?.includes('exceeds maximum') || err.message?.includes('Unsupported audio') ? 400 : 500;
    return sendError(res, err.message || 'Failed to process and store audio recording', 'UPLOAD_ERROR', statusCode);
  }
}

export async function getSignedUrl(req: Request, res: Response) {
  if (!req.user) {
    return sendError(res, 'Unauthorized: Firebase ID token verification required', 'UNAUTHORIZED', 401);
  }

  const sessionId = Array.isArray(req.params.sessionId) ? req.params.sessionId[0] : req.params.sessionId;

  if (!sessionId) {
    return sendError(res, 'Missing required sessionId parameter', 'VALIDATION_ERROR', 400);
  }

  try {
    const session = await speakingSessionService.getSessionById(sessionId, req.user.uid);
    if (!session) {
      return sendError(res, 'Speaking session not found or unauthorized access', 'NOT_FOUND', 404);
    }

    // Verify authenticated user is session owner
    if (session.userId !== req.user.uid) {
      return sendError(res, 'Forbidden: You do not have access to this speaking session audio', 'FORBIDDEN', 403);
    }

    // Read audioKey as permanent source of truth
    const audioKey = session.audioKey || storageService.getAudioKey(req.user.uid, sessionId, session.originalFilename || 'recording.webm');
    
    // Generate fresh temporary pre-signed URL (1-hour expiry)
    const signedUrl = await storageService.getSignedPlaybackUrlFromKey(audioKey, 3600);

    return sendSuccess(res, 'Fresh temporary pre-signed playback URL generated', {
      sessionId,
      audioKey,
      signedUrl,
      expiresInSeconds: 3600,
    });
  } catch (err: any) {
    const statusCode = err.message?.includes('Forbidden') ? 403 : 500;
    return sendError(res, err.message || 'Failed to generate pre-signed playback URL', statusCode === 403 ? 'FORBIDDEN' : 'INTERNAL_ERROR', statusCode);
  }
}
