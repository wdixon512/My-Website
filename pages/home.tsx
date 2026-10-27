import { Flex, Heading } from "@chakra-ui/react";
import { Star } from "@lib/components/Star";
import { MainMenu } from "@lib/components/MainMenu";
import { STAR_LEVELS } from "../data/stars-data";
import { StarDescription } from "@lib/components/StarDescription";

export function Home({ Component, pageProps }) {
  return (
    <Flex direction="column">
      <MainMenu />
      <Flex direction="column">
        <Heading
          textAlign="center"
          as="h2"
          fontFamily="SM64"
          fontSize="48"
          mt="12"
        >
          Select a section to learn more
        </Heading>
        <Flex
          direction="row"
          justify="center"
          pt="12"
          alignContent="center"
          gap="24"
          flexWrap="wrap"
        >
          {STAR_LEVELS.map((star) => (
            <Star key={star.id} star={star} />
          ))}
        </Flex>
        <StarDescription />
      </Flex>
    </Flex>
  );
}

export default Home;
