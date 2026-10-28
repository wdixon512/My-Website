import { Box, Button, Flex, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { getAllPosts, getPost, PostMeta } from "@lib/blog/posts";
import { TagChips } from "@lib/blog/TagChips";
import { Reveal } from "@lib/components/wow/Reveal";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPosts().map((p) => ({ params: { slug: p.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPost(String(params?.slug));
  if (!post) return { notFound: true };
  return { props: post };
};

const SITE = "https://www.will-dixon.com";

const formatDate = (d: string) =>
  d ? new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : "";

const panel = {
  bg: "secondary.500",
  border: "1px solid",
  borderColor: "primary.700",
  boxShadow: "4px 4px 0 #1b2426",
} as const;

const ShareButton = ({ url, title }: { url: string; title: string }) => {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  };
  return (
    <Button
      onClick={onClick}
      className="wow-coin"
      w="full"
      bg="marioRed.700"
      color="white"
      fontFamily="Pixel"
      fontWeight="normal"
      fontSize="0.75rem"
      border="2px solid"
      borderColor="#1b2426"
      boxShadow="3px 3px 0 #1b2426"
      _hover={{ bg: "marioRed.800" }}
    >
      <span aria-live="polite">{copied ? "Link copied!" : "Share / copy link"}</span>
    </Button>
  );
};

const Sidebar = ({ meta, url }: { meta: PostMeta; url: string }) => (
  <VStack as="aside" aria-label="About this post" align="stretch" gap={5} {...panel} p={5} color="text.500">
    <Flex align="center" gap={3}>
      <Box flexShrink={0} w="56px" h="56px" borderRadius="full" overflow="hidden" border="3px solid #ffd75c">
        <Image src="/images/will-about.jpg" alt="Will Dixon" width={56} height={56} style={{ objectFit: "cover", width: 56, height: 56 }} />
      </Box>
      <Box>
        <Text fontSize="0.875rem" color="text.600">Written by:</Text>
        <Text fontWeight="bold" fontSize="1.05rem">{meta.author}</Text>
      </Box>
    </Flex>
    <Box fontSize="1rem">
      <Text><time dateTime={meta.date}>{formatDate(meta.date)}</time></Text>
      <Text color="text.600">{meta.readingTime} min read</Text>
      {meta.draft && <Text color="#ffd75c" fontWeight="bold">DRAFT</Text>}
    </Box>
    <TagChips tags={meta.tags} />
    {meta.links.length > 0 && (
      <Box>
        <Heading as="h2" fontFamily="var(--font-heading), system-ui, sans-serif" fontWeight="800" fontSize="1.15rem" mb={2}>
          Related links
        </Heading>
        <VStack as="ul" listStyleType="none" align="stretch" gap={2} m={0} p={0}>
          {meta.links.map((l) => (
            <li key={l.url}>
              <Link href={l.url} isExternal color="#ffd75c" textDecoration="underline" fontSize="1rem">
                {l.label} ↗
              </Link>
            </li>
          ))}
        </VStack>
      </Box>
    )}
    <ShareButton url={url} title={meta.title} />
  </VStack>
);

export default function BlogPost({ meta, html }: { meta: PostMeta; html: string }) {
  const url = `${SITE}/blog/${meta.slug}`;
  return (
    <>
      <Head>
        <title>{`${meta.title} | Will Dixon`}</title>
        <meta name="description" content={meta.summary} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.summary} />
        <meta property="og:url" content={url} />
        {meta.cover && <meta property="og:image" content={`${SITE}${meta.cover.src}`} />}
        {meta.cover && <meta name="twitter:image" content={`${SITE}${meta.cover.src}`} />}
      </Head>

      <Box position="relative" w="full" className="wow-hero" bg="#1b2426">
        {meta.cover && (
          <Box position="relative" w="full" h={{ base: "220px", md: "380px", lg: "440px" }}>
            <Image src={meta.cover.src} alt={meta.cover.alt} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
            <Box position="absolute" inset={0} bg="linear-gradient(180deg, rgba(10,20,40,0) 35%, rgba(28,40,51,0.92) 100%)" />
          </Box>
        )}
        <Box
          maxW="1100px"
          mx="auto"
          px={{ base: 4, md: 6 }}
          mt={meta.cover ? { base: "-56px", md: "-96px" } : 0}
          pt={meta.cover ? 0 : 10}
          position="relative"
        >
          <Heading
            as="h1"
            className="wow-hero-title"
            color="white"
            fontFamily="var(--font-heading), system-ui, sans-serif"
            fontWeight="800"
            letterSpacing="-0.01em"
            fontSize={{ base: "2rem", md: "3rem" }}
            lineHeight="1.12"
            maxW="900px"
          >
            {meta.title}
          </Heading>
          {meta.summary && (
            <Text mt={3} maxW="760px" fontSize={{ base: "1.05rem", md: "1.2rem" }} color="text.600" lineHeight="1.6">
              {meta.summary}
            </Text>
          )}
        </Box>
      </Box>

      <Flex
        as="main"
        maxW="1100px"
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={{ base: 8, md: 12 }}
        gap={{ base: 6, lg: 10 }}
        direction={{ base: "column", lg: "row" }}
        align={{ base: "stretch", lg: "flex-start" }}
      >
        <Box order={{ base: 2, lg: 1 }} flex="1" minW={0}>
          <Reveal>
            <Box
              as="article"
              {...panel}
              px={{ base: 4, md: 8 }}
              py={{ base: 5, md: 8 }}
              color="text.500"
              fontSize={{ base: "1rem", md: "1.08rem" }}
              lineHeight="1.75"
              overflowWrap="anywhere"
              sx={{
                "& h2, & h3": { fontFamily: "var(--font-heading), system-ui, sans-serif", fontWeight: 800, lineHeight: 1.25, mt: 8, mb: 3 },
                "& h2": { fontSize: { base: "1.5rem", md: "1.75rem" } },
                "& h3": { fontSize: "1.25rem" },
                "& p": { mb: 4 },
                "& ul, & ol": { pl: 6, mb: 4 },
                "& li": { mb: 1 },
                "& a": { color: "#ffd75c", textDecoration: "underline" },
                "& strong": { color: "white" },
                "& pre": { overflowX: "auto", bg: "#101722", p: 3, mb: 4, borderRadius: "6px" },
                "& code": { fontFamily: "mono", fontSize: "0.92em", bg: "rgba(255,255,255,0.08)", px: 1, borderRadius: "4px" },
                "& pre code": { bg: "transparent", px: 0 },
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Reveal>
        </Box>
        <Box order={{ base: 1, lg: 2 }} w={{ base: "full", lg: "300px" }} flexShrink={0} position={{ lg: "sticky" }} top={{ lg: "104px" }}>
          <Sidebar meta={meta} url={url} />
        </Box>
      </Flex>
    </>
  );
}
