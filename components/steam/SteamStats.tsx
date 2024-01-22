import {
  Card,
  Flex,
  Box,
  Grid,
  Image,
  Text,
  Badge,
  Spinner,
  Link,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { PlayerSummary } from "@lib/models/steam/PlayerSummary";
import { PersonaState } from "next-auth-steam";
import { useSession } from "next-auth/react";
import { TopPlayedGames } from "./TopPlayedGames";

type SteamStatsProps = {
  playerData: PlayerSummary;
  ownedGames: Game[];
};

export const SteamStats = ({ playerData, ownedGames }: SteamStatsProps) => {
  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <Spinner color="blue.500" />;
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US");
  };

  const topPlayedGames = ownedGames
    .sort((a, b) => b.playtime_forever - a.playtime_forever)
    .slice(0, 3);

  return (
    <Card
      bgColor={"gray.700"}
      minH={300}
      p={5}
      borderRadius="lg"
      boxShadow="xl"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box>
          <Image src={playerData.avatar} borderRadius="full" boxSize="100px" />
          <Text fontSize="xl" fontWeight="bold" color="white">
            {playerData.personaname}
          </Text>
          <Badge colorScheme="green">
            {PersonaState[playerData.personastate]}
          </Badge>
          <Text color="gray.300">{playerData.realname}</Text>
          <Text color="gray.300">{playerData.loccountrycode}</Text>
        </Box>
        <Flex direction="column" justifyContent="center">
          <Text color="white">
            <Link
              href={playerData.profileurl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile URL
            </Link>
          </Text>
          <Text color="white">
            Last Logoff: {formatDate(playerData.lastlogoff)}
          </Text>
          <Text color="white">
            Account Created: {formatDate(playerData.timecreated)}
          </Text>
        </Flex>
        <TopPlayedGames topPlayedGames={topPlayedGames} />
      </Grid>
    </Card>
  );
};

export default SteamStats;
