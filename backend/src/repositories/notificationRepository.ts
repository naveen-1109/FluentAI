import { adminDb } from '../config/firebase';
import type { 
  NotificationRecord, 
  AppointmentRecord, 
  SubscriptionPlanRecord, 
  AuditLogRecord 
} from '../types/firestore';

export class NotificationRepository {
  private collection = 'notifications';

  async create(notification: NotificationRecord): Promise<NotificationRecord> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(notification.notificationId).set(notification);
    }
    return notification;
  }

  async findByUserId(userId: string): Promise<NotificationRecord[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map((doc) => doc.data() as NotificationRecord);
  }

  async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    if (!adminDb) return false;
    const ref = adminDb.collection(this.collection).doc(notificationId);
    const doc = await ref.get();
    if (!doc.exists) return false;
    const data = doc.data() as NotificationRecord;
    if (data.userId !== userId) return false;
    await ref.update({ read: true });
    return true;
  }
}

export class AppointmentRepository {
  private collection = 'appointments';

  async create(appointment: AppointmentRecord): Promise<AppointmentRecord> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(appointment.appointmentId).set(appointment);
    }
    return appointment;
  }

  async findByUserId(userId: string): Promise<AppointmentRecord[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('userId', '==', userId)
      .get();
    return snap.docs.map((doc) => doc.data() as AppointmentRecord);
  }
}

export class SubscriptionRepository {
  private collection = 'subscriptionPlans';

  async findActivePlans(): Promise<SubscriptionPlanRecord[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .where('active', '==', true)
      .get();
    return snap.docs.map((doc) => doc.data() as SubscriptionPlanRecord);
  }

  async createPlan(plan: SubscriptionPlanRecord): Promise<SubscriptionPlanRecord> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(plan.planId).set(plan);
    }
    return plan;
  }
}

export class AuditLogRepository {
  private collection = 'auditLogs';

  async createLog(log: AuditLogRecord): Promise<AuditLogRecord> {
    if (adminDb) {
      await adminDb.collection(this.collection).doc(log.logId).set(log);
    }
    return log;
  }

  async findAll(limit: number = 50): Promise<AuditLogRecord[]> {
    if (!adminDb) return [];
    const snap = await adminDb
      .collection(this.collection)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    return snap.docs.map((doc) => doc.data() as AuditLogRecord);
  }
}
