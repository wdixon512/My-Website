import { ChakraProvider } from "@chakra-ui/react";
import NavigationBar from "../components/NavigationBar";
import Fonts from "../components/global/Fonts";
import theme from "../styles/theme";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <NavigationBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
