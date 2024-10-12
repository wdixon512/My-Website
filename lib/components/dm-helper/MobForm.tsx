import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";

export const MobForm = () => {
  const [mobName, setMobName] = useState("");
  const [mobHealth, setMobHealth] = useState("");

  const { setMobs, addMob } = useContext(DMHelperContext);

  const clearMobs = () => {
    setMobs([]);
  };

  const handleAddMob = (e) => {
    e.preventDefault();

    if (addMob(mobName, mobHealth)) {
      setMobName("");
      setMobHealth("");
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
      onSubmit={handleAddMob}
    >
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Name</FormLabel>
        <Input
          type="text"
          value={mobName}
          color="blackAlpha.700"
          onChange={(e) => setMobName(e.target.value)}
          placeholder="Enter mob name"
          required={true}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel color="blackAlpha.900">Mob Health</FormLabel>
        <Input
          type="number"
          color="blackAlpha.700"
          value={mobHealth}
          onChange={(e) => setMobHealth(e.target.value)}
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
