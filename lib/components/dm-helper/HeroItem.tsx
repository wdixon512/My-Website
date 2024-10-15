import { Text, Flex, Button, FlexProps, Icon } from '@chakra-ui/react';
import AnimatedFlex from '@components/global/AnimatedFlex';
import { useContext } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import React from 'react';
import Hero from '@lib/models/dm-helper/Hero';
import { FaUserEdit } from 'react-icons/fa';

interface HeroItemProps extends FlexProps {
  hero: Hero;
  showInitiative?: boolean;
  showRemove?: boolean;
}

export const HeroItem: React.FC<HeroItemProps> = ({
  hero,
  showInitiative = true,
  showRemove = false,
  textColor,
  ...props
}) => {
  const { removeEntity } = useContext(DMHelperContext);

  return (
    <AnimatedFlex
      align="center"
      key={props.key}
      justify="space-between"
      p={2}
      borderBottomWidth={1}
      _hover={{ bg: 'secondary.600', cursor: 'pointer' }}
      className="group"
      {...props}
    >
      <Flex w="full">
        <Flex alignItems="center" flex="1" py={2}>
          <Text>
            {showInitiative && hero.initiative && (
              <Text as="span" fontWeight="800">
                ({hero.initiative})
              </Text>
            )}
            <Text as="span" fontWeight="800" textColor={textColor}>
              &nbsp;{hero.name}
            </Text>
          </Text>
        </Flex>
        <Flex flex="1" alignItems="center"></Flex>
      </Flex>
      {showRemove && (
        <Button variant="redSolid" onClick={() => removeEntity(hero)}>
          Remove
        </Button>
      )}
      {showInitiative && (
        <Button variant="primarySolid" onClick={() => console.log('edit')}>
          <Icon as={FaUserEdit} />
        </Button>
      )}
    </AnimatedFlex>
  );
};

export default HeroItem;
