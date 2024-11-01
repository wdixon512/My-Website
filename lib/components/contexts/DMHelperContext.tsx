import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import { CombatState, Combat } from '@lib/models/dm-helper/Combat';
import { Room } from '@lib/models/dm-helper/Room';
import { createRoomService } from '@lib/services/dm-helper-room-service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Entity, EntityType } from '@lib/models/dm-helper/Entity';
import { Hero } from '@lib/models/dm-helper/Hero';
import { Mob } from '@lib/models/dm-helper/Mob';
import { getNextEntityNumber, validateMobHealth, validateName } from '@lib/util/dm-helper-utils';
import { sanitizeData } from '@lib/util/firebase-utils';

export const DMHelperContext = createContext({
  room: {} as Room,
  setRoom: (() => null) as React.Dispatch<React.SetStateAction<Room | null>>,
  entities: [] as Entity[],
  updateEntities: (() => null) as React.Dispatch<React.SetStateAction<Entity[]>>,
  removeEntity: (mob: Mob) => null,
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
});

export const DMHelperContextProvider = ({ children }) => {
  const roomService = createRoomService();

  const [room, setRoom] = useState<Room | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [mobFavorites, setMobFavorites] = useState<Mob[]>([]);
  const [combatStarted, setCombatStarted] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const [commitPending, setCommitPending] = useState(false);

  const toast = useToast();

  const heroes = useMemo(() => entities.filter((entity) => entity.type === EntityType.HERO) as Hero[], [entities]);

  // Utilities to update Room context state & Firestore
  const scheduleCommitRoomChanges = () => setCommitPending(true);

  useEffect(() => {
    if (!commitPending) return;

    const newRoom: Room = {
      ...room,
      combat: {
        ...room?.combat,
        entities: entities,
        combatState: combatStarted ? CombatState.IN_PROGRESS : CombatState.NOT_IN_PROGRESS,
      },
      mobFavorites: mobFavorites,
      heroes: heroes,
    };

    // Firebase doesn't like `undefined` values, so we sanitize the data before updating Firestore
    const sanitizedRoom = sanitizeData(newRoom);

    setRoom(sanitizedRoom);

    roomService.updateRoom(sanitizedRoom).catch((error) => {
      toast({
        title: 'Error Updating Room',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });

    setCommitPending(false);
  }, [commitPending, entities, mobFavorites, heroes, combatStarted, room]);

  // On component mount, fetch the user's room from Firestore
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const dbRoom = await roomService.fetchUserRoom();
          if (dbRoom) {
            setRoom(dbRoom);
            setEntities(dbRoom.combat?.entities || []);
            setMobFavorites(dbRoom.mobFavorites || []);
            setCombatStarted(dbRoom.combat?.combatState === CombatState.IN_PROGRESS);
          } else {
            setRoom({
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
            ownerUID: user.uid,
            combat: {
              entities: entities,
              combatState: combatStarted ? CombatState.IN_PROGRESS : CombatState.NOT_IN_PROGRESS,
            } as Combat,
            mobFavorites: mobFavorites,
            heroes: heroes,
          });
        }
      }
    });

    setIsClient(true);

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const addMob = (name: string, health: number | null, initiative: number | null): boolean => {
    if (!validateName(name, toast) || !validateMobHealth(health, toast)) return false;

    const mob: Mob = {
      id: `${name}_${getNextEntityNumber(entities, name)}`,
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
      id: `${name}_${getNextEntityNumber(entities, name)}`,
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

  const removeEntity = (mob: Mob) => {
    const updatedEntities = entities.filter((m) => m.id !== mob.id);
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
      }}
    >
      {children}
    </DMHelperContext.Provider>
  );
};
