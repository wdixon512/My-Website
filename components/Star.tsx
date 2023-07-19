import { Box, Tooltip } from "@chakra-ui/react";
import { useContext, useState } from "react";
import Image from "next/image";
import { GameContext } from "./contexts/GameContext";
import type { ChakraProps } from "@chakra-ui/react";

export type StarsProps = ChakraProps;

export const Star = (props: StarsProps) => {
  const staticStar = "/static/images/static-star.png";
  const animatedStar = "/static/images/animated-star.gif";

  const { activeStar, setActiveStar } = useContext(GameContext);

  const isActiveStar = activeStar === this;

  // console.log("current star is active: ", isActiveStar);

  const [starSrc, setStarSrc] = useState(
    isActiveStar ? animatedStar : staticStar
  );

  return (
    <Tooltip label="Click me!" rounded="" bg="marioRed.500">
      <Image
        width="128"
        height="128"
        src={starSrc}
        alt="star"
        onMouseOver={() => setStarSrc(animatedStar)}
        onMouseOut={() => {
          setTimeout(() => {
            setStarSrc(staticStar);
          }, 500);
        }}
        onClick={() => {
          setActiveStar(this);
        }}
      />
    </Tooltip>
  );
};

export default Star;
