"use client";
import { createContext, useEffect, useState } from "react";
import Mob from "@lib/models/Mob";
import { useToast } from "@chakra-ui/react";

export const DMHelperContext = createContext({
    mobs: [] as Mob[],
    setMobs: (mobs: Mob[]) => null,
    favorites: [] as Mob[],
    setFavorites: (mobs: Mob[]) => null,
    addMob: (mobName: string, mobHealth: string | number) => null,
    removeMob: (mob: Mob) => null,
});

export const DMHelperContextProvider = ({ children }) => {
    const [mobs, setMobs] = useState<Mob[]>([]);
    const [favorites, setFavorites] = useState<Mob[]>([]);
    const toast = useToast();

    const [isInitialized, setIsInitialized] = useState(false);

    const addMob = (mobName: string, mobHealth: string | number) => {
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

        if (isNaN(mobHealth) || mobHealth <= 0) {
            toast({
                title: "Error",
                description: "Mob health must be a positive number.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return false;
        }

        let id = 1;
        if (mobs.some((m) => m.mobName === mobName)) {
            // find mob of same name with largest ID and increment by 1
            id = Math.max(...mobs.filter((m) => m.mobName === mobName).map((m) => m.id)) + 1;
        }

        const mob: Mob = { mobName, mobHealth, id };

        setMobs([...mobs, mob]);
        addFavorite(mob);
    }

    const removeMob = (mob: Mob) => {
        setMobs(mobs.filter((m) => !(m.mobName === mob.mobName && m.id === mob.id)));
    }

    const addFavorite = (mob: Mob) => {
        if (!favorites.some((m) => m.mobName === mob.mobName)) {
            setFavorites([...favorites, mob]);
        };
    }

    useEffect(() => {
        const storedMobs = localStorage.getItem("mobs");
        const storedFavorites = localStorage.getItem("favorites");

        if (storedMobs) {
            setMobs(JSON.parse(storedMobs));
        }

        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }

        setIsInitialized(true);
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("mobs", JSON.stringify(mobs));
        }
    }, [mobs, isInitialized]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites, isInitialized]);

    return (
        <DMHelperContext.Provider
            value={{
                mobs,
                setMobs,
                favorites,
                setFavorites,
                addMob,
                removeMob
            }}
        >
            {children}
        </DMHelperContext.Provider>
    );
};
