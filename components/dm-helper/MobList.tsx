import { Box, Button, Text, Flex, FormControl, FormLabel, Input, List } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import { sortMobs } from "@lib/util/mobUtils";
import Mob from "@lib/models/Mob";

export const MobList = () => {
    const { mobs, removeMob, setMobs } = useContext(DMHelperContext);

    const updateHealth = (mob: Mob, newHealth) => {
        setMobs(
            mobs.map((m) =>
                m.id === mob.id && m.mobName == mob.mobName ? { ...m, mobHealth: newHealth } : m
            )
        );
    };

    const killMob = (mob: Mob) => {
        removeMob(mob);
    }

    return (
        <Box p={4} bg='secondary.200' borderWidth={1} borderRadius="md" shadow="md" minW={{ base: '100%', lg: '500px' }} >
            <List>
                {sortMobs(mobs).map((mob, index) => (
                    <Flex key={index} justify="space-between" align="center" p={2} borderBottomWidth={1}>
                        <Flex w="full">
                            <Flex alignItems='center' flex="1">
                                <Text >
                                    Mob: <Text as="span" fontWeight='800'>&nbsp;{mob.mobName} {mob.id}</Text>,
                                </Text>
                            </Flex>
                            <Flex flex="1" alignItems='center'>
                                <Text>
                                    Health:
                                </Text>
                                <FormControl >
                                    <Input
                                        type="number"
                                        fontWeight='800'
                                        value={mob.mobHealth}
                                        onChange={(e) => updateHealth(mob, parseInt(e.target.value))}
                                        w="90px"
                                        ml={2} />
                                </FormControl>
                            </Flex>
                        </Flex>
                        <Button variant="redSolid" onClick={() => killMob(mob)}>
                            Kill
                        </Button>
                    </Flex>
                ))}
            </List>
        </Box >
    );
}