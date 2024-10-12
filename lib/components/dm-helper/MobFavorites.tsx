import { Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import Mob from "@lib/models/dm-helper/Mob";
import { AnimatePresence } from "framer-motion";
import AnimatedFlex from "../global/AnimatedFlex";

export const MobFavorites = () => {
  const { mobFavorites: mobFavorites, addMob, setMobFavorites, isClient } =
    useContext(DMHelperContext);

  const handleaddMob = (mob: Mob) => {
    addMob(mob.name, mob.health, mob.initiative);
  };

  const clearFavorites = () => {
    setMobFavorites([]);
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {isClient && mobFavorites && mobFavorites.length > 0 && (
          <AnimatedFlex direction="column" gap="4">
            <Flex
              direction="column"
              p={4}
              bg="gray.50"
              borderWidth={1}
              borderRadius="md"
              shadow="md"
            >
              {mobFavorites.map((mob, i) => (
                <AnimatedFlex key={i} justifyContent="center">
                  <Button
                    variant="link"
                    width="fit"
                    onClick={() => handleaddMob(mob)}
                  >
                    Quick Add: {mob.name}
                  </Button>
                </AnimatedFlex>
              ))}
              <Flex justifyContent={"center"} mt="4">
                <Button
                  color="marioRed.700"
                  variant="redLink"
                  onClick={clearFavorites}
                >
                  Clear Favorites
                </Button>
              </Flex>
            </Flex>
          </AnimatedFlex>
        )}
      </AnimatePresence>
    </>
  );
};
