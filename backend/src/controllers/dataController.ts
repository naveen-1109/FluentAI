import { Request, Response } from 'express';
import { 
  ProgressService, 
  AchievementService, 
  NotificationService, 
  SubscriptionService 
} from '../services/progressService';
import { sendSuccess, sendError } from '../utils/response';

const progressService = new ProgressService();
const achievementService = new AchievementService();
const notificationService = new NotificationService();
const subscriptionService = new SubscriptionService();

export async function getProgress(req: Request, res: Response) {
  if (!req.user) return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  try {
    const data = await progressService.getUserProgress(req.user.uid);
    return sendSuccess(res, 'Progress records retrieved', data);
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to retrieve progress');
  }
}

export async function getAchievements(req: Request, res: Response) {
  if (!req.user) return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  try {
    const data = await achievementService.getUserAchievements(req.user.uid);
    return sendSuccess(res, 'Achievements retrieved', data);
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to retrieve achievements');
  }
}

export async function getNotifications(req: Request, res: Response) {
  if (!req.user) return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  try {
    const data = await notificationService.getUserNotifications(req.user.uid);
    return sendSuccess(res, 'Notifications retrieved', data);
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to retrieve notifications');
  }
}

export async function markNotificationRead(req: Request, res: Response) {
  if (!req.user) return sendError(res, 'Unauthorized', 'UNAUTHORIZED', 401);
  const notificationId = Array.isArray(req.params.notificationId) ? req.params.notificationId[0] : req.params.notificationId;
  try {
    const success = await notificationService.markAsRead(notificationId, req.user.uid);
    if (!success) {
      return sendError(res, 'Notification not found or access denied', 'NOT_FOUND', 404);
    }
    return sendSuccess(res, 'Notification marked as read');
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to mark notification as read');
  }
}

export async function getSubscriptionPlans(_req: Request, res: Response) {
  try {
    const plans = await subscriptionService.getPublicSubscriptionPlans();
    return sendSuccess(res, 'Subscription plans retrieved', plans);
  } catch (err: any) {
    return sendError(res, err.message || 'Failed to retrieve subscription plans');
  }
}
