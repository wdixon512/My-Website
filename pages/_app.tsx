import { SessionProvider } from "next-auth/react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import NavigationBar from "@lib/components/NavigationBar";
import Fonts from "@lib/components/global/Fonts";
import theme from "../styles/theme";
import { GameContextProvider } from "@lib/components/contexts/GameContext";
import "@fontsource/rhodium-libre";
import "../styles/global.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <GameContextProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" sizes="any" />
          </Head>
          <Fonts />
          <Container
            width="100vw"
            maxW="100vw"
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
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;
