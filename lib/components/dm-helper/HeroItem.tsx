import { Text, Flex, Button, FlexProps } from '@chakra-ui/react';
import AnimatedFlex from '@components/global/AnimatedFlex';
import { useContext } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import React from 'react';
import Hero from '@lib/models/dm-helper/Hero';

interface HeroItemProps extends FlexProps {
  hero: Hero;
  showInitiative?: boolean;
}

export const HeroItem: React.FC<HeroItemProps> = ({ hero, showInitiative = true, ...props }) => {
  const { removeEntity } = useContext(DMHelperContext);

  return (
    <AnimatedFlex
      align="center"
      key={props.key}
      justify="space-between"
      p={2}
      borderBottomWidth={1}
      _hover={{ bg: 'secondary.600', cursor: 'pointer' }}
      {...props}
    >
      <Flex w="full">
        <Flex alignItems="center" flex="1">
          <Text>
            {showInitiative && hero.initiative && (
              <Text as="span" fontWeight="800">
                ({hero.initiative})
              </Text>
            )}
            <Text as="span" fontWeight="800">
              &nbsp;{hero.name}
            </Text>
          </Text>
        </Flex>
        <Flex flex="1" alignItems="center"></Flex>
      </Flex>
      <Button variant="redSolid" onClick={() => removeEntity(hero)}>
        Remove
      </Button>
    </AnimatedFlex>
  );
};

export default HeroItem;
