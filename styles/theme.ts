import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      100: "#4f6b72",
      200: "#445d63",
      300: "#3a4f54",
      400: "#303f44",
      500: "#2F4F4F", // existing Dark Slate Gray
      600: "#253232",
      700: "#1b2426",
      800: "#111717",
    },
    secondary: {
      100: "#2e3943",
      200: "#28333d",
      300: "#222d37",
      400: "#1d2731",
      500: "#1C2833", // existing Gunmetal
      600: "#161e28",
      700: "#101722",
      800: "#0a111c",
    },
    accent: {
      100: "#339aff",
      200: "#2f8ae5",
      300: "#2b79cc",
      400: "#2769b3",
      500: "#007BFF", // existing Electric Blue
      600: "#1f5a99",
      700: "#1b4a80",
      800: "#173966",
    },
    text: {
      100: "#ffffff",
      200: "#ffffff",
      300: "#f5f5f5",
      400: "#f0f0f0",
      500: "#F5F5F5", // existing Off-White
      600: "#e5e5e5",
      700: "#d5d5d5",
      800: "#c5c5c5",
    },
    interactive: {
      100: "#66ff5b",
      200: "#59ff50",
      300: "#4dff46",
      400: "#40ff3b",
      500: "#39FF14", // existing Neon Green
      600: "#33e312",
      700: "#2dc610",
      800: "#26a90e",
    },
    error: {
      100: "#f75d68",
      200: "#f24c5a",
      300: "#ed3c4c",
      400: "#e82b3d",
      500: "#DC143C", // existing Crimson
      600: "#c41234",
      700: "#ac102c",
      800: "#940e24",
    },
    marioRed: {
      100: "#F87453",
      200: "#F76543",
      300: "#F65533",
      400: "#F54623",
      500: "#F54103", // existing marioRed
      600: "#D53B03",
      700: "#B53503",
      800: "#952F03",
    },
    lightSlate: {
      100: "#e6e6e6a1",
      200: "#dadada8e",
      300: "#cdcdcd7a",
      400: "#c1c1c167",
      500: "#d3d3d363", // existing lightSlate
      600: "#b7b7b750",
      700: "#aaaaaa3d",
      800: "#9e9e9e29",
    },
  },
  fonts: {
    heading: `'Rhodium Libre', sans-serif`,
    body: `'Rhodium Libre', sans-serif`,
  },

  components: {
    Text: {
      baseStyle: {
        color: "text.500",
      },
    },
    Link: {
      baseStyle: {
        color: "accent.500",
        _hover: {
          color: "interactive.500",
          textDecoration: "none",
        },
      },
    },
    Button: {
      baseStyle: {
        color: "text.500",
        _hover: {
          bg: "interactive.500",
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "accent.500" : "primary.500",
          _hover: {
            bg: "interactive.500",
          },
        }),
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "primary.500",
        color: "text.500",
      },
      a: {
        color: "accent.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
