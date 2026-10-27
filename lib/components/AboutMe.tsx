import { Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export const AboutMe = () => {
  return (
    <Stack direction="column" gap="12" mt="12" align="center">
      <Image
        src="/static/images/bzs-me.jpg"
        alt="Will Dixon"
        width="256"
        height="256"
      />
      <Text>
        I&apos;m Will Dixon, a senior full-stack .NET and React engineer
        specializing in Xperience by Kentico. I earned my B.S. in Computer
        Science from Michigan State University in 2021 and have spent 10+ years
        building web applications for enterprise teams.
      </Text>
      <Text>
        Outside of work I hike, explore new places, and stay involved in online
        communities—always looking for meaningful projects and experiences.
      </Text>
    </Stack>
  );
};
