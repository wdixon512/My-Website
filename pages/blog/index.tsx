import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";
import { PageShell } from "@lib/components/PageShell";
import { TagChips } from "@lib/blog/TagChips";
import { getAllPosts, PostMeta } from "@lib/blog/posts";

export const getStaticProps: GetStaticProps = async () => ({
  props: { posts: getAllPosts() },
  revalidate: 60,
});

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  return (
    <PageShell title="Blog" description="Posts by Will Dixon." intro="Notes on what I'm building.">
      {posts.length === 0 && <Text color="text.500" fontSize="1rem">No posts yet. Check back soon.</Text>}
      {posts.map((p, i) => (
        <Box
          key={p.slug}
          as="article"
          className="wow-card"
          position="relative"
          bg="secondary.500"
          border="1px solid"
          borderColor="primary.700"
          boxShadow="4px 4px 0 #1b2426"
          overflow="hidden"
        >
          {p.cover && (
            <Box position="relative" w="full" h={{ base: "160px", md: "220px" }}>
              <Image src={p.cover.src} alt="" fill sizes="(max-width: 820px) 100vw, 820px" style={{ objectFit: "cover" }} />
            </Box>
          )}
          <Flex direction="column" gap={3} px={{ base: 4, md: 6 }} py={{ base: 4, md: 5 }}>
            <Text fontFamily="Pixel" fontSize={{ base: "0.65rem", md: "0.75rem" }} color="marioRed.300">
              {`POST ${i + 1}${p.date ? ` / ${p.date}` : ""} / ${p.readingTime} MIN${p.draft ? " / DRAFT" : ""}`}
            </Text>
            <Heading
              as="h2"
              fontFamily="var(--font-heading), system-ui, sans-serif"
              fontWeight="800"
              fontSize={{ base: "1.4rem", md: "1.75rem" }}
              lineHeight="1.2"
              color="text.500"
            >
              <NextLink href={`/blog/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                {/* stretched link: whole card is clickable */}
                <Box as="span" position="absolute" inset={0} zIndex={1} aria-hidden="true" />
                {p.title}
              </NextLink>
            </Heading>
            {p.summary && <Text color="text.600" fontSize="1rem" lineHeight="1.6">{p.summary}</Text>}
            <TagChips tags={p.tags} />
          </Flex>
        </Box>
      ))}
    </PageShell>
  );
}
