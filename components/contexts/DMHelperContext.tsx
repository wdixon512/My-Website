import { createContext, useState } from "react";
import Mob from "@lib/models/Mob";

export const DMHelperContext = createContext({
    mobs: [] as Mob[],
    setMobs: (mobs: Mob[]) => null,
});

export const DMHelperContextProvider = ({ children }) => {
    const [mobs, setMobs] = useState<Mob[]>([]);

    return (
        <DMHelperContext.Provider
            value={{
                mobs,
                setMobs
            }}
        >
            {children}
        </DMHelperContext.Provider>
    );
};
