import { Text, Flex, FormControl, Input, Button, FlexProps, Tooltip, Icon, useDisclosure } from '@chakra-ui/react';
import AnimatedFlex from '@components/global/AnimatedFlex';
import { Mob } from '@lib/models/dm-helper/Mob';
import { useContext, useState } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import React from 'react';
import { FaUserEdit } from 'react-icons/fa';
import EntityEditModal from './modals/EntityEditModal';

interface MobItemProps extends FlexProps {
  mob: Mob;
  handleDrop?: (id: string | number, x: number, y: number) => void;
}

export const MobItem: React.FC<MobItemProps> = ({ mob, handleDrop, textColor, ...props }) => {
  const { entities, removeEntity, updateEntities } = useContext(DMHelperContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateHealth = (mob: Mob, newHealth) => {
    updateEntities(entities.map((m) => (m.id === mob.id ? { ...m, health: newHealth } : m)));
  };

  const showEntityEditForm = () => {
    onOpen();
  };

  return (
    <AnimatedFlex
      role="group"
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
              <Text as="span" fontWeight="800" textColor={textColor}>
                ({mob.initiative})
              </Text>
            )}
            <Text as="span" fontWeight="800" textColor={textColor}>
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
              data-testid={`${mob.id.toLowerCase()}_health`}
            />
          </FormControl>
        </Flex>
        <Button
          variant="redSolid"
          onClick={() => removeEntity(mob)}
          mr={2}
          data-testid={`${mob.id.toLowerCase()}_kill`}
        >
          Kill
        </Button>
        <Tooltip label="Update Mob" aria-label="Update Mob" hasArrow>
          <Button
            variant="primarySolid"
            onClick={() => showEntityEditForm()}
            data-testid={`${mob.id.toLowerCase()}_edit`}
          >
            <Icon as={FaUserEdit} />
          </Button>
        </Tooltip>
      </Flex>

      <EntityEditModal entity={mob} isOpen={isOpen} onClose={onClose} />
    </AnimatedFlex>
  );
};

export default MobItem;
