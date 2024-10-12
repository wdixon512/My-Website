import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";

export const HeroForm = () => {
    const [name, setName] = useState("");
    const [initiative, setInitiative] = useState<number | undefined>(undefined);

    const { setEntities, addHero } = useContext(DMHelperContext);

    const clearHeroes = () => {
        setEntities([]);
    };

    const handleAddHero = (e) => {
        e.preventDefault();

        if (addHero(name, undefined, initiative)) {
            setName("");
            setInitiative(undefined);
        }
    };

    return (
        <Box
            as="form"
            p={4}
            bg="gray.50"
            borderWidth={1}
            borderRadius="md"
            shadow="md"
            onSubmit={handleAddHero}
        >
            <FormControl mb={4}>
                <FormLabel color="blackAlpha.900">Hero Name</FormLabel>
                <Input
                    type="text"
                    value={name}
                    color="blackAlpha.700"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter hero name"
                    required={true}
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel color="blackAlpha.900">Hero Initiative</FormLabel>
                <Input
                    type="number"
                    color="blackAlpha.700"
                    value={initiative}
                    onChange={(e) => setInitiative(parseInt(e.target.value))}
                    placeholder="Enter hero initiative"
                    required={false}
                />
            </FormControl>
            <Button type="submit" variant="solid" width="full">
                Add Hero
            </Button>

            <Button variant="redLink" width="full" onClick={clearHeroes} mt="4">
                Clear Heroes
            </Button>
        </Box>
    );
};
