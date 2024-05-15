import { Box, Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { DMHelperContext } from "../contexts/DMHelperContext";
import Mob from "@lib/models/Mob";

export const MobFavorites = () => {
    const { favorites, addMob, setFavorites } = useContext(DMHelperContext);

    const handleAddMob = (mob: Mob) => {
        addMob(mob.mobName, mob.mobHealth);
    }

    const clearFavorites = () => {
        setFavorites([]);
    }

    return (
        <>
            {favorites && favorites.length > 0 &&
                <Flex direction="column" gap="4">
                    <Flex direction="column" p={4} bg="gray.50" borderWidth={1} borderRadius="md" shadow="md">
                        {favorites.map((mob) => (
                            <Button variant='link' width="fit" onClick={() => handleAddMob(mob)}>
                                Quick Add: {mob.mobName}
                            </Button>
                        ))}
                        <Flex justifyContent={'center'} mt="4">
                            <Button color="marioRed.700" variant="redLink" onClick={clearFavorites}>
                                Clear Favorites
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            }
        </>
    )
        ;
}