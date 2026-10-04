import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { User as AppUser } from '../types';

export interface FirestoreUserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'USER' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Creates the user profile document in Firestore: users/{uid}
 * Strict Rule: role is ALWAYS hardcoded to "USER" on registration.
 */
export async function createUserFirestoreDoc(firebaseUser: FirebaseUser, displayName: string): Promise<AppUser> {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const now = new Date().toISOString();

  const userDoc: FirestoreUserProfile = {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: displayName || firebaseUser.displayName || 'FluentAI User',
    role: 'USER', // FORCED DEFAULT ROLE
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };

  try {
    await setDoc(userRef, userDoc);
  } catch (err) {
    console.warn("Firestore document write warning (check Firebase rules / config):", err);
  }

  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: displayName || firebaseUser.displayName || 'FluentAI User',
    role: 'user',
    subscriptionTier: 'pro',
    streakCount: 1,
    totalSessions: 0,
    avgFluency: 85,
    targetGoal: 'Improve speech fluency & reduce block frequency',
    joinedDate: now.slice(0, 10),
  };
}

/**
 * Fetches user profile document from Firestore: users/{uid}
 */
export async function fetchUserFirestoreDoc(firebaseUser: FirebaseUser): Promise<AppUser> {
  const userRef = doc(db, 'users', firebaseUser.uid);
  
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data() as FirestoreUserProfile;
      return {
        id: data.uid,
        email: data.email,
        name: data.displayName || 'FluentAI User',
        role: data.role === 'ADMIN' ? 'admin' : 'user',
        subscriptionTier: 'pro',
        streakCount: 3,
        totalSessions: 12,
        avgFluency: 88,
        targetGoal: 'Improve speech fluency & reduce block frequency',
        joinedDate: data.createdAt ? data.createdAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
      };
    }
  } catch (err) {
    console.warn("Could not fetch Firestore user profile, creating default fallback:", err);
  }

  // Fallback if doc does not exist yet
  return createUserFirestoreDoc(firebaseUser, firebaseUser.displayName || 'FluentAI User');
}

/**
 * Firebase Registration Handler
 */
export async function registerWithFirebase(email: string, pass: string, name: string): Promise<AppUser> {
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  await updateProfile(userCredential.user, { displayName: name });
  return await createUserFirestoreDoc(userCredential.user, name);
}

/**
 * Firebase Login Handler
 */
export async function loginWithFirebase(email: string, pass: string): Promise<AppUser> {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return await fetchUserFirestoreDoc(userCredential.user);
}

/**
 * Firebase Logout Handler
 */
export async function logoutWithFirebase(): Promise<void> {
  await signOut(auth);
}

/**
 * Password Reset Handler
 */
export async function resetFirebasePassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}
