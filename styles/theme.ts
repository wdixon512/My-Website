import { extendTheme } from '@chakra-ui/react';

/**
 * Type roles:
 * - display / heading: Rhodium Libre (one weight; size is the hierarchy)
 * - body: Nunito, via --font-ui (nav, buttons, paragraphs)
 * - accent: Public Pixel, for chips and tiny labels only
 * - mario: SM64, same job as accent when a mark needs the game face
 */
const displayStack = `'Rhodium Libre', 'Iowan Old Style', Georgia, serif`;
const bodyStack = `var(--font-ui), 'Nunito', system-ui, sans-serif`;
const accentStack = `'Pixel', ui-monospace, monospace`;

const focusRing = {
  outline: '2px solid',
  outlineColor: 'coin',
  outlineOffset: '3px',
  boxShadow: 'none',
};

const theme = extendTheme({
  colors: {
    primary: {
      100: '#4f6b72',
      200: '#445d63',
      300: '#3a4f54',
      400: '#303f44',
      500: '#0b1020', // page background (deep navy)
      600: '#111827',
      700: '#26314a', // subtle borders
      800: '#1a2236',
    },
    secondary: {
      100: '#2e3943',
      200: '#28333d',
      300: '#222d37',
      400: '#1c2540',
      500: '#151c2e', // card surface
      600: '#10172a',
      700: '#101722',
      800: '#0a111c',
    },
    accent: {
      100: '#339aff',
      200: '#2f8ae5',
      300: '#2b79cc',
      400: '#2769b3',
      500: '#007BFF', // existing Electric Blue
      600: '#1f5a99',
      700: '#1b4a80',
      800: '#173966',
    },
    text: {
      100: '#ffffff',
      200: '#ffffff',
      300: '#ffffff',
      400: '#f8f8f8',
      500: '#FFFFFF', // high-contrast white on slate (WCAG AA)
      600: '#E8EEF0',
      700: '#d5d5d5',
      800: '#c5c5c5',
    },

    interactive: {
      100: '#72c472', // Lighter Green
      200: '#5db65d', // Slightly darker green
      300: '#48a848', // Darker green
      400: '#339a33', // Even darker green
      500: '#1e8a1e', // Darker green for better contrast
      600: '#1a7a1a', // Even darker for better contrast
      700: '#156b15',
      800: '#105b10',
    },
    error: {
      100: '#f75d68',
      200: '#f24c5a',
      300: '#ed3c4c',
      400: '#e82b3d',
      500: '#DC143C', // existing Crimson
      600: '#c41234',
      700: '#ac102c',
      800: '#940e24',
    },
    marioRed: {
      100: '#F87453',
      200: '#F76543',
      300: '#F65533',
      400: '#F54623',
      500: '#F54103', // existing marioRed
      600: '#D53B03',
      700: '#B53503',
      800: '#952F03',
    },
    lightSlate: {
      100: '#e6e6e6a1',
      200: '#dadada8e',
      300: '#cdcdcd7a',
      400: '#c1c1c167',
      500: '#d3d3d363', // existing lightSlate
      600: '#b7b7b750',
      700: '#aaaaaa3d',
      800: '#9e9e9e29',
    },
    coin: '#ffd75c',
  },
  fonts: {
    display: displayStack,
    heading: displayStack,
    body: bodyStack,
    accent: accentStack,
    mario: `'SM64', ${accentStack}`,
  },
  textStyles: {
    display: {
      fontFamily: 'display',
      fontWeight: 400,
      fontSize: { base: '2.75rem', md: '4.75rem' },
      lineHeight: 1.02,
      letterSpacing: '-0.02em',
    },
    h1: {
      fontFamily: 'heading',
      fontWeight: 400,
      fontSize: { base: '1.875rem', md: '2.5rem' },
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: 'heading',
      fontWeight: 400,
      fontSize: { base: '1.5rem', md: '1.875rem' },
      lineHeight: 1.22,
      letterSpacing: '-0.015em',
    },
    nav: {
      fontFamily: 'body',
      fontWeight: 600,
      fontSize: '0.9375rem',
      lineHeight: 1,
      letterSpacing: '0.012em',
    },
    accent: {
      fontFamily: 'accent',
      fontWeight: 400,
      fontSize: '0.6875rem',
      lineHeight: 1.4,
      letterSpacing: '0.04em',
    },
  },

  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 400,
        color: 'text.500',
        lineHeight: 1.2,
        letterSpacing: '-0.015em',
      },
      sizes: {
        unset: {},
      },
      defaultProps: {
        size: 'unset',
      },
      variants: {
        dark: () => ({
          color: 'blackAlpha.700',
        }),
      },
    },
    Text: {
      baseStyle: {
        color: 'text.500',
      },
      variants: {
        dark: (props) => ({
          color: 'blackAlpha.700',
        }),
      },
    },
    Link: {
      baseStyle: {
        color: 'accent.500',
        _hover: {
          color: 'interactive.500',
          textDecoration: 'none',
        },
        _focusVisible: focusRing,
      },
      variants: {
        nav: {
          color: 'text.600',
          textDecoration: 'none',
          _hover: {
            color: 'coin',
            textDecoration: 'none',
          },
          _focusVisible: focusRing,
          '&[aria-current="page"]': {
            color: 'coin',
          },
        },
      },
    },
    Button: {
      baseStyle: {
        color: 'text.500',
        _hover: {
          bg: 'interactive.100',
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'accent.500' : 'primary.500',
          color: 'white',
          _hover: {
            bg: 'interactive.500',
          },
        }),
        redSolid: (props) => ({
          bg: 'marioRed.700',
          color: 'white',
          _hover: {
            bg: 'marioRed.800',
          },
        }),
        outline: (props) => ({
          border: '2px solid',
          borderColor: props.colorMode === 'dark' ? 'accent.500' : 'primary.500',
          color: props.colorMode === 'dark' ? 'accent.500' : 'primary.500',
          _hover: {
            bg: props.colorMode === 'dark' ? 'accent.500' : 'primary.500',
            color: 'white',
          },
        }),
        ghost: (props) => ({
          color: props.colorMode === 'dark' ? 'accent.500' : 'primary.500',
          _hover: {
            bg: 'interactive.100',
          },
        }),
        link: (props) => ({
          color: props.colorMode === 'dark' ? 'accent.500' : 'primary.500',
          _hover: {
            textDecoration: 'underline',
            bg: 'transparent',
          },
        }),
        redLink: (props) => ({
          color: 'marioRed.700',
          _hover: {
            textDecoration: 'underline',
            bg: 'transparent',
          },
        }),
        mario: {
          bg: 'marioRed.700',
          color: 'white',
          fontFamily: 'body',
          fontWeight: 600,
          fontSize: '0.9375rem',
          letterSpacing: '0.01em',
          lineHeight: 1.2,
          borderRadius: '2px',
          border: '1px solid',
          borderColor: 'marioRed.800',
          boxShadow: '2px 2px 0 #1b120c',
          h: '40px',
          px: 4,
          _hover: {
            bg: 'marioRed.600',
          },
          _active: {
            bg: 'marioRed.800',
            boxShadow: 'none',
            transform: 'translateY(1px)',
          },
          _focusVisible: focusRing,
        },
        quiet: {
          bg: '#10172a',
          color: 'white',
          fontFamily: 'body',
          fontWeight: 600,
          fontSize: '0.9375rem',
          letterSpacing: '0.01em',
          lineHeight: 1.2,
          borderRadius: '2px',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.18)',
          h: '40px',
          px: 4,
          _hover: {
            bg: '#1a2438',
            borderColor: 'rgba(255, 215, 92, 0.55)',
          },
          _active: {
            bg: '#0b1020',
          },
          _focusVisible: focusRing,
        },
        subtle: (props) => ({
          bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
          color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'blackAlpha.900',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
          },
        }),
        destructive: (props) => ({
          bg: props.colorMode === 'dark' ? 'red.600' : 'red.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'red.700' : 'red.600',
          },
        }),
      },
    },
  },
  styles: {
    global: {
      html: {
        overflowX: 'clip',
      },
      body: {
        bg: 'primary.600',
        color: 'text.500',
        fontFamily: 'body',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: '1.7',
        overflowX: 'clip',
      },
      a: {
        color: 'accent.100',
        _hover: {
          textDecoration: 'underline',
        },
        _focusVisible: focusRing,
      },
    },
  },
});


export default theme;
