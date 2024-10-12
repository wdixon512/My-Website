import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";

export const MobForm = () => {
  const [name, setname] = useState("");
  const [health, sethealth] = useState<number | undefined>(undefined);
  const [initiative, setinitiative] = useState<number | undefined>(undefined);

  const { setEntities: setMobs, addMob } = useContext(DMHelperContext);

  const clearMobs = () => {
    setMobs([]);
  };

  const handleaddMob = (e) => {
    e.preventDefault();

    if (addMob(name, health, initiative)) {
      setname("");
      sethealth(undefined);
      setinitiative(undefined);
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
      onSubmit={handleaddMob}
    >
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Name</FormLabel>
        <Input
          type="text"
          value={name}
          color="blackAlpha.700"
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter mob name"
          required={true}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Initiative</FormLabel>
        <Input
          type="number"
          color="blackAlpha.700"
          value={initiative}
          onChange={(e) => setinitiative(parseInt(e.target.value))}
          placeholder="Enter mob initiative"
          required={false}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Health</FormLabel>
        <Input
          type="number"
          color="blackAlpha.700"
          value={health}
          onChange={(e) => sethealth(parseInt(e.target.value))}
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
