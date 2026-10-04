import { adminDb } from '../config/firebase';

export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class UserRepository {
  async findByUid(uid: string): Promise<UserDocument | null> {
    if (!adminDb) {
      return null;
    }
    try {
      const snap = await adminDb.collection('users').doc(uid).get();
      if (snap.exists) {
        return snap.data() as UserDocument;
      }
    } catch (err) {
      console.warn("Firestore UserRepository lookup warning:", err);
    }

    return null;
  }
}
