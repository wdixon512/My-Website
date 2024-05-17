import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

interface AchievementsProps {
  games: Game[];
}

export const Achievements: React.FC<AchievementsProps> = ({ games }) => {
  return (
    <Box>
      {games.map((game) => (
        <Box>
          {game.achievements.map((achievement) => (
            <Box key={achievement.apiname} p={2}>
              <Image src={""} alt={achievement.name} />
              <Text>{achievement.name}</Text>
              <Text fontSize="sm">{achievement.description}</Text>
              <Text fontSize="xs">
                {achievement.achieved ? "Unlocked" : "Locked"}
              </Text>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
