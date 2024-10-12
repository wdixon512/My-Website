import { Box, Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import Mob from "@lib/models/Mob";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedFlex from "../global/AnimatedFlex";

export const MobFavorites = () => {
  const { favorites, addMob, setFavorites, isClient } =
    useContext(DMHelperContext);

  const handleAddMob = (mob: Mob) => {
    addMob(mob.mobName, mob.mobHealth, mob.mobInitiative);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {isClient && favorites && favorites.length > 0 && (
          <AnimatedFlex direction="column" gap="4">
            <Flex
              direction="column"
              p={4}
              bg="gray.50"
              borderWidth={1}
              borderRadius="md"
              shadow="md"
            >
              {favorites.map((mob, i) => (
                <AnimatedFlex key={i} justifyContent="center">
                  <Button
                    variant="link"
                    width="fit"
                    onClick={() => handleAddMob(mob)}
                  >
                    Quick Add: {mob.mobName}
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
