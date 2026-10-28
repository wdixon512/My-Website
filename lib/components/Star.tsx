import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { GameContext } from "./contexts/GameContext";
import type { ChakraProps } from "@chakra-ui/react";
import StarLevel from "@lib/models/StarLevel";

export type StarsProps = ChakraProps & {
  star: StarLevel;
};

export const Star = (props: StarsProps) => {
  const { star } = props;
  const staticStar = "/static/images/static-star.png";
  const animatedStar = "/static/images/animated-star.gif";

  const { activeStar, setActiveStar, setHoveredStar } = useContext(GameContext);

  const [starSrc, setStarSrc] = useState(
    activeStar === star ? animatedStar : staticStar
  );

  useEffect(() => {
    if (!activeStar || activeStar.id !== star.id) {
      setStarSrc(staticStar);
    }
  }, [activeStar, star.id]);

  const isActive = activeStar?.id === star.id;

  return (
    <Flex direction="column" align="center" gap="2">
      <Button
        variant="unstyled"
        className="wow-bump"
        h="auto"
        minW="auto"
        p="0"
        aria-pressed={isActive}
        aria-label={`${star.title} section`}
        onMouseOver={() => {
          setStarSrc(animatedStar);
          setHoveredStar(star);
        }}
        onMouseOut={() => {
          setTimeout(() => {
            if (!activeStar || activeStar.id !== star.id) {
              setStarSrc(staticStar);
            }
          }, 500);
          setHoveredStar(null);
        }}
        onClick={() => {
          setActiveStar({ ...star, completed: true });
          setStarSrc(animatedStar);
        }}
      >
        <Box>
          <Image
            width={96}
            height={96}
            src={starSrc}
            alt=""
            aria-hidden
            style={{ width: "clamp(64px, 18vw, 96px)", height: "auto" }}
          />
        </Box>
      </Button>
      <Text fontFamily="Pixel" fontSize={{ base: "0.7rem", md: "0.85rem" }}>
        {star.title}
      </Text>
    </Flex>
  );
};

export default Star;
