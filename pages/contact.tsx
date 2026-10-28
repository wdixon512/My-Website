import { Button, Flex, Text } from "@chakra-ui/react";
import { PageShell } from "@lib/components/PageShell";

const links = [
  { label: "Email me", href: "mailto:wdixon@will-dixon.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/william-d-79529a138/", external: true },
  { label: "GitHub", href: "https://github.com/wdixon512", external: true },
];

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="Get in touch with Will Dixon."
      intro="The best way to reach me is email. I'm open to remote roles."
    >
      <Flex gap={4} wrap="wrap">
        {links.map((l) => (
          <Button
            key={l.href}
            as="a"
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            bg="marioRed.700"
            color="white"
            fontFamily="Pixel"
            fontWeight="normal"
            border="2px solid"
            borderColor="marioRed.800"
            boxShadow="2px 2px 0 #1b2426"
            _hover={{ bg: "marioRed.800" }}
          >
            {l.label}
          </Button>
        ))}
      </Flex>
      <Text color="text.500" fontSize="1rem">wdixon@will-dixon.com</Text>
    </PageShell>
  );
}
