import { ChakraProvider, Container } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import Fonts from "../components/global/Fonts";
import theme from "../styles/theme";
import {
  GameContext,
  GameContextProvider,
} from "../components/contexts/GameContext";
import { useState } from "react";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <GameContextProvider>
        <Fonts />
        <Container
          width="100%"
          maxW="100%"
          px="0"
          mx="0"
          mb="20"
          minHeight="100vh"
        >
          <NavigationBar />
          <Component {...pageProps} />
        </Container>
      </GameContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
