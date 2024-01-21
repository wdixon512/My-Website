import { Box, Flex } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { GameContext } from "./contexts/GameContext";
import type { ChakraProps } from "@chakra-ui/react";
import StarLevel from "../lib/models/StarLevel";

export type StarsProps = ChakraProps & {
  star: StarLevel;
};

export const Star = (props: StarsProps) => {
  const { star } = props;
  const staticStar = "/static/images/static-star.png";
  const animatedStar = "/static/images/animated-star.gif";

  const { activeStar, setActiveStar, hoveredStar, setHoveredStar } =
    useContext(GameContext);

  const [starSrc, setStarSrc] = useState(
    activeStar === star ? animatedStar : staticStar
  );

  useEffect(() => {
    if (!activeStar || activeStar.id !== star.id) {
      setStarSrc(staticStar);
    }
  }, [activeStar]);

  return (
    <Flex direction="column" align="center">
      <Box cursor="pointer">
        <Image
          width="128"
          height="128"
          src={starSrc}
          alt="star"
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
            if (!activeStar || activeStar.id !== star.id) {
              setActiveStar({ ...star, completed: true });
              setStarSrc(animatedStar);
            } else {
              setActiveStar(null);
            }
          }}
        />
      </Box>
    </Flex>
  );
};

export default Star;
