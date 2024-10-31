import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Room } from '../../lib/models/dm-helper/Room';
import { createRoomService } from '../../lib/services/dm-helper-room-service';
import { getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';

// Register plugin tasks
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    async getRoomFromFirebase(): Promise<Room> {
      return await getRoomFromFirebase();
    },
  });
};

// Function to get the room from Firebase
async function getRoomFromFirebase(): Promise<Room> {
  let firebaseApp;

  if (!getApps().length) {
    firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    });
  }

  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const roomsRef = collection(db, 'rooms');
  const roomQuery = query(roomsRef, where('ownerUID', '==', auth.currentUser.uid));
  const querySnapshot = await getDocs(roomQuery);

  if (!querySnapshot.empty) {
    const roomData = querySnapshot.docs[0].data();
    return roomData as Room;
  }

  return null;
}
