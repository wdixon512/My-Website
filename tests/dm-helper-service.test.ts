import { setDoc, doc, getDoc } from 'firebase/firestore';
import { fetchUserRoom, updateRoom } from '@lib/services/dm-helper-service';
import { authenticateTestUser, getTestFirestore } from '../jest.setup'; // Import the Firestore instance setup

describe('DM Helper Service Integration Tests', () => {
  let db;

  beforeAll(async () => {
    db = getTestFirestore(); // Initialize Firestore with the emulator
    await authenticateTestUser(); // Authenticate a test user
  });

  describe('fetchUserRoom', () => {
    test("should fetch the user's room by ownerUID", async () => {
      const ownerUID = 'test-user';
      const roomId = 'test-room-id';
      const roomRef = doc(db, 'rooms', roomId);

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
      const fetchedRoom = await fetchUserRoom();
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
