import { Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

export function Stats({ Component, pageProps }) {
  const session = useSession({
    required: true,
  });

  if (session.status !== "authenticated") {
    return `You're not authenticated`;
  }

  return (
    <Flex>
      <Heading>Stats</Heading>
    </Flex>
  );
}

export default Stats;
