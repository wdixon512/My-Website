import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';

export const MobForm = () => {
  const [name, setName] = useState('');
  const [health, setHealth] = useState<string>('');
  const [initiative, setInitiative] = useState<string>('');

  const { addMob, clearMobs } = useContext(DMHelperContext);

  const handleAddMob = (e) => {
    e.preventDefault();

    const parsedHealth = health === '' ? null : parseInt(health, 10);
    const parsedInitiative = initiative === '' ? null : parseInt(initiative, 10);

    if (addMob(name, parsedHealth, parsedInitiative)) {
      setName('');
      setHealth('');
      setInitiative('');
    }
  };

  return (
    <Box as="form" p={4} bg="gray.50" borderWidth={1} borderRadius="md" shadow="md" onSubmit={handleAddMob}>
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Name</FormLabel>
        <Input
          type="text"
          value={name}
          color="blackAlpha.700"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter mob name"
          required={true}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Initiative</FormLabel>
        <Input
          type="text"
          color="blackAlpha.700"
          value={initiative}
          onChange={(e) => setInitiative(e.target.value)}
          placeholder="Enter mob initiative"
          required={false}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Health</FormLabel>
        <Input
          type="text"
          color="blackAlpha.700"
          value={health}
          onChange={(e) => setHealth(e.target.value)}
          placeholder="Enter mob health"
          required={false}
        />
      </FormControl>
      <Button type="submit" variant="solid" width="full">
        Add Mob
      </Button>

      <Button variant="redLink" width="full" onClick={clearMobs} mt="4">
        Clear Mobs
      </Button>
    </Box>
  );
};
