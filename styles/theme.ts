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
    lightSlate: {
      500: "#d3d3d363",
    },
  },
  fonts: {
    heading: `'Rhodium Libre', sans-serif`,
    body: `'Rhodium Libre', sans-serif`,
  },
});

export default theme;
