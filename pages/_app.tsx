import { ChakraProvider, Container } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import Fonts from "../components/global/Fonts";
import theme from "../styles/theme";
import { GameContextProvider } from "../components/contexts/GameContext";
import "@fontsource/rhodium-libre";
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
          pb="20"
          minHeight="100vh"
          bgColor="lightSlate.500"
        >
          <NavigationBar />
          <Component {...pageProps} />
        </Container>
      </GameContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
