import { Box, ChakraProps } from "@chakra-ui/react";

export type PixelChipProps = ChakraProps & {
  children: React.ReactNode;
};

export const PixelChip = ({ children, ...rest }: PixelChipProps) => {
  return (
    <Box
      as="span"
      display="inline-flex"
      alignItems="center"
      fontFamily="Pixel"
      fontSize={{ base: "0.65rem", md: "0.7rem" }}
      color="text.500"
      bg="primary.600"
      border="2px solid"
      borderColor="primary.800"
      boxShadow="2px 2px 0 #1b2426"
      px={3}
      py={2}
      lineHeight="1.4"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default PixelChip;
