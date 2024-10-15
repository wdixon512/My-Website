import { Text, Flex, FormControl, Input, Button, FlexProps } from '@chakra-ui/react';
import AnimatedFlex from '@components/global/AnimatedFlex';
import Mob from '@lib/models/dm-helper/Mob';
import { useContext, useState } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import React from 'react';

interface MobItemProps extends FlexProps {
  mob: Mob;
  handleDrop?: (id: string | number, x: number, y: number) => void;
}

export const MobItem: React.FC<MobItemProps> = ({ mob, handleDrop, ...props }) => {
  const { entities, removeEntity: removeMob, setEntities: setMobs } = useContext(DMHelperContext);

  const updateHealth = (mob: Mob, newHealth) => {
    setMobs(entities.map((m) => (m.id === mob.id ? new Mob(m.name, newHealth, m.number, m.initiative) : m)));
  };

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
            {mob.initiative && (
              <Text as="span" fontWeight="800">
                ({mob.initiative})
              </Text>
            )}
            <Text as="span" fontWeight="800">
              &nbsp;{mob.name} {mob.number > 1 ? `#${mob.number}` : ''}
            </Text>
          </Text>
        </Flex>
        <Flex flex="1" alignItems="center">
          <Text>Health:</Text>
          <FormControl>
            <Input
              type="number"
              fontWeight="800"
              value={mob.health}
              onChange={(e) => updateHealth(mob, parseInt(e.target.value))}
              w="90px"
              ml={2}
            />
          </FormControl>
        </Flex>
      </Flex>
      <Button variant="redSolid" onClick={() => removeMob(mob)}>
        Kill
      </Button>
    </AnimatedFlex>
  );
};

export default MobItem;
