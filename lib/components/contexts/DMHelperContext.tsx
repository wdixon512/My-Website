import { createContext, useEffect, useState, useMemo } from 'react';
import Mob from '@lib/models/dm-helper/Mob';
import { useToast } from '@chakra-ui/react';
import Entity, { EntityType } from '@lib/models/dm-helper/Entity';
import Hero from '@lib/models/dm-helper/Hero';
import { CombatState, Combat } from '@lib/models/dm-helper/Combat';
import { Room } from '@lib/models/dm-helper/Room';
import { createRoomService } from '@lib/services/dm-helper-room-service';
import { getAuth } from 'firebase/auth';

export const DMHelperContext = createContext({
  room: {} as Room,
  setRoom: (() => null) as React.Dispatch<React.SetStateAction<Room | null>>,
  entities: [] as Entity[],
  setEntities: (() => null) as React.Dispatch<React.SetStateAction<Entity[]>>,
  removeEntity: (mob: Mob) => null,
  addMob: (name: string, health: number | undefined, initiative: number | undefined) => null,
  addHero: (name: string, health: number | undefined, initiative: number | undefined) => null,
  setHeroes: (() => null) as React.Dispatch<React.SetStateAction<Hero[]>>,
  resetHeroInitiatives: () => null,
  mobFavorites: [] as Mob[],
  setMobFavorites: (mobs: Mob[]) => null,
  isClient: false,
  heroes: [] as Hero[],
  combatStarted: false,
  setCombatStarted: (started: boolean) => null,
  clearMobs: () => null,
});

export const DMHelperContextProvider = ({ children }) => {
  const roomService = createRoomService();

  const [room, setRoom] = useState<Room | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [mobFavorites, setMobFavorites] = useState<Mob[]>([]);
  const [combatStarted, setCombatStarted] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);
  const toast = useToast();

  // Fetch room from Firebase on component mount
  useEffect(() => {
    const fetchAndSetRoom = async () => {
      try {
        const room = await roomService.fetchUserRoom();
        if (room) {
          setRoom(room);
          setEntities(room.combat.entities || []);
          setMobFavorites(room.mobFavorites || []);
          setCombatStarted(room.combat.combatState === CombatState.IN_PROGRESS);
        }
      } catch (error) {
        console.warn('Error fetching room:', error, 'Creating new room...');
        setRoom({
          ownerUID: getAuth().currentUser?.uid ?? '',
          combat: {
            entities: entities,
            combatState: combatStarted ? CombatState.IN_PROGRESS : CombatState.NOT_IN_PROGRESS,
          } as Combat,
          mobFavorites: mobFavorites,
          heroes: heroes,
        });
      }
    };

    fetchAndSetRoom();
  }, []);

  // Utility to update Firestore and context state simultaneously
  const updateDbRoom = async (updatedRoom: Partial<Room>) => {
    if (!room) return;
    const newRoom = { ...room, ...updatedRoom };
    await roomService.updateRoom(newRoom);
    setRoom(newRoom);
  };

  const addMob = (name: string, health: number | undefined, initiative: number | undefined): boolean => {
    if (!validateName(name) || !validateMobHealth(health)) return false;

    const mob: Mob = new Mob(name, health, getNextEntityNumber(name), initiative);
    const updatedEntities = [...entities, mob];
    setEntities(updatedEntities);
    updateDbRoom({ combat: { ...room?.combat, entities: updatedEntities } });

    addMobFavorite(mob);
    return true;
  };

  const addHero = (name: string, health: number | undefined, initiative: number | undefined): boolean => {
    if (!validateName(name) || !validateMobHealth(health)) return false;

    const hero: Hero = new Hero(name, health, getNextEntityNumber(name), initiative);
    const updatedEntities = [...entities, hero];
    setEntities(updatedEntities);
    updateDbRoom({ combat: { ...room?.combat, entities: updatedEntities } });
    return true;
  };

  const setHeroes = (heroes: Hero[]) => {
    const nonHeroes = entities.filter((entity) => entity.type !== EntityType.HERO);
    const updatedEntities = [...nonHeroes, ...heroes];
    setEntities(updatedEntities);
    updateDbRoom({ combat: { ...room?.combat, entities: updatedEntities } });
  };

  const resetHeroInitiatives = () => {
    const updatedEntities = entities.map((entity) =>
      entity.type === EntityType.HERO ? { ...entity, initiative: undefined } : entity
    );
    setEntities(updatedEntities);
    updateDbRoom({ combat: { ...room?.combat, entities: updatedEntities } });
  };

  const addMobFavorite = (mob: Mob) => {
    if (!mobFavorites.some((m) => m.name === mob.name)) {
      const updatedFavorites = [...mobFavorites, mob];
      setMobFavorites(updatedFavorites);
      updateDbRoom({ mobFavorites: updatedFavorites });
    }
  };

  const removeEntity = (mob: Mob) => {
    const updatedEntities = entities.filter((m) => m.id !== mob.id);
    setEntities(updatedEntities);
    updateDbRoom({ combat: { ...room?.combat, entities: updatedEntities } });
  };

  const clearMobs = () => {
    const updatedEntities = entities.filter((entity) => entity.type !== EntityType.MOB);
    setEntities(updatedEntities);
    updateDbRoom({ combat: { ...room?.combat, entities: updatedEntities } });
  };

  const heroes = useMemo(() => entities.filter((entity) => entity.type === EntityType.HERO) as Hero[], [entities]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Validation functions
  const validateName = (name: string): boolean => {
    if (name.trim() === '') {
      toast({
        title: 'Error',
        description: 'Name cannot be empty.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const validateMobHealth = (health: number | undefined): boolean => {
    if (health !== undefined && health <= 0) {
      toast({
        title: 'Error',
        description: 'Health must be a positive number.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const getNextEntityNumber = (name: string) => {
    let number = 1;
    if (entities.some((m) => m.name === name)) {
      number = Math.max(...entities.filter((m) => m.name === name).map((m) => m.number)) + 1;
    }
    return number;
  };

  return (
    <DMHelperContext.Provider
      value={{
        room,
        setRoom,
        entities,
        setEntities,
        removeEntity,
        addMob,
        addHero,
        setHeroes,
        resetHeroInitiatives,
        mobFavorites,
        setMobFavorites,
        isClient,
        heroes,
        combatStarted,
        setCombatStarted,
        clearMobs,
      }}
    >
      {children}
    </DMHelperContext.Provider>
  );
};
