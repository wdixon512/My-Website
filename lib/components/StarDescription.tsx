import {
  ChakraProps,
  Container,
  Flex,
  Heading,
  SlideFade,
  Text,
} from "@chakra-ui/react";
import { GameContext } from "./contexts/GameContext";
import { useContext, useEffect, useMemo } from "react";

export type StarDescriptionProps = ChakraProps;

export const StarDescription = (props: StarDescriptionProps) => {
  const { activeStar, hoveredStar } = useContext(GameContext);

  const starTitle = useMemo(() => {
    if (hoveredStar !== null) {
      return hoveredStar.title;
    } else if (activeStar !== null) {
      return activeStar.title;
    }

    return "";
  }, [activeStar, hoveredStar]);

  return (
    <SlideFade in={activeStar != null}>
      <Container maxW="container.xl">
        <Flex direction="column" align="center" mt="12">
          <Heading as="h1" fontFamily="SM64" fontSize="48" textAlign="center">
            {starTitle}
          </Heading>
          <Text whiteSpace="pre-line">
            {activeStar && activeStar.description}
          </Text>
        </Flex>
      </Container>
    </SlideFade>
  );
};
