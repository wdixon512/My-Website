import { Button, ChakraProps, Flex, Heading, Stack, Text } from "@chakra-ui/react";

export type MainMenuProps = ChakraProps;

export const MainMenu = (props: MainMenuProps) => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      textAlign="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 10, md: 16 }}
      w="full"
      overflow="hidden"
      bgImage="linear-gradient(180deg, rgba(20,30,48,0.85), rgba(36,59,85,0.75)), url('/static/images/coding-background2.jpg')"
      bgSize="cover"
      bgPosition="center"
      {...props}
    >
      <Heading
        as="h1"
        color="white"
        fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" letterSpacing="-0.01em"
        fontSize={{ base: "2.25rem", sm: "3rem", md: "4rem" }}
        lineHeight="1.1"
        px={1}
      >
        Will Dixon
      </Heading>
      <Text
        pt="4"
        color="white"
        fontFamily="Pixel"
        fontSize={{ base: "0.7rem", md: "0.85rem" }}
        maxW="3xl"
        lineHeight="1.6"
        px={1}
      >
        Senior Full-Stack .NET/React Engineer · Xperience by Kentico specialist ·
        10+ years
      </Text>
      <Stack
        direction={{ base: "column", sm: "row" }}
        mt="8"
        gap="3"
        flexWrap="wrap"
        justify="center"
        align="center"
        w="full"
        maxW="420px"
      >
        <Button
          as="a"
          href="/William_Dixon_Resume.pdf"
          download
          w={{ base: "full", sm: "auto" }}
          maxW="100%"
          bg="marioRed.500"
          color="white"
          fontFamily="Pixel"
          fontSize={{ base: "0.7rem", md: "0.8rem" }}
          px={{ base: 4, md: 6 }}
          whiteSpace="normal"
          h="auto"
          py={3}
          _hover={{ bg: "marioRed.600" }}
        >
          Download Resume
        </Button>
        <Button
          as="a"
          href="https://www.linkedin.com/in/william-d-79529a138/"
          target="_blank"
          rel="noopener noreferrer"
          w={{ base: "full", sm: "auto" }}
          bg="secondary.500"
          color="white"
          fontFamily="Pixel"
          fontSize={{ base: "0.7rem", md: "0.8rem" }}
        >
          LinkedIn
        </Button>
        <Button
          as="a"
          href="https://github.com/wdixon512"
          target="_blank"
          rel="noopener noreferrer"
          w={{ base: "full", sm: "auto" }}
          bg="secondary.500"
          color="white"
          fontFamily="Pixel"
          fontSize={{ base: "0.7rem", md: "0.8rem" }}
        >
          GitHub
        </Button>
        <Button
          as="a"
          href="mailto:wdixon@will-dixon.com"
          w={{ base: "full", sm: "auto" }}
          bg="secondary.500"
          color="white"
          fontFamily="Pixel"
          fontSize={{ base: "0.7rem", md: "0.8rem" }}
        >
          Email
        </Button>
      </Stack>
    </Flex>
  );
};
