import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { CombatState, Combat } from '@lib/models/dm-helper/Combat';
import { DEFAULT_ROOM, Room } from '@lib/models/dm-helper/Room';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Entity, EntityType } from '@lib/models/dm-helper/Entity';
import { Hero } from '@lib/models/dm-helper/Hero';
import { Mob } from '@lib/models/dm-helper/Mob';
import { getNextEntityNumber, validateMobHealth, validateName } from '@lib/util/dm-helper-utils';
import { sanitizeData } from '@lib/util/firebase-utils';
import { auth, rtdb } from '@services/firebase';
import { ref, get, set, update, push, query, orderByChild, equalTo } from 'firebase/database';

export const DMHelperContext = createContext({
  room: {} as Room,
  setRoom: (() => null) as React.Dispatch<React.SetStateAction<Room | null>>,
  createRoom: async () => null,
  joinRoomLink: null as string | null,
  entities: [] as Entity[],
  updateEntities: (() => null) as React.Dispatch<React.SetStateAction<Entity[]>>,
  removeEntity: (entity: Entity) => null,
  addMob: (name: string, health: number | null, initiative: number | null) => null,
  addHero: (name: string, health: number | null, initiative: number | null) => null,
  resetHeroInitiatives: () => null,
  mobFavorites: [] as Mob[],
  updateMobFavorites: (mobs: Mob[]) => null,
  isClient: false,
  heroes: [] as Hero[],
  combatStarted: false,
  updateCombatStarted: (started: boolean) => null,
  clearMobs: () => null,
  loadingFirebaseRoom: false,
});

