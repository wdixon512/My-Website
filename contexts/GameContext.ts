import { createContext } from "react";

export const GameContext = createContext({
  gameStarted: false,
  setGameStarted: (gameStarted: boolean) => null,

  activeStar: null as JSX.Element | null,
  setActiveStar: (star: JSX.Element | null) => null,
});
