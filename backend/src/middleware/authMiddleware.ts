import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../config/firebase';
import { sendError } from '../utils/response';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Unauthorized: Missing or malformed token header', 'UNAUTHORIZED', 401);
  }

  const idToken = authHeader.split('Bearer ')[1]?.trim();

  if (!idToken) {
    return sendError(res, 'Unauthorized: Empty bearer token', 'UNAUTHORIZED', 401);
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: (decodedToken.role as string) || 'USER',
      token: decodedToken,
    };
    return next();
  } catch (err: any) {
    console.warn("Auth Middleware ID token verification error:", err?.message || err);
    return sendError(res, 'Unauthorized: Invalid or expired Firebase ID token', 'UNAUTHORIZED', 401);
  }
}

