import { Box, Flex, Text, ChakraProps } from "@chakra-ui/react";

export type PowerUpBadgeProps = ChakraProps & {
  label: string;
};

/** Mario-style power-up badge for certifications */
export const PowerUpBadge = ({ label, ...rest }: PowerUpBadgeProps) => {
  return (
    <Flex
      align="center"
      gap={3}
      bg="secondary.400"
      border="3px solid"
      borderColor="marioRed.600"
      boxShadow="3px 3px 0 #1b2426"
      px={4}
      py={3}
      maxW="820px"
      w="full"
      {...rest}
    >
      <Box
        w="36px"
        h="36px"
        flexShrink={0}
        borderRadius="full"
        bg="marioRed.500"
        border="3px solid"
        borderColor="#fff6c8"
        boxShadow="inset 2px 2px 0 #F87453, 2px 2px 0 #1b2426"
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          top: "6px",
          left: "8px",
          w: "8px",
          h: "6px",
          bg: "whiteAlpha.700",
          borderRadius: "full",
        }}
      />
      <Text
        fontFamily="Pixel"
        fontSize={{ base: "0.7rem", md: "0.8rem" }}
        color="text.500"
        lineHeight="1.45"
      >
        {label}
      </Text>
    </Flex>
  );
};

export default PowerUpBadge;
