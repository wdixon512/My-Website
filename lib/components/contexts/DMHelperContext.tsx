import { createContext, useEffect, useState } from "react";
import Mob from "@lib/models/Mob";
import { useToast } from "@chakra-ui/react";
import useLocalStorage from "@lib/hooks/useLocalStorage";
import { randomUUID } from "crypto";

export const DMHelperContext = createContext({
  mobs: [] as Mob[],
  setMobs: (mobs: Mob[]) => null,
  favorites: [] as Mob[],
  setFavorites: (mobs: Mob[]) => null,
  addMob: (mobName: string, mobHealth: string | number) => null,
  removeMob: (mob: Mob) => null,
  isClient: false,
});

export const DMHelperContextProvider = ({ children }) => {
  const [mobs, setMobs] = useLocalStorage<Mob[]>("mobs", []);
  const [favorites, setFavorites] = useLocalStorage<Mob[]>("favorites", []);
  const [isClient, setIsClient] = useState(false);
  const toast = useToast();

  const addMob = (mobName: string, mobHealth: string | number): boolean => {
    if (mobName.trim() === "") {
      toast({
        title: "Error",
        description: "Mob name cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return false;
    }

    if (typeof mobHealth === "string") {
      mobHealth = parseInt(mobHealth, 10);
    }

    console.log(mobHealth);

    if (!isNaN(mobHealth) && mobHealth !== null && mobHealth <= 0) {
      toast({
        title: "Error",
        description: "Mob health must be a positive number.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    let mobNumber = 1;
    if (mobs.some((m) => m.mobName === mobName)) {
      // find mob of same name with largest ID and increment by 1
      mobNumber =
        Math.max(
          ...mobs.filter((m) => m.mobName === mobName).map((m) => m.mobNumber)
        ) + 1;
    }

    const mob: Mob = new Mob(mobName, mobHealth, mobNumber);

    setMobs([...mobs, mob]);
    addFavorite(mob);

    return true;
  };

  const removeMob = (mob: Mob) => {
    setMobs(mobs.filter((m) => !(m.id === mob.id)));
  };

  const addFavorite = (mob: Mob) => {
    if (!favorites.some((m) => m.mobName === mob.mobName)) {
      setFavorites([...favorites, mob]);
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DMHelperContext.Provider
      value={{
        mobs,
        setMobs,
        favorites,
        setFavorites,
        addMob,
        removeMob,
        isClient,
      }}
    >
      {children}
    </DMHelperContext.Provider>
  );
};
