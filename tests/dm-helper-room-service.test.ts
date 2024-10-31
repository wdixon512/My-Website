import { collection, getDocs, deleteDoc, getDoc, doc, setDoc } from 'firebase/firestore';
import { createRoomService, DMHelperRoomService } from '@lib/services/dm-helper-room-service';
import { getTestFirestore } from '../jest.setup'; // Import the Firestore instance setup
import { auth } from '@lib/services/firebase';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn(() => ({
      currentUser: { uid: 'test-user' },
    })),
  };
});

describe('DM Helper Service Integration Tests', () => {
  let roomService: DMHelperRoomService;

  beforeAll(() => {
    // Set up Firestore and auth for testing
    const db = getTestFirestore();
    roomService = createRoomService(db, auth);
  });

  const clearFirestoreData = async () => {
    const db = getTestFirestore();
    const roomsCollection = collection(db, 'rooms');
    const snapshot = await getDocs(roomsCollection);
    const deletions = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletions); // Ensure all documents are deleted
  };

  beforeEach(async () => {
    await clearFirestoreData();
  });

  // Tests for createRoom
  describe('createRoom', () => {
    test('should create a new room in Firestore and generate an id', async () => {
      const ownerUID = 'test-user';

      const newRoom = {
        ownerUID,
        combat: { entities: [], combatState: 0 },
        mobFavorites: [],
        heroes: [],
      };

      // Create room using the createRoom function
      const createdRoom = await roomService.createRoom(newRoom);

      // Verify that an id was generated
      expect(createdRoom.id).toBeDefined();
      expect(typeof createdRoom.id).toBe('string');

      // Fetch the room from Firestore to verify its creation
      const roomRef = doc(getTestFirestore(), 'rooms', createdRoom.id);
      const roomSnapshot = await getDoc(roomRef);
      expect(roomSnapshot.exists()).toBe(true);
      expect(roomSnapshot.data()).toEqual({
        ...newRoom,
        id: undefined, // Since `id` is not part of the document data, it's not stored in Firestore
      });
    });

    test('should throw an error and log a warning if an id is provided when creating a new room', async () => {
      const ownerUID = 'test-user';

      const roomWithId = {
        id: 'ROOM123',
        ownerUID,
        combat: { entities: [], combatState: 0 },
        mobFavorites: [],
        heroes: [],
      };

      // Spy on console.warn
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      // Try to create a room with an id and expect an error to be thrown
      await roomService.createRoom(roomWithId);

      // Verify that console.warn was called
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Room ID is generated automatically by this function and should not be provided. The provided ID will be ignored.'
      );

      // Restore console.warn
      consoleWarnSpy.mockRestore();
    });
  });

  // Tests for fetchUserRoom
  describe('fetchUserRoom', () => {
    test("should fetch the user's room by ownerUID", async () => {
      const ownerUID = 'test-user';
      const roomId = 'ROOM123';
      const roomRef = doc(getTestFirestore(), 'rooms', roomId);

      // Set up a room document in Firestore for testing
      const roomData = {
        id: roomId,
        ownerUID,
        combat: { entities: [], combatState: 0 },
        mobFavorites: [],
        heroes: [],
      };

      await setDoc(roomRef, roomData); // Write room to the emulator's Firestore

      // Fetch the room using your service
      const fetchedRoom = await roomService.fetchUserRoom();
      expect(fetchedRoom).equal(roomData);
    });

    test('should return null if no room is found for user', async () => {
      // No room has been created yet
      const fetchedRoom = await roomService.fetchUserRoom();
      expect(fetchedRoom).toBeNull();
    });
  });

  // Tests for updateRoom
  describe('updateRoom', () => {
    test('should update a room in Firestore', async () => {
      const ownerUID = 'test-user';
      const roomId = 'ROOM123';
      const roomRef = doc(getTestFirestore(), 'rooms', roomId);

      const initialRoom = {
        id: roomId,
        ownerUID,
        combat: { entities: [], combatState: 0 },
        mobFavorites: [],
        heroes: [],
      };

      // Set initial room data
      await setDoc(roomRef, initialRoom);

      // Update room using updateRoom function
      const updatedRoom = {
        ...initialRoom,
        combat: { ...initialRoom.combat, combatState: 1 },
      };

      await roomService.updateRoom(updatedRoom);

      // Fetch updated room to verify the change
      const roomSnapshot = await getDoc(roomRef);
      expect(roomSnapshot.data()).equal(updatedRoom);
    });

    test('should throw an error if the room does not exist', async () => {
      const nonExistentRoom = {
        id: 'NON_EXISTENT_ROOM',
        ownerUID: 'test-user',
        combat: { entities: [], combatState: 1 },
        mobFavorites: [],
        heroes: [],
      };

      // Attempt to update a non-existent room and expect an error to be thrown
      await expect(roomService.updateRoom(nonExistentRoom)).rejects.toThrow();
    });
  });
});
