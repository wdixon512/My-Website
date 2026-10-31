import { Button, ChakraProps, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { MarioSky } from "./wow/MarioSky";

export type MainMenuProps = ChakraProps;

const btn = {
  w: { base: "full", sm: "auto" },
  color: "white",
  fontFamily: "Pixel",
  fontSize: { base: "0.7rem", md: "0.8rem" },
  border: "2px solid",
  borderColor: "#1b2426",
  boxShadow: "3px 3px 0 #1b2426",
  className: "wow-coin",
} as const;

export const MainMenu = (props: MainMenuProps) => {
  return (
    <Flex
      className="wow-hero"
      direction="column"
      justify="center"
      align="center"
      textAlign="center"
      px={{ base: 4, md: 6 }}
      pt={{ base: 14, md: 24 }}
      pb={{ base: 24, md: 32 }}
      minH={{ base: "460px", md: "560px" }}
      w="full"
      {...props}
    >
      <MarioSky />
      <Heading
        as="h1"
        className="wow-hero-title"
        color="white"
        fontFamily="var(--font-heading), system-ui, sans-serif"
        fontWeight="800"
        letterSpacing="-0.02em"
        fontSize={{ base: "2.75rem", sm: "3.5rem", md: "5rem" }}
        lineHeight="1.05"
        px={1}
      >
        Will Dixon
      </Heading>
      <Text
        className="wow-hero-tag"
        mt="5"
        px={{ base: 4, md: 5 }}
        py={2}
        color="white"
        fontFamily="Pixel"
        fontSize={{ base: "0.7rem", md: "0.85rem" }}
        maxW="3xl"
        lineHeight="1.6"
      >
        Senior full-stack .NET and React · Xperience by Kentico · 10+ years
      </Text>
      <Stack
        direction={{ base: "column", sm: "row" }}
        mt="8"
        gap="3"
        flexWrap="wrap"
        justify="center"
        align="center"
        w="full"
        maxW="520px"
      >
        <Button
          as="a"
          href="/William_Dixon_Resume.pdf"
          download
          data-track="resume_download"
          {...btn}
          maxW="100%"
          bg="marioRed.700"
          px={{ base: 4, md: 6 }}
          whiteSpace="normal"
          h="auto"
          py={3}
          _hover={{ bg: "marioRed.800" }}
        >
          Download Resume
        </Button>
        <Button as="a" href="https://www.linkedin.com/in/william-d-79529a138/" target="_blank" rel="noopener noreferrer" {...btn} bg="secondary.500" _hover={{ bg: "secondary.400" }}>
          LinkedIn
        </Button>
        <Button as="a" href="https://github.com/wdixon512" target="_blank" rel="noopener noreferrer" {...btn} bg="secondary.500" _hover={{ bg: "secondary.400" }}>
          GitHub
        </Button>
        <Button as="a" href="mailto:wdixon@will-dixon.com" data-track="hire_cta" {...btn} bg="secondary.500" _hover={{ bg: "secondary.400" }}>
          Email
        </Button>
      </Stack>
    </Flex>
  );
};
