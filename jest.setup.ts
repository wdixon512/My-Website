import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { auth } from '@lib/services/firebase';
import { connectAuthEmulator, getAuth, initializeAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    firestore: {
      rules: `
        service cloud.firestore {
          match /databases/{database}/documents {
            match /rooms/{roomId} {
              allow read, write: if true; // For simplicity in testing
            }
          }
        }
      `,
      host: 'localhost',
      port: 8080,
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

export const getTestFirestore = () => {
  const db = testEnv.authenticatedContext('test-user').firestore();

  connectFirestoreEmulator(db, 'localhost', 8080); // Ensure Firestore uses the emulator
  connectAuthEmulator(auth, 'http://localhost:9099'); // Ensure Auth uses the emulator
  return db;
};

export const authenticateTestUser = async () => {
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://localhost:9099');
  // await signInWithCustomToken(auth, 'test-custom-token');
  await signInAnonymously(auth);
};
