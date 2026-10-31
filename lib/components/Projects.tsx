import { Heading, UnorderedList, ListItem, VStack } from "@chakra-ui/react";
import { LevelCard } from "./LevelCard";

export const Projects = () => {
  return (
    <VStack align="stretch" gap={6} w="full" maxW="820px" mx="auto">
      <Heading
        as="h2"
        fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" letterSpacing="-0.01em" textAlign="center"
        fontSize={{ base: "1.75rem", md: "2.25rem" }}
        color="text.500"
      >
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
