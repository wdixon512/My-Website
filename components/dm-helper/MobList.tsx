"use client";
import {
  Box,
  Button,
  Text,
  Flex,
  FormControl,
  Input,
  List,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import { sortMobs } from "@lib/util/mobUtils";
import Mob from "@lib/models/Mob";
import { AnimatePresence, motion } from "framer-motion";

export const MobList = () => {
  const { mobs, removeMob, setMobs, isClient } = useContext(DMHelperContext);

  const updateHealth = (mob: Mob, newHealth) => {
    setMobs(
      mobs.map((m) =>
        m.id === mob.id && m.mobName == mob.mobName
          ? { ...m, mobHealth: newHealth }
          : m
      )
    );
  };

  const killMob = (mob: Mob) => {
    removeMob(mob);
  };

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
            {sortMobs(mobs).map((mob, index) => (
              <Flex
                as={motion.div}
                key={index}
                initial={{ opacity: 0, height: 0, overflow: "hidden" }}
                animate={{ opacity: 1, height: "100%" }}
                exit={{ opacity: 0, height: 0 }}
                transition="0.5s linear"
                justify="space-between"
                align="center"
                p={2}
                borderBottomWidth={1}
              >
                <Flex w="full">
                  <Flex alignItems="center" flex="1">
                    <Text>
                      <Text as="span" fontWeight="800">
                        &nbsp;{mob.mobName} {mob.id}
                      </Text>
                    </Text>
                  </Flex>
                  <Flex flex="1" alignItems="center">
                    <Text>Health:</Text>
                    <FormControl>
                      <Input
                        type="number"
                        fontWeight="800"
                        value={mob.mobHealth}
                        onChange={(e) =>
                          updateHealth(mob, parseInt(e.target.value))
                        }
                        w="90px"
                        ml={2}
                      />
                    </FormControl>
                  </Flex>
                </Flex>
                <Button variant="redSolid" onClick={() => killMob(mob)}>
                  Kill
                </Button>
              </Flex>
            ))}
          </AnimatePresence>
        </List>
      )}
    </Box>
  );
};
