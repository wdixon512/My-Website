import { Heading, Link, Stack, Text, UnorderedList, ListItem } from "@chakra-ui/react";

export const Projects = () => {
  return (
    <Stack mt={10} gap="10" align="start" w="full">
      <Stack gap="3" align="start">
        <Heading as="h3" fontSize="2xl" fontFamily="Pixel">
          <Link href="https://dmsquire.com" isExternal>
            DM Squire
          </Link>
        </Heading>
        <Text>
          D&amp;D 5e combat tracker built with Next.js and Firebase.
        </Text>
        <UnorderedList>
          <ListItem>
            Live at{" "}
            <Link href="https://dmsquire.com" isExternal color="marioRed.500">
              dmsquire.com
            </Link>
          </ListItem>
          <ListItem>Next.js + Firebase</ListItem>
        </UnorderedList>
      </Stack>
      <Stack gap="3" align="start">
        <Heading as="h3" fontSize="2xl" fontFamily="Pixel">
          <Link href="https://ahprice.com" isExternal>
            ahprice
          </Link>
        </Heading>
        <Text>
          WoW Forever auction-price addon, helper app, price site, and public
          MCP server.
        </Text>
        <UnorderedList>
          <ListItem>
            Live at{" "}
            <Link href="https://ahprice.com" isExternal color="marioRed.500">
              ahprice.com
            </Link>
          </ListItem>
          <ListItem>Auction-price addon, helper app, and price site</ListItem>
          <ListItem>Public MCP server</ListItem>
        </UnorderedList>
      </Stack>
    </Stack>
  );
};

export default Projects;
