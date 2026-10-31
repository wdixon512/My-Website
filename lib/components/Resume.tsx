import {
  Box,
  Flex,
  Heading,
  UnorderedList,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import { LevelCard } from "./LevelCard";
import { PixelChip } from "./PixelChip";
import { PowerUpBadge } from "./PowerUpBadge";
import {
  CERTIFICATIONS,
  EXPERIENCE_GROUPS,
  SKILLS,
} from "../../data/experience-data";

export const Resume = () => {
  return (
    <VStack
      align="stretch"
      gap={{ base: 8, md: 10 }}
      w="full"
      maxW="820px"
      mx="auto"
      minW={0}
    >
      <Box minW={0}>
        <Heading
          as="h2"
          fontFamily="var(--font-heading), system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="-0.01em"
          textAlign="center"
          fontSize={{ base: "1.75rem", md: "2.25rem" }}
          mb={5}
          color="text.500"
        >
          Certifications
        </Heading>
        <VStack align="center" gap={3} minW={0}>
          {CERTIFICATIONS.map((cert) => (
            <PowerUpBadge key={cert} label={cert} />
          ))}
        </VStack>
      </Box>

      <Box minW={0}>
        <Heading
          as="h2"
          fontFamily="var(--font-heading), system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="-0.01em"
          textAlign="center"
          fontSize={{ base: "1.75rem", md: "2.25rem" }}
          mb={5}
          color="text.500"
        >
          Skills
        </Heading>
        <Flex flexWrap="wrap" gap={3} justify="center" minW={0}>
          {SKILLS.map((skill) => (
            <PixelChip key={skill}>{skill}</PixelChip>
          ))}
        </Flex>
      </Box>

      {EXPERIENCE_GROUPS.map((group) => (
        <Box key={group.heading} minW={0}>
          <Heading
            as="h2"
            fontFamily="var(--font-heading), system-ui, sans-serif"
            fontWeight="800"
            letterSpacing="-0.01em"
            textAlign="center"
            fontSize={{ base: "1.75rem", md: "2.25rem" }}
            mb={5}
            color="text.500"
          >
            {group.heading}
          </Heading>
          <VStack align="stretch" gap={6} minW={0}>
            {group.entries.map((entry) => (
              <LevelCard
                key={`${group.heading}-${entry.worldLabel}`}
                worldLabel={entry.worldLabel}
                title={entry.title}
                meta={entry.meta}
                link={entry.link}
                imageSrc={entry.imageSrc}
                imageAlt={entry.imageAlt}
                minW={0}
              >
                {entry.bullets.length > 0 ? (
                  <UnorderedList>
                    {entry.bullets.map((bullet) => (
                      <ListItem key={bullet}>{bullet}</ListItem>
                    ))}
                  </UnorderedList>
                ) : null}
              </LevelCard>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default Resume;
