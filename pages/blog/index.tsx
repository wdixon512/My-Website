import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { GetStaticProps } from "next";
import { LevelCard } from "@lib/components/LevelCard";
import { PageShell } from "@lib/components/PageShell";
import { getAllPosts, PostMeta } from "@lib/blog/posts";

export const getStaticProps: GetStaticProps = async () => ({
  props: { posts: getAllPosts() },
});

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  return (
    <PageShell title="Blog" description="Posts by Will Dixon." intro="Notes on what I'm building.">
      {posts.length === 0 && (
        <Text color="text.500" fontSize="1rem">No posts yet. Check back soon.</Text>
      )}
      {posts.map((p, i) => (
        <NextLink key={p.slug} href={`/blog/${p.slug}`} style={{ textDecoration: "none" }}>
          <LevelCard
            worldLabel={`POST ${i + 1}${p.date ? ` / ${p.date}` : ""}${p.draft ? " / DRAFT" : ""}`}
            title={p.title}
            meta={p.summary}
            imageSrc="/static/images/static-star.png"
            imageAlt=""
          />
        </NextLink>
      ))}
    </PageShell>
  );
}
