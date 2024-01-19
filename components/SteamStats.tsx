import { Card, Flex, Heading, Img, Text } from "@chakra-ui/react";
import { PersonaState, SteamProfile } from "next-auth-steam";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getPlayerSummaries(steamId: string): Promise<any> {
  const res = await fetch(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`
  );
  const data = await res.json();
  return data;
}

export const SteamStats = () => {
  const { data, status } = useSession({
    required: true,
  });

  const steamUser: SteamProfile = data.user.steam;
  const { data: steamSummaryData, error } = useSWR(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamUser.steamId}`,
    fetcher
  );

  console.log(steamSummaryData);

  return (
    <Card bgColor={"lightSlate.500"} minH={300}>
      <Flex gap={4}>
        <Img src={steamUser.avatar} />
        <Flex direction="column">
          <Text>{steamUser.personaname}</Text>
          <Text>{PersonaState[steamUser.personastate]}</Text>
        </Flex>
      </Flex>
      <Flex>
        <Heading as="h3" size="lg">
          Games
        </Heading>
      </Flex>
    </Card>
  );
};

export default SteamStats;
