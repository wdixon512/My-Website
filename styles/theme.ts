import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    secondary: {
      200: "#4BCEEB",
      500: "#4FC7FF",
    },
    marioRed: {
      500: "#F54103",
    },
  },
  fonts: {
    heading: `Pixel, sans-serif`,
    body: `Pixel, sans-serif`,
  },
});

export default theme;
