import { Room } from '@lib/models/dm-helper/Room';
import { collection, query, where, doc, getDoc, setDoc, updateDoc, getDocs } from 'firebase/firestore';
import { db, auth } from './firebase';

export async function fetchUserRoom(): Promise<Room | null> {
  // Get the authenticated user's UID
  const user = auth.currentUser;
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const ownerUID = user.uid;

  // Query Firestore for rooms where ownerUID matches the user's UID
  const roomsRef = collection(db, 'rooms');
  const roomQuery = query(roomsRef, where('ownerUID', '==', ownerUID));
  const querySnapshot = await getDocs(roomQuery);

  // Return the first matching room, or null if none found
  if (!querySnapshot.empty) {
    const roomData = querySnapshot.docs[0].data();
    return roomData as Room;
  }

  return null;
}

export async function fetchRoom(roomCode: string): Promise<Room | null> {
  const roomRef = doc(db, 'rooms', roomCode);
  const roomSnapshot = await getDoc(roomRef);
  return roomSnapshot.exists() ? (roomSnapshot.data() as Room) : null;
}

export async function createRoom(uiRoom: Room): Promise<Room> {
  const roomRef = doc(db, 'rooms', uiRoom.code);
  await setDoc(roomRef, uiRoom);
  return uiRoom;
}

export async function updateRoom(uiRoom: Room): Promise<Room> {
  const roomRef = doc(db, 'rooms', uiRoom.code);

  // Update the existing room in Firestore
  await updateDoc(roomRef, uiRoom);

  return uiRoom;
}
