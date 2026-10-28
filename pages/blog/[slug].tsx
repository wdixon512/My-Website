import { Box, Text } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { PageShell } from "@lib/components/PageShell";
import { getAllPosts, getPost, PostMeta } from "@lib/blog/posts";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPosts().map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPost(String(params?.slug));
  if (!post) return { notFound: true };
  return { props: post };
};

export default function BlogPost({ meta, html }: { meta: PostMeta; html: string }) {
  return (
    <PageShell title={meta.title} description={meta.summary}>
      <Text fontFamily="Pixel" fontSize="0.75rem" color="marioRed.300">
        {meta.date}{meta.draft ? " / DRAFT" : ""}
      </Text>
      <Box
        bg="secondary.500"
        border="3px solid"
        borderColor="primary.700"
        boxShadow="4px 4px 0 #1b2426"
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 6 }}
        color="text.500"
        fontSize={{ base: "1rem", md: "1.05rem" }}
        lineHeight="1.7"
        overflowWrap="anywhere"
        sx={{
          "& h2, & h3": { fontFamily: "Pixel", fontWeight: "normal", mt: 6, mb: 3 },
          "& p": { mb: 4 },
          "& ul, & ol": { pl: 6, mb: 4 },
          "& a": { textDecoration: "underline" },
          "& pre": { overflowX: "auto", bg: "#1b2426", p: 3, mb: 4 },
          "& code": { fontFamily: "mono", fontSize: "0.95em" },
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </PageShell>
  );
}
