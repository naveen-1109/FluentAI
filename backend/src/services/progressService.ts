import { ProgressRepository } from '../repositories/practiceRepository';
import { AchievementRepository } from '../repositories/practiceRepository';
import { NotificationRepository, SubscriptionRepository } from '../repositories/notificationRepository';
import type { ProgressRecord, AchievementRecord, NotificationRecord, SubscriptionPlanRecord } from '../types/firestore';

export class ProgressService {
  private repo = new ProgressRepository();

  async getUserProgress(userId: string): Promise<ProgressRecord[]> {
    return await this.repo.findByUserId(userId);
  }
}

export class AchievementService {
  private repo = new AchievementRepository();

  async getUserAchievements(userId: string): Promise<AchievementRecord[]> {
    return await this.repo.findByUserId(userId);
  }
}

export class NotificationService {
  private repo = new NotificationRepository();

  async getUserNotifications(userId: string): Promise<NotificationRecord[]> {
    return await this.repo.findByUserId(userId);
  }

  async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    return await this.repo.markAsRead(notificationId, userId);
  }
}

export class SubscriptionService {
  private repo = new SubscriptionRepository();

  async getPublicSubscriptionPlans(): Promise<SubscriptionPlanRecord[]> {
    return await this.repo.findActivePlans();
  }
}
