import React from "react";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { Achievements } from "./Achievements";

interface TopPlayedGamesProps {
  topPlayedGames: Game[];
}

export const TopPlayedGames: React.FC<TopPlayedGamesProps> = ({
  topPlayedGames,
}) => {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" mb={4}>
        Top Played Games
      </Text>
      {topPlayedGames.map((game) => (
        <Box
          key={game.appid}
          p={5}
          shadow="md"
          borderWidth="1px"
          borderRadius="md"
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
          >
            <Image
              src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
              alt={game.name}
              boxSize="50px"
              objectFit="cover"
              mr={4}
            />
            <Box flex="1">
              <Text fontWeight="bold">{game.name}</Text>
              <Text fontSize="sm">
                Playtime: {Math.round(game.playtime_forever / 60)} hours
              </Text>
            </Box>
          </Flex>
        </Box>
      ))}
      {/* <Achievements games={topPlayedGames} /> */}
    </VStack>
  );
};
