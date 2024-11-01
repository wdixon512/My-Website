import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { cypressIsTesting } from '@lib/util/cypress-utils';

let firebaseApp;

if (!getApps().length) {
  firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_RTDB_URL,
  });
}

// Export Firestore, RTDB, and Auth instances
export const db = getFirestore(firebaseApp);
export const rtdb = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);

export const signInWithGoogle = async () => {
  if (cypressIsTesting()) {
    console.log('Cypress is testing, skipping sign in with Google, but will delay for 1 second.');
    return await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  if (!auth.currentUser) {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }
};
