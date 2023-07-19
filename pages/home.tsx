import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";

export function Home({ Component, pageProps }) {
  return (
    <Flex
      className="typewriter"
      direction="column"
      bgImage="/static/images/Mario.gif"
      justify="start"
      align="center"
      textAlign="center"
      height={"100vh"}
      pt="12"
      bgSize="contain"
    >
      <Flex direction="column" w="fit-content">
        <Heading as="h1" color="white">
          Welcome
        </Heading>
        <Text pt="4" color="white">
          Press any button to begin...
        </Text>
      </Flex>
    </Flex>
  );
}

export default Home;
