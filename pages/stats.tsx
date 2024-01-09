import { Flex, Heading } from "@chakra-ui/react";
import steamRouter, { NextSteamAuthApiRequest } from "@lib/steamRouter";
import { NextApiResponse } from "next";

// make a getServerSideProps function that fetches the data from the API
export async function getServerSideProps({
  req,
  res,
}: {
  req: NextSteamAuthApiRequest;
  res: NextApiResponse;
}) {
  await steamRouter.run(req, res);

  console.log(req.user); // Shows the SteamProfile object in console.

  return { props: { user: req.user || null } };
}

export function Stats({ Component, pageProps }) {
  return (
    <Flex>
      <Heading>Stats</Heading>
    </Flex>
  );
}
