import React from 'react';
import { Box, Text, Heading, Flex, Divider, List, ListItem, Badge } from '@chakra-ui/react';
import { DetailedMob } from '@lib/models/dnd5eapi/DetailedMob';

interface MonsterCardProps {
  monster: DetailedMob;
}

const MonsterCard: React.FC<MonsterCardProps> = ({ monster }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} bg="gray.50">
      <Heading size="lg" mb={3} textAlign="center">
        {monster.name}
      </Heading>
      <Text fontSize="md" textAlign="center" color="gray.600" mb={3}>
        {monster.size} {monster.type}, {monster.alignment}
      </Text>

      <Divider my={3} />

      <Flex justifyContent="space-between" mb={3}>
        <Box>
          <Text>
            <strong>Armor Class:</strong> {monster.armor_class[0].value} ({monster.armor_class[0].type})
          </Text>
          <Text>
            <strong>Hit Points:</strong> {monster.hit_points} ({monster.hit_dice})
          </Text>
          <Text>
            <strong>Speed:</strong> Walk {monster.speed.walk}, Climb {monster.speed.climb}
          </Text>
        </Box>
        <Box>
          <Text>
            <strong>Challenge:</strong> {monster.challenge_rating} ({monster.xp} XP)
          </Text>
          <Text>
            <strong>Proficiency Bonus:</strong> +{monster.proficiency_bonus}
          </Text>
        </Box>
      </Flex>

      <Divider my={3} />

      <Flex justifyContent="space-around" textAlign="center" mb={3}>
        <Box>
          <Text>
            <strong>STR:</strong> {monster.strength} ({Math.floor((monster.strength - 10) / 2)})
          </Text>
          <Text>
            <strong>DEX:</strong> {monster.dexterity} ({Math.floor((monster.dexterity - 10) / 2)})
          </Text>
          <Text>
            <strong>CON:</strong> {monster.constitution} ({Math.floor((monster.constitution - 10) / 2)})
          </Text>
        </Box>
        <Box>
          <Text>
            <strong>INT:</strong> {monster.intelligence} ({Math.floor((monster.intelligence - 10) / 2)})
          </Text>
          <Text>
            <strong>WIS:</strong> {monster.wisdom} ({Math.floor((monster.wisdom - 10) / 2)})
          </Text>
          <Text>
            <strong>CHA:</strong> {monster.charisma} ({Math.floor((monster.charisma - 10) / 2)})
          </Text>
        </Box>
      </Flex>

      <Divider my={3} />

      <Box mb={3}>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Skills & Senses
        </Text>
        <List spacing={2}>
          {monster.proficiencies.map((prof) => (
            <ListItem key={prof.proficiency.index}>
              <Badge colorScheme="teal" mr={2}>
                {prof.proficiency.name}
              </Badge>{' '}
              +{prof.value}
            </ListItem>
          ))}
          <ListItem>
            <strong>Senses:</strong> Darkvision {monster.senses.darkvision}, Passive Perception{' '}
            {monster.senses.passive_perception}
          </ListItem>
        </List>
      </Box>

      <Divider my={3} />

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Traits
        </Text>
        <List spacing={2}>
          {monster.special_abilities.map((ability, index) => (
            <ListItem key={index}>
              <Text fontWeight="bold">{ability.name}:</Text> {ability.desc}
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider my={3} />

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Actions
        </Text>
        <List spacing={2}>
          {monster.actions.map((action, index) => (
            <ListItem key={index}>
              <Text fontWeight="bold">{action.name}:</Text> {action.desc}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default MonsterCard;
