import { Button, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { PageShell } from "@lib/components/PageShell";

export default function NotFoundPage() {
  return (
    <PageShell
      title="Page not found"
      description="That page doesn't exist on will-dixon.com."
      intro="404 — this page is missing. It may have moved, or the link might be wrong."
    >
      <Text color="text.500" fontSize="1rem">
        Try the home page, or use the menu to find projects, blog posts, and contact info.
      </Text>
      <Button
        as={NextLink}
        href="/home"
        className="wow-coin"
        bg="marioRed.700"
        color="white"
        fontFamily="Pixel"
        fontWeight="normal"
        border="2px solid"
        borderColor="marioRed.800"
        boxShadow="2px 2px 0 #1b2426"
        w="fit-content"
        _hover={{ bg: "marioRed.800" }}
      >
        Back home
      </Button>
    </PageShell>
  );
}
