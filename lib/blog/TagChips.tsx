import { Flex, Text } from "@chakra-ui/react";

export const TagChips = ({ tags }: { tags: string[] }) =>
  tags.length ? (
    <Flex as="ul" listStyleType="none" m={0} p={0} gap={2} wrap="wrap" aria-label="Tags">
      {tags.map((t) => (
        <Text
          as="li"
          key={t}
          fontSize="0.875rem"
          fontWeight="bold"
          px={3}
          py={1}
          borderRadius="999px"
          bg="rgba(255, 215, 92, 0.14)"
          color="#ffd75c"
          border="1px solid rgba(255, 215, 92, 0.4)"
        >
          #{t}
        </Text>
      ))}
    </Flex>
  ) : null;

export default TagChips;
