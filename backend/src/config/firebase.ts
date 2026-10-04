import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { config } from './env';

const hasCert = Boolean(config.firebase.clientEmail && config.firebase.privateKey);

const app = !getApps().length
  ? hasCert
    ? initializeApp({
        credential: cert({
          projectId: config.firebase.projectId,
          clientEmail: config.firebase.clientEmail,
          privateKey: config.firebase.privateKey,
        }),
      })
    : initializeApp({
        projectId: config.firebase.projectId,
      })
  : getApps()[0];

export const adminAuth = getAuth(app);

let dbInstance: Firestore | null = null;
try {
  if (hasCert) {
    dbInstance = getFirestore(app);
  }
} catch (err) {
  console.warn("Firestore Admin init warning (using offline fallback mode):", err);
}

export const adminDb = dbInstance;
export default app;
