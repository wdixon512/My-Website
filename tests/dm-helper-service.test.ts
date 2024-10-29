import { setDoc, doc, Firestore, getFirestore } from 'firebase/firestore';
import { createRoomService, RoomService } from '@lib/services/dm-helper-service';
import { getTestFirestore } from '../jest.setup'; // Import the Firestore instance setup
import { auth } from '@lib/services/firebase';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn(() => {
      return {
        currentUser: { uid: 'test-user' },
      };
    }),
  };
});

describe('DM Helper Service Integration Tests', () => {
  let roomService: RoomService;

  beforeAll(async () => {
    // Mock Firebase Auth
    const db = getTestFirestore();
    roomService = createRoomService(db, auth);
  });

  describe('fetchUserRoom', () => {
    test("should fetch the user's room by ownerUID", async () => {
      const ownerUID = 'test-user';
      const roomId = 'test-room-id';
      const roomRef = doc(getTestFirestore(), 'rooms', roomId);

      // Set up a room document in Firestore for testing
      const roomData = {
        id: 1,
        ownerUID,
        code: 'ROOM123',
        combat: { entities: [], combatState: 0 },
        mobFavorites: [],
        heroes: [],
      };

      await setDoc(roomRef, roomData); // Write room to the emulator's Firestore

      // Fetch the room using your service
      const fetchedRoom = await roomService.fetchUserRoom();
      expect(fetchedRoom).toEqual(roomData);
    });

    // test('should return null if no room is found for user', async () => {
    //   // No room has been created yet
    //   const fetchedRoom = await fetchUserRoom();
    //   expect(fetchedRoom).toBeNull();
    // });
  });

  describe('updateRoom', () => {
    // test('should update a room in Firestore', async () => {
    //   const ownerUID = 'test-user';
    //   const roomId = 'test-room-id';
    //   const roomRef = doc(db, 'rooms', roomId);
    //   const initialRoom = {
    //     id: 1,
    //     ownerUID,
    //     code: 'ROOM123',
    //     combat: { entities: [], combatState: 0 },
    //     mobFavorites: [],
    //     heroes: [],
    //   };
    //   // Set initial room data
    //   await setDoc(roomRef, initialRoom);
    //   // Update room using updateRoom function
    //   const updatedRoom = {
    //     ...initialRoom,
    //     combat: { ...initialRoom.combat, combatState: 1 },
    //   };
    //   await updateRoom(updatedRoom);
    //   // Fetch updated room to verify the change
    //   const roomSnapshot = await getDoc(roomRef);
    //   expect(roomSnapshot.data()).toEqual(updatedRoom);
    // });
  });
});
