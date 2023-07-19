import { ChakraProvider, Container } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import Fonts from "../components/global/Fonts";
import theme from "../styles/theme";
import { GameContext } from "../contexts/GameContext";
import { useState } from "react";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeStar, setActiveStar] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <GameContext.Provider
        value={{
          gameStarted,
          setGameStarted,
          activeStar,
          setActiveStar,
        }}
      >
        <Fonts />
        <Container width="100%" maxW="100%" px="0" mx="0" height="100vh">
          <NavigationBar />
          <Component {...pageProps} />
        </Container>
      </GameContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
