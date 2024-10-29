import { v4 as uuidv4 } from 'uuid';

// Generates a unique room code using UUID
export function generateRoomCode(): string {
  return uuidv4();
}
