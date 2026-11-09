import { Button, ChakraProps, Flex, Heading, Text } from "@chakra-ui/react";
import { MarioSky } from "./wow/MarioSky";

export type MainMenuProps = ChakraProps;

const secondaryButton = {
  variant: "quiet" as const,
  flex: { base: "1 1 0", sm: "0 0 auto" },
  minW: 0,
  w: { base: "auto", sm: "auto" },
  h: { base: "36px", sm: "40px" },
  px: { base: 1.5, sm: 4 },
  fontSize: { base: "0.8125rem", sm: "0.9375rem" },
  whiteSpace: "nowrap" as const,
  textDecoration: "none" as const,
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
      minH={{ base: "540px", md: "560px" }}
      w="full"
      {...props}
    >
      <MarioSky />
      <Flex className="wow-hero-copy" direction="column" align="center" w="full">
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
        <Flex
          direction={{ base: "column", sm: "row" }}
          mt="8"
          gap="3"
          justify="center"
          align={{ base: "stretch", sm: "center" }}
          w="full"
          maxW={{ base: "22rem", sm: "36rem" }}
        >
          <Button
            as="a"
            href="/William_Dixon_Resume.pdf"
            download
            data-track="resume_download"
            variant="mario"
            w={{ base: "full", sm: "auto" }}
            flexShrink={0}
            whiteSpace="nowrap"
            textDecoration="none"
          >
            Download Resume
          </Button>
          <Flex gap="2" w={{ base: "full", sm: "auto" }} justify="center">
            <Button
              as="a"
              href="https://www.linkedin.com/in/william-d-79529a138/"
              target="_blank"
              rel="noopener noreferrer"
              {...secondaryButton}
            >
              LinkedIn
            </Button>
            <Button
              as="a"
              href="https://github.com/wdixon512"
              target="_blank"
              rel="noopener noreferrer"
              {...secondaryButton}
            >
              GitHub
            </Button>
            <Button as="a" href="mailto:wdixon@will-dixon.com" data-track="hire_cta" {...secondaryButton}>
              Email
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
