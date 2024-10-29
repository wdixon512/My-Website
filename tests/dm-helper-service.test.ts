import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { fetchUserRoom, updateRoom } from '@lib/services/dm-helper-service';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc, getDocs, query, where, collection } from 'firebase/firestore';
import { generateRoomCode } from '@lib/util/dm-helper-utils';

// Jest mock setup for Firestore in tests that require it
jest.mock('firebase/firestore', () => ({
  setDoc: jest.fn(),
  doc: jest.fn(),
}));

describe('DM Helper Service Tests', () => {
  let testEnv;

  beforeAll(async () => {
    // Initialize the Firebase testing environment with Firestore rules
    testEnv = await initializeTestEnvironment({
      projectId: 'test-project-id',
      firestore: { rules: 'firestore.rules' },
    });
  });

  afterAll(async () => {
    // Clean up the Firebase testing environment
    await testEnv.cleanup();
  });

  describe('fetchUserRoom', () => {
    test("should fetch the user's room by ownerUID", async () => {
      const userId = uuidv4(); // Simulate a unique user ID
      const db = testEnv.authenticatedContext(userId).firestore();

      // Set up a room for this user in Firestore
      const roomData = {
        id: 1,
        ownerUID: userId,
        code: 'ROOM123',
        combat: { entities: [], combatState: 0 },
        mobFavorites: [],
        heroes: [],
      };

      await setDoc(doc(db, 'rooms', 'test-room'), roomData);

      // Fetch room and verify it matches the setup data
      const fetchedRoom = await fetchUserRoom();
      expect(fetchedRoom).toEqual(roomData);
    });

    test('should return null if no room is found for user', async () => {
      const userId = uuidv4();
      const db = testEnv.authenticatedContext(userId).firestore();

      const fetchedRoom = await fetchUserRoom();
      expect(fetchedRoom).toBeNull();
    });
  });

  describe('generateRoomCode', () => {
    test('should generate a unique room code', () => {
      const roomCode1 = generateRoomCode();
      const roomCode2 = generateRoomCode();
      expect(roomCode1).toHaveLength(36); // UUID length
      expect(roomCode1).not.toEqual(roomCode2); // Should not be the same
    });
  });

  describe('updateRoom', () => {
    test('should call Firestore to update the room data', async () => {
      const mockRoom = {
        id: 1,
        ownerUID: 'user123',
        code: 'ROOM123',
        combat: { entities: [], combatState: 1 },
        mobFavorites: [],
        heroes: [],
      };

      await updateRoom(mockRoom);

      // Confirm that Firestore's setDoc was called with the correct arguments
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), mockRoom);
    });
  });
});
