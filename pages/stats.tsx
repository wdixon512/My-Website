import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { getSession } from "next-auth/react";
import SteamStats from "../components/SteamStats";
import { Session } from "next-auth";
import steamEndpoints from "@lib/steam-endpoints";
import SteamPlayerSummaryData from "@lib/models/steam/SteamPlayerSummaryData";

type StatsProps = {
  playerData: SteamPlayerSummaryData;
  session: Session;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const res = await fetch(
    steamEndpoints.getPlayerSummaries(session.user.steam.steamid)
  );

  const data = await res.json();

  return {
    props: {
      playerData: data.response.players[0] || null,
      session,
    },
  };
};

export function Stats(props: StatsProps) {
  const { playerData, session } = props;

  if (!session) {
    return `You're not authenticated`;
  }

  return (
    <Container>
      <Flex direction="column">
        <Heading>Gamer Stats</Heading>
        <SteamStats playerData={playerData}></SteamStats>
      </Flex>
    </Container>
  );
}

export default Stats;
