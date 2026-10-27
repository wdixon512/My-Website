import {
  Box,
  Heading,
  Stack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { WorkExperienceItem } from "./WorkExperienceItem";

export const Resume = () => {
  return (
    <Stack mt={10} gap="12">
      <Box>
        <Heading as="h2" mb={6}>
          Certifications
        </Heading>
        <UnorderedList>
          <ListItem>Kentico 13 Developer</ListItem>
          <ListItem>Xperience by Kentico Developer</ListItem>
        </UnorderedList>
      </Box>
      <Box>
        <Heading as="h2" mb={6}>
          Skills
        </Heading>
        <UnorderedList>
          <ListItem>C#</ListItem>
          <ListItem>.NET/ASP.NET Core</ListItem>
          <ListItem>React</ListItem>
          <ListItem>TypeScript</ListItem>
          <ListItem>Next.js</ListItem>
          <ListItem>SQL Server</ListItem>
          <ListItem>Azure</ListItem>
          <ListItem>CQRS</ListItem>
          <ListItem>CI/CD</ListItem>
          <ListItem>AI-assisted development</ListItem>
        </UnorderedList>
      </Box>
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
            company="BDO"
            role="Software Engineer II"
            startDate="Apr 2026"
            endDate="Present"
            link="https://www.bdo.com/"
          >
            <UnorderedList>
              <ListItem>
                Led the www.bdo.com relaunch with an external vendor and large
                enterprise team, delivering 2 weeks ahead of schedule
              </ListItem>
              <ListItem>
                Migrated Kentico 13 to Xperience by Kentico
              </ListItem>
              <ListItem>
                AI-assisted development and custom features throughout the
                engagement
              </ListItem>
              <ListItem>
                Received repeated kudos from leadership
              </ListItem>
            </UnorderedList>
          </WorkExperienceItem>
          <WorkExperienceItem
            company="XTG (Xponential Technology Group)"
            role="Web Application Engineer III"
            startDate="May 2025"
            endDate="Feb 2026"
            link="https://www.rfmw.com/"
          >
            <UnorderedList>
              <ListItem>
                Led full ecommerce Xperience by Kentico build for rfmw.com,
                migrated from Kentico 13
              </ListItem>
              <ListItem>
                Catalog of 1M+ SKUs with CQRS on Azure
              </ListItem>
              <ListItem>
                ERP/PIM/CRM pipelines and integrations
              </ListItem>
              <ListItem>
                Faceted search, cart, and checkout
              </ListItem>
            </UnorderedList>
          </WorkExperienceItem>
          <WorkExperienceItem
            company="BIZSTREAM"
            role="Full Stack Web Developer"
            startDate="May 2022"
            endDate="May 2025"
            link="https://www.bizstream.com/"
            imageSrc="/static/images/bizstream-logo.png"
          >
            <UnorderedList>
              <ListItem>
                Full-stack CMS web development with Kentico & Kontent.AI
              </ListItem>
              <ListItem>
                Tech lead for 15+ clients
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
                Mentor and frequent client-communicator
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
        </Stack>
      </Box>
    </Stack>
  );
};

export default Resume;
