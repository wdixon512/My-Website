import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import SteamStats from "../components/SteamStats";
import { Session } from "next-auth";
import { PlayerSummary } from "@lib/models/steam/PlayerSummary";
import {
  fetchPlayerOwnedGames,
  fetchPlayerOwnedGamesWithAchievements,
  fetchPlayerSummaries,
} from "@lib/services/steamService";

type StatsProps = {
  ownedGames: Game[];
  playerData: PlayerSummary;
  session: Session;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/steam-login", // Adjust this path if your sign-in route is different
        permanent: false, // This redirect is not permanent
      },
    };
  }

  const playerSummaries = await fetchPlayerSummaries(
    session.user.steam.steamid
  );

  const ownedGames = await fetchPlayerOwnedGames(session.user.steam.steamid);

  return {
    props: {
      ownedGames: ownedGames || null,
      playerData: playerSummaries || null,
      session,
    },
  };
};

export function Stats(props: StatsProps) {
  const { ownedGames, playerData, session } = props;

  if (!session) {
    return `You're not authenticated`;
  }

  return (
    <Container>
      <Flex direction="column">
        <Heading>Gamer Stats</Heading>
        <SteamStats
          playerData={playerData}
          ownedGames={ownedGames}
        ></SteamStats>
      </Flex>
    </Container>
  );
}

export default Stats;
