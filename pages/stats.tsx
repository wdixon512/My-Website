import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import SteamStats from "../components/SteamStats";

export function Stats() {
  const { status } = useSession({
    required: true,
  });

  if (status !== "authenticated") {
    return `You're not authenticated`;
  }

  return (
    <Container>
      <Flex direction="column">
        <Heading>Gamer Stats</Heading>
        <SteamStats></SteamStats>
      </Flex>
    </Container>
  );
}

export default Stats;
