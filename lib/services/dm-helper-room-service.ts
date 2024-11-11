import { Room } from '@lib/models/dm-helper/Room';
import { Firestore, collection, doc, getDoc, updateDoc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { Auth, User } from 'firebase/auth';
import { db as defaultDb, auth as defaultAuth } from './firebase';
import { useToast } from '@chakra-ui/react';

export type DMHelperRoomService = {
  fetchUserRoom(): Promise<Room | null>;
  fetchRoom(roomId: string): Promise<Room | null>;
  createRoom(uiRoom: Room): Promise<Room>;
  updateRoom(uiRoom: Room): Promise<Room>;
};

export function createRoomService(db: Firestore = defaultDb, auth: Auth = defaultAuth): DMHelperRoomService {
  // TODO: Implement retry policies for all methods!
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
      // If, for whatever reason, uiRoom is null, create a new room with the current user as the owner.
      if (!uiRoom && auth.currentUser.uid) {
        uiRoom = {
          ...uiRoom,
          ownerUID: auth.currentUser.uid,
        };
      }

      if (uiRoom?.id) {
        console.warn(
          'Room ID is generated automatically by this function and should not be provided. The provided ID will be ignored.'
        );
      }

      // The context's room owner is set to current user. Something smells fishy...
      if (uiRoom.ownerUID && uiRoom.ownerUID == auth.currentUser.uid) {
        const dbRoom = await this.fetchUserRoom();

        // You're already in your own room! Don't create a new one.
        if (dbRoom) {
          const errorMessage = 'You already have a room!';
          console.error(errorMessage);
          return Promise.reject(errorMessage);
        }
      }

      // You're in somebody else's room! Don't create a new one.
      if (uiRoom.ownerUID && uiRoom.ownerUID != auth.currentUser.uid) {
        const errorMessage = "You're already in somebody else's room!";
        console.error(errorMessage);
        return Promise.reject(errorMessage);
      }

      uiRoom.ownerUID = auth.currentUser.uid;

      const roomsRef = collection(db, 'rooms');
      const newRoomRef = doc(roomsRef); // Automatically generates a unique ID
      await setDoc(newRoomRef, {
        ...uiRoom,
        id: newRoomRef.id,
      });

      return { id: newRoomRef.id, ...uiRoom };
    },

    async updateRoom(uiRoom: Room): Promise<Room> {
      // User has not yet logged in. Don't throw an error, just return.
      if (!auth.currentUser) {
        return;
      }

      try {
        const roomRef = doc(db, 'rooms', uiRoom.id);
        await updateDoc(roomRef, { ...uiRoom });
      } catch (error) {
        return Promise.reject(`Error updating room with ID: ${uiRoom.id}. Failed with error: ${error}`);
      }

      return uiRoom;
    },
  };
}
