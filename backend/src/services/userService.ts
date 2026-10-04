import { UserRepository, UserDocument } from '../repositories/userRepository';

export class UserService {
  private userRepo = new UserRepository();

  async getUserProfile(uid: string, authEmail?: string): Promise<UserDocument> {
    const userDoc = await this.userRepo.findByUid(uid);
    if (userDoc) {
      return userDoc;
    }

    // Return fallback document if not created yet
    const now = new Date().toISOString();
    return {
      uid,
      email: authEmail || 'user@fluentai.app',
      displayName: 'FluentAI User',
      role: 'USER',
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };
  }
}
