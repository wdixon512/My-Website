import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import { useTheme } from "@emotion/react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavigationBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
