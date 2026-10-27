import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  ChakraProps,
} from "@chakra-ui/react";

export type LevelCardProps = ChakraProps & {
  worldLabel: string;
  title: string;
  meta?: string;
  link?: string;
  linkLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
  children?: React.ReactNode;
};

const pixelShadow =
  "4px 4px 0 #1b2426, -1px -1px 0 #1b2426, 1px -1px 0 #1b2426, -1px 1px 0 #1b2426";

export const LevelCard = (props: LevelCardProps) => {
  const {
    worldLabel,
    title,
    meta,
    link,
    linkLabel = "Visit ↗",
    imageSrc,
    imageAlt,
    children,
    ...rest
  } = props;

  return (
    <Box
      as="article"
      w="full"
      maxW="820px"
      bg="secondary.500"
      border="3px solid"
      borderColor="primary.700"
      boxShadow={pixelShadow}
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 5 }}
      {...rest}
    >
      <Text
        fontFamily="Pixel"
        fontSize={{ base: "0.65rem", md: "0.75rem" }}
        color="marioRed.300"
        letterSpacing="0.04em"
        mb={3}
      >
        {worldLabel}
      </Text>

      <Flex gap={{ base: 3, md: 4 }} align="flex-start">
        <Flex
          flexShrink={0}
          w="64px"
          h="64px"
          align="center"
          justify="center"
          bg="#f4e4a6"
          border="3px solid"
          borderColor="#c9a227"
          boxShadow="inset 2px 2px 0 #fff6c8, inset -2px -2px 0 #a8881a"
          p="6px"
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              w="full"
              h="full"
              objectFit="contain"
            />
          ) : (
            <Text
              fontFamily="Pixel"
              fontSize="xs"
              color="primary.700"
              textAlign="center"
              lineHeight="1.2"
            >
              ?
            </Text>
          )}
        </Flex>

        <VStack align="stretch" flex="1" minW={0} gap={2}>
          <Flex
            justify="space-between"
            align={{ base: "flex-start", sm: "center" }}
            gap={3}
            flexWrap="wrap"
          >
            <Heading
              as="h3"
              fontFamily="Pixel"
              fontSize={{ base: "1rem", md: "1.25rem" }}
              color="text.500"
              fontWeight="normal"
              lineHeight="1.35"
              textDecoration="none"
              borderBottom="none"
            >
              {title}
            </Heading>
            {link && (
              <Link
                href={link}
                isExternal
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${title} website`}
                fontFamily="Pixel"
                fontSize={{ base: "0.65rem", md: "0.7rem" }}
                color="text.500"
                bg="marioRed.600"
                px={3}
                py={1.5}
                border="2px solid"
                borderColor="marioRed.800"
                boxShadow="2px 2px 0 #1b2426"
                textDecoration="none"
                _hover={{
                  bg: "marioRed.500",
                  textDecoration: "none",
                  color: "text.500",
                }}
                whiteSpace="nowrap"
              >
                {linkLabel}
              </Link>
            )}
          </Flex>

          {meta && (
            <Text
              fontSize={{ base: "0.95rem", md: "1rem" }}
              color="text.600"
              lineHeight="1.5"
            >
              {meta}
            </Text>
          )}

          {children && (
            <Box
              fontSize={{ base: "1rem", md: "1.05rem" }}
              color="text.500"
              lineHeight="1.7"
              sx={{
                "& ul": { pl: 5, mt: 1 },
                "& li": { mb: 2 },
              }}
            >
              {children}
            </Box>
          )}
        </VStack>
      </Flex>
    </Box>
  );
};

export default LevelCard;
