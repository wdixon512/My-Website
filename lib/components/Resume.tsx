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

const SKILLS = [
  "C#",
  ".NET / ASP.NET Core",
  "React",
  "TypeScript",
  "Next.js",
  "SQL Server",
  "Azure",
  "CQRS",
  "CI/CD",
  "AI-assisted development",
];

const CERTIFICATIONS = [
  "Kentico 13 Developer",
  "Xperience by Kentico Developer",
];

export const Resume = () => {
  return (
    <VStack align="stretch" gap={{ base: 8, md: 10 }} w="full" maxW="820px" mx="auto">
      <Box>
        <Heading
          as="h2"
          fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" letterSpacing="-0.01em" textAlign="center"
          fontSize={{ base: "1.75rem", md: "2.25rem" }}
          mb={5}
          color="text.500"
        >
          Certifications
        </Heading>
        <VStack align="center" gap={3}>
          {CERTIFICATIONS.map((cert) => (
            <PowerUpBadge key={cert} label={cert} />
          ))}
        </VStack>
      </Box>

      <Box>
        <Heading
          as="h2"
          fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" letterSpacing="-0.01em" textAlign="center"
          fontSize={{ base: "1.75rem", md: "2.25rem" }}
          mb={5}
          color="text.500"
        >
          Skills
        </Heading>
        <Flex flexWrap="wrap" gap={3} justify="center">
          {SKILLS.map((skill) => (
            <PixelChip key={skill}>{skill}</PixelChip>
          ))}
        </Flex>
      </Box>

      <Box>
        <Heading
          as="h2"
          fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" letterSpacing="-0.01em" textAlign="center"
          fontSize={{ base: "1.75rem", md: "2.25rem" }}
          mb={5}
          color="text.500"
        >
          World Map — Experience
        </Heading>
        <VStack align="stretch" gap={6}>
          <LevelCard
            worldLabel="WORLD 1-1 / BDO"
            title="BDO"
            meta="Software Engineer II · Apr 2026 – Present"
            link="https://www.bdo.com/"
            imageSrc="/images/bdo-logo.svg"
            imageAlt="BDO"
          >
            <UnorderedList>
              <ListItem>
                Led the www.bdo.com relaunch with an external vendor and large
                enterprise team, delivering 2 weeks ahead of schedule
              </ListItem>
              <ListItem>Migrated Kentico 13 to Xperience by Kentico</ListItem>
              <ListItem>
                AI-assisted development and custom features throughout the
                engagement
              </ListItem>
              <ListItem>Received repeated kudos from leadership</ListItem>
            </UnorderedList>
          </LevelCard>

          <LevelCard
            worldLabel="WORLD 1-2 / XTG"
            title="XTG"
            meta="Web Application Engineer III · May 2025 – Feb 2026"
            link="https://www.xtgcorp.com/"
            imageSrc="/images/xtg-logo.png"
            imageAlt="XTG"
          >
            <UnorderedList>
              <ListItem>
                Led full ecommerce Xperience by Kentico build for rfmw.com,
                migrated from Kentico 13
              </ListItem>
              <ListItem>Catalog of 1M+ SKUs with CQRS on Azure</ListItem>
              <ListItem>ERP/PIM/CRM pipelines and integrations</ListItem>
              <ListItem>Faceted search, cart, and checkout</ListItem>
            </UnorderedList>
          </LevelCard>

          <LevelCard
            worldLabel="WORLD 1-3 / BizStream"
            title="BizStream"
            meta="Full Stack Web Developer · May 2022 – May 2025"
            link="https://www.bizstream.com/"
            imageSrc="/static/images/bizstream-logo.png"
            imageAlt="BizStream"
          >
            <UnorderedList>
              <ListItem>
                Full-stack CMS web development with Kentico &amp; Kontent.AI
              </ListItem>
              <ListItem>Tech lead for 15+ clients</ListItem>
              <ListItem>
                RESTful API integrations in .NET Core and React-based
                frameworks
              </ListItem>
              <ListItem>
                Mentored teammates and maintained CI/CD across company and
                client environments
              </ListItem>
            </UnorderedList>
          </LevelCard>

          <LevelCard
            worldLabel="WORLD 1-4 / Auto-Owners"
            title="Auto-Owners"
            meta="SQL Developer · Jan 2021 – May 2022"
            link="https://www.auto-owners.com/"
            imageSrc="/static/images/auto-owners-logo.png"
            imageAlt="Auto-Owners"
          >
            <UnorderedList>
              <ListItem>
                SQL Development for the Data Reporting Services team
              </ListItem>
              <ListItem>
                Generated, maintained, tested, and automated delivery of 100+
                company reports
              </ListItem>
              <ListItem>
                Used SSRS, FDS, SQL, TFS, and JIRA for reporting
              </ListItem>
            </UnorderedList>
          </LevelCard>
        </VStack>
      </Box>

      <Box>
        <Heading
          as="h2"
          fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" letterSpacing="-0.01em" textAlign="center"
          fontSize={{ base: "1.75rem", md: "2.25rem" }}
          mb={5}
          color="text.500"
        >
          Education
        </Heading>
        <LevelCard
          worldLabel="WORLD 2-1 / MSU"
          title="Michigan State University"
          meta="B.S. Computer Science, Minor in Cognitive Science · Aug 2017 – May 2021"
          link="https://www.msu.edu/"
          imageSrc="/static/images/msu-logo.png"
          imageAlt="Michigan State University"
        >
          <UnorderedList>
            <ListItem>GPA: 3.96/4.00</ListItem>
            <ListItem>
              Honors College State Scholarship for exceptional ACT scores (34
              overall)
            </ListItem>
            <ListItem>
              Dean&apos;s List all 8 semesters
            </ListItem>
          </UnorderedList>
        </LevelCard>
      </Box>
    </VStack>
  );
};

export default Resume;
