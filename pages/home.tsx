import { Fade, Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { Star } from "../components/Star";
import { GameContext } from "../components/contexts/GameContext";
import { MainMenu } from "../components/MainMenu";
import { STAR_LEVELS } from "../data/stars-data";
import { StarDescription } from "../components/StarDescription";

export function Home({ Component, pageProps }) {
  const { gameStarted, activeStar } = useContext(GameContext);
  return (
    <Flex direction="column">
      <MainMenu />
      <Fade in={gameStarted}>
        <Flex direction="column">
          <Heading
            textAlign="center"
            as="h1"
            fontFamily="SM64"
            fontSize="64"
            mt="12"
          >
            Select a Star to Learn More...
          </Heading>
          <Flex
            direction="row"
            justify="center"
            pt="12"
            alignContent="center"
            gap="24"
          >
            {STAR_LEVELS.map((star) => (
              <Star key={star.id} star={star} />
            ))}
          </Flex>
          <StarDescription />
        </Flex>
      </Fade>
    </Flex>
  );
}

export default Home;
