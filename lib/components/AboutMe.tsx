import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export const AboutMe = () => {
  return (
    <Stack
      direction="column"
      gap={6}
      align="center"
      w="full"
      maxW="820px"
      mx="auto"
    >
      <Heading
        as="h2"
        fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" letterSpacing="-0.01em" textAlign="center"
        fontSize={{ base: "1.75rem", md: "2.25rem" }}
        color="text.500"
        alignSelf="center"
      >
        About
      </Heading>
      <Box
        border="1px solid"
        borderColor="primary.700"
        boxShadow="4px 4px 0 #1b2426"
        lineHeight={0}
        overflow="hidden"
      >
        <Image
          src="/images/will-about.jpg"
          alt="Will Dixon"
          width={256}
          height={256}
        />
      </Box>
      <Text
        fontSize={{ base: "1rem", md: "1.05rem" }}
        color="text.500"
        lineHeight="1.7"
        alignSelf="stretch"
      >
        I&apos;m Will Dixon, a senior full-stack .NET and React engineer
        specializing in Xperience by Kentico. I earned my B.S. in Computer
        Science from Michigan State University in 2021 and have spent 10+ years
        building web applications for enterprise teams.
      </Text>
      <Text
        fontSize={{ base: "1rem", md: "1.05rem" }}
        color="text.500"
        lineHeight="1.7"
        alignSelf="stretch"
      >
        Outside of work I hike, explore new places, and stay involved in online
        communities—always looking for meaningful projects and experiences.
      </Text>
    </Stack>
  );
};
