import { Room } from '@lib/models/dm-helper/Room';
import { Firestore, collection, query, where, doc, getDoc, setDoc, updateDoc, getDocs } from 'firebase/firestore';
import { Auth } from 'firebase/auth';
import { db as defaultDb, auth as defaultAuth } from './firebase';

export type RoomService = {
  fetchUserRoom(): Promise<Room | null>;
  fetchRoom(roomCode: string): Promise<Room | null>;
  createRoom(uiRoom: Room): Promise<Room>;
  updateRoom(uiRoom: Room): Promise<Room>;
};

export function createRoomService(db: Firestore = defaultDb, auth: Auth = defaultAuth): RoomService {
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

    async fetchRoom(roomCode: string): Promise<Room | null> {
      const roomRef = doc(db, 'rooms', roomCode);
      const roomSnapshot = await getDoc(roomRef);
      return roomSnapshot.exists() ? (roomSnapshot.data() as Room) : null;
    },

    async createRoom(uiRoom: Room): Promise<Room> {
      const roomRef = doc(db, 'rooms', uiRoom.code);
      await setDoc(roomRef, uiRoom);
      return uiRoom;
    },

    async updateRoom(uiRoom: Room): Promise<Room> {
      const roomRef = doc(db, 'rooms', uiRoom.code);
      await updateDoc(roomRef, uiRoom);
      return uiRoom;
    },
  };
}
