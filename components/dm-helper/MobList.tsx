import { Box, Button, Text, Flex, FormControl, FormLabel, Input, List } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import { sortMobs } from "@lib/util/mobUtils";

export const MobList = () => {
    const { mobs } = useContext(DMHelperContext);

    return (
        <Box p={4} bg='secondary.200' borderWidth={1} borderRadius="md" shadow="md" minW={{ base: '100%', lg: '500px' }} >
            <List>
                {sortMobs(mobs).map((mob, index) => (
                    <Flex key={index} justify="space-between" align="center" p={2} borderBottomWidth={1}>
                        <Flex >Mob: <Text as="span" fontWeight='800'>&nbsp;{mob.mobName} {mob.id}</Text>, Health: <Text as="span" fontWeight='800'>&nbsp;{mob.mobHealth}</Text></Flex>
                    </Flex>
                ))}
            </List>
        </Box >
    );
}