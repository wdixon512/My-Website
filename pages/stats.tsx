import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import SteamStats from "../components/SteamStats";
import { Session, getServerSession } from "next-auth";
import { PlayerSummary } from "@lib/models/steam/PlayerSummary";
import {
  fetchPlayerOwnedGames,
  fetchPlayerOwnedGamesWithAchievements,
  fetchPlayerSummaries,
} from "@lib/services/steamService";
import { NextApiRequest } from "next";
import { getAuthOptions } from "./api/auth/[...nextauth]";

type StatsProps = {
  ownedGames: Game[];
  playerData: PlayerSummary;
  session: Session;
};

export const getServerSideProps = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    getAuthOptions(context.req as NextApiRequest)
  );

  if (!session) {
    return {
      redirect: {
        destination: "/steam-login",
        permanent: false,
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
