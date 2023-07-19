import { createContext, useMemo, useState } from "react";

export const GameContext = createContext({
  gameStarted: false,
  setGameStarted: (gameStarted: boolean) => null,

  activeStar: null as JSX.Element | null,
  setActiveStar: (star: JSX.Element | null) => null,
});

export const GameContextProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeStar, setActiveStar] = useState(null);

  const contextValue = useMemo(
    () => ({
      gameStarted,
      activeStar,
      setGameStarted,
      setActiveStar,
    }),
    [gameStarted, activeStar]
  );
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
