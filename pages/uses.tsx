import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { PageShell, Todo } from "@lib/components/PageShell";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box
    as="section"
    bg="secondary.500"
    border="3px solid"
    borderColor="primary.700"
    boxShadow="4px 4px 0 #1b2426"
    px={{ base: 4, md: 6 }}
    py={{ base: 4, md: 5 }}
    color="text.500"
    fontSize={{ base: "1rem", md: "1.05rem" }}
    lineHeight="1.7"
  >
    <Heading as="h2" fontFamily="Pixel" fontWeight="normal" fontSize={{ base: "1rem", md: "1.25rem" }} mb={3}>
      {title}
    </Heading>
    <UnorderedList pl={2}>{children}</UnorderedList>
  </Box>
);

export default function UsesPage() {
  return (
    <PageShell
      title="Uses"
      description="The hardware, editor, tools and services Will Dixon uses."
      intro="The gear and software I use to build things."
    >
      <Section title="Hardware">
        <ListItem><Todo>computer, monitors, keyboard, mouse</Todo></ListItem>
      </Section>
      <Section title="Editor & Tools">
        <ListItem>Cursor (editor and AI agent)</ListItem>
        <ListItem>TypeScript, React and Next.js</ListItem>
        <ListItem>Chakra UI</ListItem>
        <ListItem><Todo>terminal, browser, other tools</Todo></ListItem>
      </Section>
      <Section title="Hosting & Services">
        <ListItem>Vercel (hosts this site)</ListItem>
        <ListItem>GitHub</ListItem>
        <ListItem>Firebase (dm squire)</ListItem>
        <ListItem><Todo>other services</Todo></ListItem>
      </Section>
    </PageShell>
  );
}
