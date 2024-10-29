import { initializeTestEnvironment, RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { connectFirestoreEmulator, Firestore } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;
let db: Firestore;
// let auth;

export const getTestFirestore = () => db;
// export const getTestAuth = () => auth;

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

  const context = testEnv.authenticatedContext('test-user');

  // Yikes...
  db = context.firestore() as unknown as Firestore;
  // auth = context.auth();

  connectFirestoreEmulator(db, 'localhost', 8080);
  // connectAuthEmulator(auth, 'http://localhost:9099');

  db = getTestFirestore();
  // auth = await getTestAuth();
});

afterAll(async () => {
  await testEnv.cleanup();
});

// const getTestFirestore = () => {
//   const db = testEnv.authenticatedContext('test-user').firestore();
//   connectFirestoreEmulator(db, 'localhost', 8080); // Ensure Firestore uses the emulator
//   return db;
// };

// const getTestAuth = async () => {
//   const auth = getAuth();
//   connectAuthEmulator(auth, 'http://localhost:9099');
//   await signInWithCustomToken(auth, '6lxDe6pWChlUsjbVYAAfVcwp5SmD');
//   return auth;
// };
