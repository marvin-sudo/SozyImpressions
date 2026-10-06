import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// In web preview / iframe environments, force long polling to prevent WebChannel stream
// drops and "FirebaseError: [code=unavailable]: The operation could not be completed".
let dbInstance;
if (typeof window !== 'undefined') {
  try {
    dbInstance = initializeFirestore(app, {
      experimentalForceLongPolling: true,
    }, firebaseConfig.firestoreDatabaseId);
  } catch {
    dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
} else {
  dbInstance = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export const db = dbInstance;
export const auth = getAuth(app);


