import { Box, List } from "@chakra-ui/react";
import { useContext } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import HeroItem from "./HeroItem";

export const HeroList = () => {
  const { heroes, setEntities, isClient } = useContext(DMHelperContext);

  return (
    <Box
      p={4}
      bg="secondary.200"
      borderWidth={1}
      borderRadius="md"
      shadow="md"
      w={{ base: "100%", lg: "500px" }}
    >
      {isClient && (
        <List>
          {heroes.map((hero, i) => (
            <HeroItem hero={hero} />
          ))}
        </List>
      )}
    </Box>
  );
};
