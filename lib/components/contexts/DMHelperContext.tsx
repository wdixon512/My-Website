import { createContext, useEffect, useState, useMemo } from "react";
import Mob from "@lib/models/dm-helper/Mob";
import { useToast } from "@chakra-ui/react";
import useLocalStorage from "@lib/hooks/useLocalStorage";
import Entity, { EntityType } from "@lib/models/dm-helper/Entity";
import Hero from "@lib/models/dm-helper/Hero";

export const DMHelperContext = createContext({
  entities: [] as Entity[],
  setEntities: (() => null) as React.Dispatch<React.SetStateAction<Entity[]>>,
  removeEntity: (mob: Mob) => null,
  addMob: (
    name: string,
    health: number | undefined,
    initiative: number | undefined
  ) => null,
  addHero: (
    name: string,
    health: number | undefined,
    initiative: number | undefined
  ) => null,
  mobFavorites: [] as Mob[],
  setMobFavorites: (mobs: Mob[]) => null,
  isClient: false,
  heroes: [] as Hero[],
  combatStarted: false,
  setCombatStarted: (started: boolean) => null,
  clearMobs: () => null,
});

export const DMHelperContextProvider = ({ children }) => {
  const [entities, setEntities] = useLocalStorage<Entity[]>("entities", []);
  const [mobFavorites, setMobFavorites] = useLocalStorage<Mob[]>(
    "mobFavorites",
    []
  );
  const [isClient, setIsClient] = useState(false);
  const [combatStarted, setCombatStarted] = useState(false);
  const toast = useToast();

  const addMob = (
    name: string,
    health: number | undefined,
    initiative: number | undefined
  ): boolean => {
    if (!validateName(name) || !validateMobHealth(health)) return false;

    const number = getNextEntityNumber(name);
    const mob: Mob = new Mob(name, health, number, initiative);

    setEntities([...entities, mob]);
    addMobFavorite(mob);

    return true;
  };

  const addHero = (
    name: string,
    health: number | undefined,
    initiative: number | undefined
  ): boolean => {
    if (!validateName(name) || !validateMobHealth(health)) return false;

    const number = getNextEntityNumber(name);
    const hero: Hero = new Hero(name, health, number, initiative);

    setEntities([...entities, hero]);
    return true;
  };

  const validateName = (name: string): boolean => {
    if (name.trim() === "") {
      toast({
        title: "Error",
        description: "Mob name cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return false;
    }

    return true;
  };

  const validateMobHealth = (health: number | undefined): boolean => {
    if (!isNaN(health) && health !== null && health <= 0) {
      toast({
        title: "Error",
        description: "Mob health must be a positive number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const getNextEntityNumber = (name: string) => {
    let mobNumber = 1;
    if (entities.some((m) => m.name === name)) {
      mobNumber =
        Math.max(
          ...entities.filter((m) => m.name === name).map((m) => m.number)
        ) + 1;
    }

    return mobNumber;
  };

  const removeEntity = (mob: Mob) => {
    setEntities(entities.filter((m) => !(m.id === mob.id)));
  };

  const addMobFavorite = (mob: Mob) => {
    if (!mobFavorites.some((m) => m.name === mob.name)) {
      setMobFavorites([...mobFavorites, mob]);
    }
  };

  const clearMobs = () => {
    setEntities(entities.filter((entity) => entity.type !== EntityType.MOB));
  };

  const heroes = useMemo(() => {
    return entities?.filter(
      (entity) => entity.type === EntityType.HERO
    ) as Hero[];
  }, [entities]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DMHelperContext.Provider
      value={{
        entities,
        setEntities,
        removeEntity,
        addMob,
        addHero,
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
