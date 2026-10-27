import { Box, Flex, Heading } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Star } from "@lib/components/Star";
import { MainMenu } from "@lib/components/MainMenu";
import { STAR_LEVELS } from "../data/stars-data";
import { AboutMe } from "@lib/components/AboutMe";
import { Resume } from "@lib/components/Resume";
import { Projects } from "@lib/components/Projects";
import { GameContext } from "@lib/components/contexts/GameContext";

const SECTION_IDS = ["about", "experience", "projects"] as const;

function SectionHighlight({
  sectionId,
  children,
}: {
  sectionId: string;
  children: React.ReactNode;
}) {
  const { activeStar } = useContext(GameContext);
  const isHighlighted =
    activeStar &&
    SECTION_IDS[activeStar.id - 1] === sectionId;

  return (
    <Box
      id={sectionId}
      scrollMarginTop="96px"
      w="full"
      display="flex"
      justifyContent="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12 }}
    >
      {children}
    </Box>
  );
}

export function Home() {
  const { activeStar } = useContext(GameContext);

  useEffect(() => {
    if (!activeStar) return;
    const sectionId = SECTION_IDS[activeStar.id - 1];
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeStar]);

  return (
    <Flex direction="column" overflowX="hidden" w="full">
      <MainMenu />
      <Flex direction="column" align="center" px={{ base: 4, md: 6 }}>
        <Heading
          textAlign="center"
          as="h2"
          fontFamily="SM64"
          fontSize={{ base: "1.5rem", md: "2.5rem", lg: "3rem" }}
          mt={{ base: 8, md: 12 }}
          px={2}
          lineHeight="1.3"
          color="text.500"
        >
          Select a section to learn more
        </Heading>
        <Flex
          direction="row"
          justify="center"
          pt={{ base: 6, md: 12 }}
          alignContent="center"
          gap={{ base: 6, md: 16 }}
          flexWrap="wrap"
        >
          {STAR_LEVELS.map((star) => (
            <Star key={star.id} star={star} />
          ))}
        </Flex>
      </Flex>

      <SectionHighlight sectionId="about">
        <AboutMe />
      </SectionHighlight>
      <SectionHighlight sectionId="experience">
        <Resume />
      </SectionHighlight>
      <SectionHighlight sectionId="projects">
        <Projects />
      </SectionHighlight>
    </Flex>
  );
}

export default Home;
