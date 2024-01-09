import { Flex, Heading } from "@chakra-ui/react";

// make a getServerSideProps function that fetches the data from the API
export async function getServerSideProps() {
  // call the Steam API to authorize/sign in
  //   const res = await fetch(
  //     "https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=6C7E8C5C7F6B9B6F6B9B1D1D5F5E7E5E&steamid=76561198045577318"
  //   );
  //   const data = await res.json();
  //   return {
  //     props: {
  //       data,
  //     },
  //   };
}

export function Stats({ Component, pageProps }) {
  return (
    <Flex>
      <Heading>Stats</Heading>
    </Flex>
  );
}
