import { Box, Button, Circle, Flex, Heading } from '@chakra-ui/react';
import { useContext } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import Mob from '@lib/models/dm-helper/Mob';
import { AnimatePresence } from 'framer-motion';
import AnimatedFlex from '../global/AnimatedFlex';

export const MobFavorites = () => {
  const { mobFavorites: mobFavorites, addMob, setMobFavorites, isClient } = useContext(DMHelperContext);

  const handleaddMob = (mob: Mob) => {
    addMob(mob.name, mob.health, mob.initiative);
  };

  const handleRemoveFavorite = (mob: Mob) => {
    setMobFavorites(mobFavorites.filter((m) => m !== mob));
  };

  const clearFavorites = () => {
    setMobFavorites([]);
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {isClient && mobFavorites && mobFavorites.length > 0 && (
          <AnimatedFlex direction="column" gap="4">
            <Flex direction="column" p={4} bg="gray.50" borderWidth={1} borderRadius="md" shadow="md" gap={2}>
              <Heading size="md" textAlign="center" textColor="primary.700" borderBottom={'2px solid'}>
                Quick Add
              </Heading>
              <Flex gap="4" justifyContent={'center'} flexWrap="wrap" maxW="300px">
                {mobFavorites.map((mob, i) => (
                  <Box position="relative">
                    <Button variant="outline" width="fit" onClick={() => handleaddMob(mob)}>
                      {mob.name}
                    </Button>
                    <Circle
                      size="4"
                      bg="marioRed.500"
                      color="white"
                      position="absolute"
                      top="0"
                      right="0"
                      transform="translate(40%, -40%)"
                      p="0"
                    >
                      <Button
                        onClick={() => handleRemoveFavorite(mob)}
                        size="sm"
                        borderRadius="full"
                        w="100%"
                        h="100%"
                        bg="transparent"
                        color="white"
                        fontSize={8}
                        lineHeight={8}
                        p="0"
                        _hover={{ bg: 'transparent' }}
                        _focus={{ boxShadow: 'none' }}
                      >
                        X
                      </Button>
                    </Circle>
                  </Box>
                ))}
              </Flex>
              <Flex justifyContent={'center'} mt="4">
                <Button color="marioRed.700" variant="redLink" onClick={clearFavorites}>
                  Clear Quick Add
                </Button>
              </Flex>
            </Flex>
          </AnimatedFlex>
        )}
      </AnimatePresence>
    </>
  );
};
