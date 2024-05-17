import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
  VStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { WorkExperienceItem } from "./WorkExperienceItem";

export const Resume = () => {
  return (
    <Stack mt={10} gap="12">
      <Box>
        <Heading as="h2" mb={12}>
          Education
        </Heading>
        <WorkExperienceItem
          company="MICHIGAN STATE UNIVERSITY"
          role="B.S. Computer Science, Minor in Cognitive Science"
          startDate="Aug 2017"
          endDate="May 2021"
          link="https://www.msu.edu/"
          imageSrc="/static/images/msu-logo.png"
        >
          <UnorderedList flex={1} flexGrow={2}>
            <ListItem>GPA: 3.96/4.00</ListItem>
            <ListItem>
              Honors College State Scholarship: For exceptional ACT scores (34
              overall)
            </ListItem>
            <ListItem>
              Dean’s List: Selected for the MSU Dean's List all 8 semesters of
              college
            </ListItem>
          </UnorderedList>
        </WorkExperienceItem>
      </Box>
      <Box>
        <Heading as="h2" mb={12}>
          Work Experiences
        </Heading>
        <Stack gap="12">
          <WorkExperienceItem
            company="BIZSTREAM"
            role="Full Stack Web Developer"
            startDate="May 2022"
            endDate="Present"
            link="https://www.bizstream.com/"
            imageSrc="/static/images/bizstream-logo.png"
          >
            <UnorderedList>
              <ListItem>
                Full-stack CMS web development with Kentico & Kontent.AI
              </ListItem>
              <ListItem>
                Agile development over multiple projects from start to finish
                with JIRA
              </ListItem>
              <ListItem>
                RESTful API integrations in .NET Core and react-based
                frameworks/libraries
              </ListItem>
              <ListItem>
                Mentor, tech lead, and frequent client-communicator
              </ListItem>
              <ListItem>
                Maintenance of CI/CD across multiple company- and
                client-environments
              </ListItem>
            </UnorderedList>
          </WorkExperienceItem>
          <WorkExperienceItem
            company="AUTO-OWNERS INSURANCE"
            role="SQL Developer"
            startDate="Jan 2021"
            endDate="May 2022"
            link="https://www.auto-owners.com/"
            imageSrc="/static/images/auto-owners-logo.png"
          >
            <UnorderedList>
              <ListItem>
                SQL Development for the Data Reporting Services team
              </ListItem>
              <ListItem>
                Generated, maintained, tested, and automated delivery of 100+
                new and pre-existing company reports
              </ListItem>
              <ListItem>
                Use of SSRS, FDS, SQL, TFS, and JIRA for reporting
              </ListItem>
            </UnorderedList>
          </WorkExperienceItem>
          <WorkExperienceItem
            company="BS&A SOFTWARE"
            role="Software Developer Intern"
            startDate="Jan 2020"
            endDate="April 2020"
            link="https://www.bsasoftware.com/"
            imageSrc="/static/images/bsa-software-logo.png"
          >
            <UnorderedList>
              <ListItem>
                Developed a web application for the company to plan events with
                ASP.NET Framework and SQL backend
              </ListItem>
              <ListItem>
                Continued web development on a Trello-like workboard application
                with a team of three interns
              </ListItem>
              <ListItem>Collaborated with Visual Studio TFS</ListItem>
            </UnorderedList>
          </WorkExperienceItem>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Resume;
