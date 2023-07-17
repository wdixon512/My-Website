import { ChakraProvider } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NavigationBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
