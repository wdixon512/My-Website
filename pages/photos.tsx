import { Center, Heading } from "@chakra-ui/react";

export function Photos() {
  return (
    <Center mt="12" as="main" px={4}>
      <Heading
        as="h1"
        fontFamily="var(--font-heading), system-ui, sans-serif"
        fontWeight="800"
        color="text.500"
        textAlign="center"
      >
        Photos Coming Soon!
      </Heading>
    </Center>
  );
}

export default Photos;
