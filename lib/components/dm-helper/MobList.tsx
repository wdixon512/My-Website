import {
  Box,
  Button,
  Text,
  Flex,
  FormControl,
  Input,
  List,
} from "@chakra-ui/react";
import { useContext } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import { sortMobs } from "@lib/util/mobUtils";
import Mob from "@lib/models/Mob";
import { AnimatePresence } from "framer-motion";
import AnimatedFlex from "../global/AnimatedFlex";
import MobItem from "./MobItem";

export const MobList = () => {
  const { mobs, setMobs, isClient } = useContext(DMHelperContext);

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
          <AnimatePresence initial={false}>
            {sortMobs(mobs).map((mob: Mob, i) => (
              <MobItem key={i} mob={mob} />
            ))}
          </AnimatePresence>
        </List>
      )}
    </Box>
  );
};
