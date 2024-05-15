import { Box, Button, Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";

export const MobForm = () => {

    const [mobName, setMobName] = useState('');
    const [mobHealth, setMobHealth] = useState('');

    const { mobs, setMobs } = useContext(DMHelperContext);

    const toast = useToast();

    const addMob = (e) => {
        e.preventDefault();

        if (mobName.trim() === '') {
            toast({
                title: 'Error',
                description: 'Mob name cannot be empty.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const health = parseInt(mobHealth);
        if (isNaN(health) || health <= 0) {
            toast({
                title: 'Error',
                description: 'Mob health must be a positive number.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setMobs([...mobs, { mobName, mobHealth: parseInt(mobHealth) }]);

        setMobName('');
        setMobHealth('');
    };

    const clearMobs = () => {
        setMobs([]);
    }

    return (
        <Box as="form" p={4} bg="gray.50" borderWidth={1} borderRadius="md" shadow="md" onSubmit={addMob}>
            <FormControl mb={4}>
                <FormLabel color='blackAlpha.900'>Mob Name</FormLabel>
                <Input
                    type="text"
                    value={mobName}
                    color='blackAlpha.700'
                    onChange={(e) => setMobName(e.target.value)}
                    placeholder="Enter mob name"
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel color='blackAlpha.900'>Mob Health</FormLabel>
                <Input
                    type="number"
                    color='blackAlpha.700'
                    value={mobHealth}
                    onChange={(e) => setMobHealth(e.target.value)}
                    placeholder="Enter mob health"
                />
            </FormControl>
            <Button type="submit" colorScheme="teal" width="full">
                Add Mob
            </Button>

            <Button colorScheme='red' width="full" onClick={clearMobs} mt='4'>
                Clear Mobs
            </Button>
        </Box>
    );
}