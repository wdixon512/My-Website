import { Button, ChakraProps, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { MarioSky } from "./wow/MarioSky";

export type MainMenuProps = ChakraProps;

const heroButton = {
  w: { base: "full", sm: "auto" },
  whiteSpace: "nowrap" as const,
};

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
      <Heading as="h1" className="wow-hero-title" textStyle="display" color="white" px={1}>
        Will Dixon
      </Heading>
      <Text
        mt="5"
        color="white"
        fontFamily="body"
        fontWeight="600"
        fontSize={{ base: "1rem", md: "1.125rem" }}
        maxW={{ base: "22rem", md: "46rem" }}
        lineHeight="1.5"
        textShadow="0 2px 0 #1a3f86"
        sx={{ textWrap: "balance" }}
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
        maxW="36rem"
      >
        <Button
          as="a"
          href="/William_Dixon_Resume.pdf"
          download
          data-track="resume_download"
          variant="mario"
          {...heroButton}
        >
          Download Resume
        </Button>
        <Button
          as="a"
          href="https://www.linkedin.com/in/william-d-79529a138/"
          target="_blank"
          rel="noopener noreferrer"
          variant="quiet"
          {...heroButton}
        >
          LinkedIn
        </Button>
        <Button
          as="a"
          href="https://github.com/wdixon512"
          target="_blank"
          rel="noopener noreferrer"
          variant="quiet"
          {...heroButton}
        >
          GitHub
        </Button>
        <Button as="a" href="mailto:wdixon@will-dixon.com" data-track="hire_cta" variant="quiet" {...heroButton}>
          Email
        </Button>
      </Stack>
    </Flex>
  );
};
