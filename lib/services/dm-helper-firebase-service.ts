import { Room } from '@lib/models/dm-helper/Room';
import { ref, orderByChild, equalTo, get, query } from 'firebase/database';
import { rtdb } from './firebase';
import { User } from 'firebase/auth';

export async function getRoombyId(userId: string, user: User): Promise<Room | null> {
  return null;
}

export async function getRoomByOwnerUID(ownerUID: string): Promise<Room | null> {
  // Create a query to find rooms with the matching ownerUID
  const roomsRef = ref(rtdb, `rooms`);
  const queryByOwnerUID = query(roomsRef, orderByChild('ownerUID'), equalTo(ownerUID));
  const snapshot = await get(queryByOwnerUID);

  if (snapshot.exists()) {
    const dbRooms = snapshot.val();
    return Object.values(dbRooms)[0] as Room;
  }

  return null;
}
