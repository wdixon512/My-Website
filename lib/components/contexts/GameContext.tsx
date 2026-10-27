import { createContext, useState } from "react";
import StarLevel from "@lib/models/StarLevel";

export const GameContext = createContext({
  gameStarted: true,
  setGameStarted: (gameStarted: boolean) => null,

  activeStar: null as StarLevel | null,
  setActiveStar: (star: StarLevel | null) => null,

  hoveredStar: null as StarLevel | null,
  setHoveredStar: (star: StarLevel | null) => null,
});

export const GameContextProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(true);
  const [hoveredStar, setHoveredStar] = useState<StarLevel | null>(null);
  const [activeStar, setActiveStar] = useState<StarLevel | null>(null);

  return (
    <GameContext.Provider
      value={{
        gameStarted,
        setGameStarted,
        activeStar,
        setActiveStar,
        hoveredStar,
        setHoveredStar,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
