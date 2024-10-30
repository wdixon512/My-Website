import { Room } from '@lib/models/dm-helper/Room';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  addDoc,
} from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { db as defaultDb, auth as defaultAuth } from './firebase';

export type DMHelperRoomService = {
  fetchUserRoom(): Promise<Room | null>;
  fetchRoom(roomId: string): Promise<Room | null>;
  createRoom(uiRoom: Room): Promise<Room>;
  updateRoom(uiRoom: Room): Promise<Room>;
};

export function createRoomService(db: Firestore = defaultDb, auth: Auth = defaultAuth): DMHelperRoomService {
  return {
    async fetchUserRoom(): Promise<Room | null> {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
      }

      const ownerUID = user.uid;
      const roomsRef = collection(db, 'rooms');
      const roomQuery = query(roomsRef, where('ownerUID', '==', ownerUID));
      const querySnapshot = await getDocs(roomQuery);

      if (!querySnapshot.empty) {
        const roomData = querySnapshot.docs[0].data();
        return roomData as Room;
      }

      return null;
    },

    async fetchRoom(roomId: string): Promise<Room | null> {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnapshot = await getDoc(roomRef);
      return roomSnapshot.exists() ? (roomSnapshot.data() as Room) : null;
    },

    async createRoom(uiRoom: Room): Promise<Room> {
      if (uiRoom.id) {
        console.warn(
          'Room ID is generated automatically by this function and should not be provided. The provided ID will be ignored.'
        );
      }

      uiRoom.ownerUID = auth.currentUser.uid;

      const roomsRef = collection(db, 'rooms');
      const newRoomRef = await addDoc(roomsRef, uiRoom); // Automatically generates a unique ID

      return { id: newRoomRef.id, ...uiRoom };
    },

    async updateRoom(uiRoom: Room): Promise<Room> {
      const roomRef = doc(db, 'rooms', uiRoom.id);
      await updateDoc(roomRef, { ...uiRoom });
      return uiRoom;
    },
  };
}
