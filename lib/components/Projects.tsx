import { Heading, UnorderedList, ListItem, VStack } from "@chakra-ui/react";
import { LevelCard } from "./LevelCard";

export const Projects = () => {
  return (
    <VStack align="stretch" gap={6} w="full" maxW="820px" mx="auto">
      <Heading as="h2" textStyle="h2" textAlign="center">
        Projects
      </Heading>

      <LevelCard
        worldLabel="WORLD 3-1 / dm squire"
        title="dm squire"
        meta="D&D 5e combat tracker"
        link="https://dmsquire.com"
        projectSlug="dmsquire"
        imageSrc="/static/images/sword.png"
        imageAlt="dm squire"
      >
        <UnorderedList>
          <ListItem>Live at dmsquire.com</ListItem>
          <ListItem>Next.js + Firebase</ListItem>
          <ListItem>Real-time combat tracking for tabletop sessions</ListItem>
        </UnorderedList>
      </LevelCard>

      <LevelCard
        worldLabel="WORLD 3-2 / ahprice"
        title="ahprice"
        meta="WoW Forever auction-price toolkit"
        link="https://ahprice.com"
        projectSlug="ahprice"
        imageSrc="/static/images/knight.png"
        imageAlt="ahprice"
      >
        <UnorderedList>
          <ListItem>Live at ahprice.com</ListItem>
          <ListItem>Auction-price addon, helper app, and price site</ListItem>
          <ListItem>Public MCP server for price data</ListItem>
        </UnorderedList>
      </LevelCard>
    </VStack>
  );
};

export default Projects;