export const DMHelperContextProvider = ({ children }) => {
  const [room, setRoom] = useState<Room | null>(DEFAULT_ROOM);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [mobFavorites, setMobFavorites] = useState<Mob[]>([]);
  const [combatStarted, setCombatStarted] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [commitPending, setCommitPending] = useState(false);
  const [joinRoomLink, setJoinRoomLink] = useState<string | null>(null);
  const [loadingFirebaseRoom, setloadingFirebaseRoom] = useState(true);

  const toast = useToast();

  const heroes = useMemo(() => entities.filter((entity) => entity.type === EntityType.HERO) as Hero[], [entities]);

  // Utilities to update Room context state & Realtime Database
  const scheduleCommitRoomChanges = () => setCommitPending(true);

  // On component mount, fetch the user's room from Realtime Database
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          setloadingFirebaseRoom(true);
          // Create a query to find rooms with the matching ownerUID
          const roomsRef = ref(rtdb, `rooms`);
          const queryByOwnerUID = query(roomsRef, orderByChild('ownerUID'), equalTo(user.uid));
          const snapshot = await get(queryByOwnerUID);

          if (snapshot.exists()) {
            const dbRooms = snapshot.val();
            const firstRoom = Object.values(dbRooms)[0] as Room;

            setRoom(firstRoom);
            setEntities(firstRoom.combat?.entities || []);
            setMobFavorites(firstRoom.mobFavorites || []);
            setCombatStarted(firstRoom.combat?.combatState === CombatState.IN_PROGRESS);
            setJoinRoomLink(`${window.location.origin}/join/${firstRoom.id}`);
          } else {
            setRoom({
              ...room,
              ownerUID: user.uid,
              combat: {
                entities: entities,
                combatState: combatStarted ? CombatState.IN_PROGRESS : CombatState.NOT_IN_PROGRESS,
              } as Combat,
              mobFavorites: mobFavorites,
              heroes: heroes,
            });
          }
        } catch (error) {
          console.warn('Error fetching room:', error, 'Creating new room...');
          // If we fail to retrieve the room, create a new one
          setRoom({
            ...room,
            ownerUID: user.uid,
            combat: {
              entities: entities,
              combatState: combatStarted ? CombatState.IN_PROGRESS : CombatState.NOT_IN_PROGRESS,
            } as Combat,
            mobFavorites: mobFavorites,
            heroes: heroes,
          });
        }

        setloadingFirebaseRoom(false);
      }
    });

    setIsClient(true);

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  // Commit changes to the room to Realtime Database
  useEffect(() => {
    if (!commitPending) return;

    let syncChangesWithFirebase = room.syncWithFirebase;

    const updatedRoom: Room = {
      ...room,
      combat: {
        ...room?.combat,
        entities: entities,
        combatState: combatStarted ? CombatState.IN_PROGRESS : CombatState.NOT_IN_PROGRESS,
      },
      mobFavorites: mobFavorites,
      heroes: heroes,
    };

    // Firebase doesn't like `undefined` values, so we sanitize the data before updating Realtime Database
    const sanitizedRoom = sanitizeData(updatedRoom);
    setRoom(sanitizedRoom);

    if (!auth.currentUser) {
      // If user isn't authenticated, and the room they're in is set to sync with Firebase, we can't update the room
      if (updatedRoom.syncWithFirebase) {
        toast({
          title: 'Authentication Error',
          description: 'User is not authenticated',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }

      syncChangesWithFirebase = false;
    }

    // If the user is authenticated, but they are not the owner of the room, we can't update the room
    if (auth.currentUser && updatedRoom.ownerUID !== auth.currentUser.uid) {
      toast({
        title: 'Authorization Error',
        description: 'You are not the owner of this room. You cannot make updates to it.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      syncChangesWithFirebase = false;
    }

    // Update the room in Realtime Database
    if (syncChangesWithFirebase) {
      try {
        if (!sanitizedRoom.id) {
          throw new Error('No room ID found. Failed to sync room with cloud.');
        }
        const roomRef = ref(rtdb, `rooms/${sanitizedRoom.id}`);
        update(roomRef, sanitizedRoom).catch((error) => {
          toast({
            title: 'Error Updating Room',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
      } catch (e) {
        console.error(e);
        toast({
          title: 'Error Updating Room',
          description: e.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }

    setCommitPending(false);
  }, [commitPending, entities, mobFavorites, heroes, combatStarted, room]);

  const createRoom = async () => {
    const user = auth.currentUser;

    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'User is not authenticated',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let newRoomData = {
      ...room,
      ownerUID: user.uid,
      syncWithFirebase: true,
    };

    try {
      const roomRef = ref(rtdb, `rooms`);
      const newRoomRef = await push(roomRef, newRoomData); // generates a unique ID for the room
      const newRoomId = newRoomRef.key;

      if (newRoomId) {
        newRoomData = { ...newRoomData, id: newRoomId };
        setRoom(newRoomData);
        await set(newRoomRef, newRoomData);
        toast({
          title: 'Room Created',
          description: 'Your room has been created!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        const roomLink = `${window.location.origin}/join/${newRoomId}`;
        setJoinRoomLink(roomLink);

        return roomLink;
      }

      throw new Error('Failed to create room; no room ID generated.');
    } catch (error) {
      toast({
        title: 'Error Creating Room',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      return null;
    }
  };

  const addMob = (name: string, health: number | null, initiative: number | null): boolean => {
    if (!validateName(name, toast) || !validateMobHealth(health, toast)) return false;

    const mob: Mob = {
      id: `${name.toLowerCase()}-${getNextEntityNumber(entities, name)}`,
      name,
      health,
      number: getNextEntityNumber(entities, name),
      initiative,
      type: EntityType.MOB,
    };

    const addMobFavorite = (mob: Mob) => {
      if (!mobFavorites.some((m) => m.name === mob.name)) {
        const updatedFavorites = [...mobFavorites, mob];
        setMobFavorites(updatedFavorites);
      }
    };

    const updatedEntities = [...entities, mob];
    setEntities(updatedEntities);
    addMobFavorite(mob);
    scheduleCommitRoomChanges();

    return true;
  };

  const addHero = (name: string, health: number | null, initiative: number | null): boolean => {
    if (!validateName(name, toast)) return false;

    const hero: Hero = {
      id: `${name.toLowerCase()}-${getNextEntityNumber(entities, name)}`,
      name,
      health,
      number: getNextEntityNumber(entities, name),
      initiative,
      type: EntityType.HERO,
    };

    const updatedEntities = [...entities, hero];
    setEntities(updatedEntities);
    scheduleCommitRoomChanges();

    return true;
  };

  const updateEntities = (entities: Entity[]) => {
    setEntities(entities);
    scheduleCommitRoomChanges();
  };

  const updateMobFavorites = (mobs: Mob[]) => {
    setMobFavorites(mobs);
    scheduleCommitRoomChanges();
  };

  const updateCombatStarted = (started: boolean) => {
    setCombatStarted(started);
    scheduleCommitRoomChanges();
  };

  const resetHeroInitiatives = () => {
    const updatedEntities = entities.map((entity) =>
      entity.type === EntityType.HERO ? { ...entity, initiative: undefined } : entity
    );
    setEntities(updatedEntities);
    scheduleCommitRoomChanges();
  };

  const removeEntity = (entity: Entity) => {
    const updatedEntities = entities.filter((e) => e.id !== entity.id);
    setEntities(updatedEntities);
    scheduleCommitRoomChanges();
  };

  const clearMobs = () => {
    const updatedEntities = entities.filter((entity) => entity.type !== EntityType.MOB);
    setEntities(updatedEntities);
    scheduleCommitRoomChanges();
  };

  return (
    <DMHelperContext.Provider
      value={{
        room,
        setRoom,
        createRoom,
        joinRoomLink,
        entities,
        updateEntities,
        removeEntity,
        addMob,
        addHero,
        resetHeroInitiatives,
        mobFavorites,
        updateMobFavorites,
        isClient,
        heroes,
        combatStarted,
        updateCombatStarted,
        clearMobs,
        loadingFirebaseRoom,
      }}
    >
      {children}
    </DMHelperContext.Provider>
  );
};
