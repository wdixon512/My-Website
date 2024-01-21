import { createContext, useMemo, useState } from "react";
import StarLevel from "../../lib/models/StarLevel";

export const GameContext = createContext({
  gameStarted: false,
  setGameStarted: (gameStarted: boolean) => null,

  activeStar: null as StarLevel | null,
  setActiveStar: (star: StarLevel | null) => null,

  hoveredStar: null as StarLevel | null,
  setHoveredStar: (star: StarLevel | null) => null,
});

export const GameContextProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
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
