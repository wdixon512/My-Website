import { Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";

type PageShellProps = {
  title: string;
  description: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
};

export const PageShell = ({ title, description, intro, children }: PageShellProps) => (
  <>
    <Head>
      <title>{`${title} | Will Dixon`}</title>
      <meta name="description" content={description} />
    </Head>
    <VStack
      as="main"
      align="stretch"
      gap={6}
      w="full"
      maxW="820px"
      mx="auto"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12 }}
      fontSize="1rem"
    >
      <Heading
        as="h1"
        fontFamily="SM64"
        fontSize={{ base: "1.75rem", md: "2.25rem" }}
        color="text.500"
      >
        {title}
      </Heading>
      {intro && (
        <Text fontSize={{ base: "1rem", md: "1.05rem" }} color="text.500" lineHeight="1.7">
          {intro}
        </Text>
      )}
      {children}
    </VStack>
  </>
);

export const Todo = ({ children }: { children: React.ReactNode }) => (
  <Text as="span" bg="#f4e4a6" color="#1b2426" px={1} fontWeight="bold">
    TODO: {children}
  </Text>
);

export default PageShell;
