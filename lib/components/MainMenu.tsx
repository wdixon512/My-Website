import { Button, ChakraProps, Flex, Heading, Stack, Text } from "@chakra-ui/react";

export type MainMenuProps = ChakraProps;

export const MainMenu = (props: MainMenuProps) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      textAlign="center"
      px="6"
      py="16"
      bgImage="linear-gradient(180deg, rgba(20,30,48,0.85), rgba(36,59,85,0.75)), url('/static/images/coding-background2.jpg')"
      bgSize="cover"
      bgPosition="center"
      {...props}
    >
      <Heading as="h1" color="white" fontFamily="SM64" fontSize={{ base: "48", md: "64" }}>
        Will Dixon
      </Heading>
      <Text
        pt="4"
        color="white"
        fontFamily="Pixel"
        fontSize={{ base: "sm", md: "md" }}
        maxW="3xl"
      >
        Senior Full-Stack .NET/React Engineer · Xperience by Kentico specialist ·
        10+ years
      </Text>
      <Stack
        direction={{ base: "column", sm: "row" }}
        mt="8"
        gap="4"
        flexWrap="wrap"
        justify="center"
      >
        <Button
          as="a"
          href="/William_Dixon_Resume.pdf"
          download
          bg="marioRed.500"
          color="white"
          fontFamily="Pixel"
          _hover={{ bg: "marioRed.600" }}
        >
          Download Resume
        </Button>
        <Button
          as="a"
          href="https://www.linkedin.com/in/william-d-79529a138/"
          target="_blank"
          rel="noopener noreferrer"
          bg="secondary.500"
          color="white"
          fontFamily="Pixel"
        >
          LinkedIn
        </Button>
        <Button
          as="a"
          href="https://github.com/wdixon512"
          target="_blank"
          rel="noopener noreferrer"
          bg="secondary.500"
          color="white"
          fontFamily="Pixel"
        >
          GitHub
        </Button>
        <Button
          as="a"
          href="mailto:wdixon@will-dixon.com"
          bg="secondary.500"
          color="white"
          fontFamily="Pixel"
        >
          Email
        </Button>
      </Stack>
    </Flex>
  );
};
