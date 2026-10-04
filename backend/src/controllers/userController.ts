import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { sendSuccess, sendError } from '../utils/response';

const userService = new UserService();

export async function getMe(req: Request, res: Response) {
  if (!req.user) {
    return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  }

  try {
    const profile = await userService.getUserProfile(req.user.uid, req.user.email);
    return sendSuccess(res, 'User profile retrieved successfully', profile);
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to retrieve profile');
  }
}

export function notImplemented(_req: Request, res: Response) {
  return sendSuccess(res, 'Endpoint not implemented in Phase 2', { status: 'PLANNED' });
}
