import { Box, Container, Fade, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import Stars, { Star } from "../components/Star";
import { GameContext } from "../contexts/GameContext";
import { MainMenu } from "../components/MainMenu";
import { NUM_STARS } from "../data/stars-data";

export function Home({ Component, pageProps }) {
  const { gameStarted } = useContext(GameContext);
  return (
    <Flex direction="column">
      <MainMenu />
      <Fade in={gameStarted}>
        <Flex justify="center" pt="12" alignContent="center" gap="24">
          {Array(NUM_STARS)
            .fill(0)
            .map((_, index) => (
              <Star key={index} />
            ))}
        </Flex>
      </Fade>
    </Flex>
  );
}

export default Home;
