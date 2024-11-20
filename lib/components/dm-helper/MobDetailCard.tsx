import React from 'react';
import { Box, Text, Heading, Flex, Divider, List, ListItem, Badge, Img } from '@chakra-ui/react';
import { DetailedMob } from '@lib/models/dnd5eapi/DetailedMob';

interface MobDetailCardProps {
  mob: DetailedMob;
}

const MobDetailCard: React.FC<MobDetailCardProps> = ({ mob }) => {
  return (
    <Box height="90vh" overflowY="hidden">
      <iframe src={`https://www.aidedd.org/dnd/monstres.php?vo=${mob.index}`} width="100%" height="100%"></iframe>
    </Box>
    // <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} bg="gray.50">
    //   <Img src={`/static/images/d&d5e-mobs/${mob.index}.jpg`} alt={mob.name} mb={3} mx="auto" display="block" />
    //   <Heading size="lg" mb={3} textAlign="center" variant={'dark'}>
    //     {mob.name}
    //   </Heading>
    //   <Text variant={'dark'} fontSize="md" textAlign="center" color="gray.600" mb={3}>
    //     {mob.size} {mob.type}, {mob.alignment}
    //   </Text>

    //   <Divider my={3} />

    //   <Flex justifyContent="space-between" mb={3}>
    //     <Box>
    //       <Text variant={'dark'}>
    //         <strong>Armor Class:</strong> {mob.armor_class[0].value} ({mob.armor_class[0].type})
    //       </Text>
    //       <Text variant={'dark'}>
    //         <strong>Hit Points:</strong> {mob.hit_points} ({mob.hit_dice})
    //       </Text>
    //       <Text variant={'dark'}>
    //         <strong>Speed:</strong> Walk {mob.speed.walk}, Climb {mob.speed.climb}
    //       </Text>
    //     </Box>
    //     <Box>
    //       <Text variant={'dark'}>
    //         <strong>Challenge:</strong> {mob.challenge_rating} ({mob.xp} XP)
    //       </Text>
    //       <Text variant={'dark'}>
    //         <strong>Proficiency Bonus:</strong> +{mob.proficiency_bonus}
    //       </Text>
    //     </Box>
    //   </Flex>

    //   <Divider my={3} />

    //   <Flex justifyContent="space-around" textAlign="center" mb={3}>
    //     <Box>
    //       <Text variant={'dark'}>
    //         <strong>STR:</strong> {mob.strength} ({Math.floor((mob.strength - 10) / 2)})
    //       </Text>
    //       <Text variant={'dark'}>
    //         <strong>DEX:</strong> {mob.dexterity} ({Math.floor((mob.dexterity - 10) / 2)})
    //       </Text>
    //       <Text variant={'dark'}>
    //         <strong>CON:</strong> {mob.constitution} ({Math.floor((mob.constitution - 10) / 2)})
    //       </Text>
    //     </Box>
    //     <Box>
    //       <Text variant={'dark'}>
    //         <strong>INT:</strong> {mob.intelligence} ({Math.floor((mob.intelligence - 10) / 2)})
    //       </Text>
    //       <Text variant={'dark'}>
    //         <strong>WIS:</strong> {mob.wisdom} ({Math.floor((mob.wisdom - 10) / 2)})
    //       </Text>
    //       <Text variant={'dark'}>
    //         <strong>CHA:</strong> {mob.charisma} ({Math.floor((mob.charisma - 10) / 2)})
    //       </Text>
    //     </Box>
    //   </Flex>

    //   <Divider my={3} />

    //   <Box mb={3}>
    //     <Text variant={'dark'} fontSize="lg" fontWeight="bold" mb={1}>
    //       Skills & Senses
    //     </Text>
    //     <List spacing={2}>
    //       {mob.proficiencies.map((prof) => (
    //         <ListItem key={prof.proficiency.index}>
    //           <Badge colorScheme="teal" mr={2}>
    //             {prof.proficiency.name}
    //           </Badge>
    //           <Text as="span" variant="dark">
    //             +{prof.value}
    //           </Text>
    //         </ListItem>
    //       ))}
    //       <ListItem>
    //         <Text variant={'dark'}>
    //           <strong>Senses:</strong> Darkvision {mob.senses.darkvision}, Passive Perception{' '}
    //           {mob.senses.passive_perception}
    //         </Text>
    //       </ListItem>
    //     </List>
    //   </Box>

    //   <Divider my={3} />

    //   <Box>
    //     <Text variant={'dark'} fontSize="lg" fontWeight="bold" mb={1}>
    //       Traits
    //     </Text>
    //     <List spacing={2}>
    //       {mob.special_abilities.map((ability, index) => (
    //         <ListItem key={index}>
    //           <Text variant={'dark'} fontWeight="bold">
    //             {ability.name}:
    //           </Text>
    //           <Text variant={'dark'}>{ability.desc}</Text>
    //         </ListItem>
    //       ))}
    //     </List>
    //   </Box>

    //   <Divider my={3} />

    //   <Box>
    //     <Text variant={'dark'} fontSize="lg" fontWeight="bold" mb={1}>
    //       Actions
    //     </Text>
    //     <List spacing={2}>
    //       {mob.actions.map((action, index) => (
    //         <ListItem key={index}>
    //           <Text variant={'dark'} fontWeight="bold">
    //             {action.name}:
    //           </Text>
    //           <Text variant={'dark'}>{action.desc}</Text>
    //         </ListItem>
    //       ))}
    //     </List>
    //   </Box>
    // </Box>
  );
};

export default MobDetailCard;
