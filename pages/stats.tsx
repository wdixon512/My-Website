import {
  Box,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { authorizeStatsQuery } from "@lib/analytics/auth";
import { demoStats } from "@lib/analytics/demo";
import { buildStats } from "@lib/analytics/rollup";
import { hasRedis } from "@lib/analytics/store";
import type { NamedCount, StatsPayload } from "@lib/analytics/types";

type Props = {
  data: StatsPayload;
  token: string;
};

const panel = {
  bg: "secondary.500",
  border: "1px solid",
  borderColor: "primary.700",
  boxShadow: "4px 4px 0 #1b2426",
} as const;

function pct(rate: number | null): string {
  if (rate == null || !Number.isFinite(rate)) return "—";
  return `${Math.round(rate * 1000) / 10}%`;
}

function BarChart({
  days,
  valueKey,
  color,
}: {
  days: StatsPayload["days"];
  valueKey: "visitors" | "pageviews" | "conversions";
  color: string;
}) {
  const peak = Math.max(1, ...days.map((d) => d[valueKey]));
  return (
    <Flex align="flex-end" gap={1} h="140px" w="full" overflowX="auto" pb={1}>
      {days.map((d) => {
        const v = d[valueKey];
        const h = Math.max(v > 0 ? 8 : 2, Math.round((v / peak) * 120));
        return (
          <Flex
            key={d.day}
            direction="column"
            align="center"
            justify="flex-end"
            minW={{ base: "28px", md: "36px" }}
            flex="1"
            title={`${d.day}: ${v}`}
          >
            <Text fontSize="0.65rem" color="text.600" mb={1}>
              {v}
            </Text>
            <Box w="full" maxW="28px" h={`${h}px`} bg={color} borderRadius="2px" />
            <Text fontSize="0.55rem" color="text.700" mt={1} fontFamily="Pixel">
              {d.day.slice(5)}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

function RankTable({
  title,
  rows,
  nameLabel = "Name",
}: {
  title: string;
  rows: NamedCount[];
  nameLabel?: string;
}) {
  return (
    <Box {...panel} p={{ base: 4, md: 5 }} w="full">
      <Heading
        as="h2"
        fontFamily="var(--font-heading), system-ui, sans-serif"
        fontWeight="800"
        fontSize="1.15rem"
        mb={3}
      >
        {title}
      </Heading>
      {rows.length === 0 ? (
        <Text color="text.600" fontSize="0.95rem">
          No data yet.
        </Text>
      ) : (
        <Box overflowX="auto">
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th color="text.600" borderColor="primary.700">
                  {nameLabel}
                </Th>
                <Th isNumeric color="text.600" borderColor="primary.700">
                  Count
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((r) => (
                <Tr key={r.name}>
                  <Td borderColor="primary.700" color="text.500" maxW="220px" overflow="hidden" textOverflow="ellipsis">
                    {r.name}
                  </Td>
                  <Td isNumeric borderColor="primary.700" color="text.500">
                    {r.count}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Box {...panel} p={4}>
      <Text fontFamily="Pixel" fontSize="0.65rem" color="marioRed.300" mb={2}>
        {label}
      </Text>
      <Text
        fontFamily="var(--font-heading), system-ui, sans-serif"
        fontWeight="800"
        fontSize={{ base: "1.6rem", md: "1.85rem" }}
        color="text.500"
        lineHeight="1.1"
      >
        {value}
      </Text>
      {hint && (
        <Text mt={1} fontSize="0.85rem" color="text.600">
          {hint}
        </Text>
      )}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const auth = authorizeStatsQuery(ctx.query.token);
  if (auth === "missing" || auth === "denied") {
    return { notFound: true };
  }

  const token = typeof ctx.query.token === "string" ? ctx.query.token : "";
  const range: 7 | 30 = ctx.query.range === "30" ? 30 : 7;
  const wantDemo =
    ctx.query.demo === "1" && !hasRedis() && process.env.NODE_ENV !== "production";

  let data: StatsPayload;
  try {
    data = wantDemo ? demoStats(range) : await buildStats(range);
  } catch {
    data = {
      range,
      days: [],
      totals: {
        visitors: 0,
        pageviews: 0,
        conversions: 0,
        conversionRate: null,
        events: {},
      },
      byRef: [],
      topPages: [],
      topBlog: [],
      outbound: [],
      referrers: [],
      landings: [],
      projects: [],
    };
  }

  ctx.res.setHeader("Cache-Control", "private, no-store");

  return { props: { data, token } };
};

export default function AnalyticsStatsPage({ data, token }: Props) {
  const q = (range: 7 | 30) => {
    const params = new URLSearchParams();
    params.set("token", token);
    params.set("range", String(range));
    if (data.demo) params.set("demo", "1");
    return `/stats?${params.toString()}`;
  };

  const eventRows: NamedCount[] = Object.entries(data.totals.events)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return (
    <>
      <Head>
        <title>Analytics | Will Dixon</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <VStack
        as="main"
        align="stretch"
        gap={6}
        w="full"
        maxW="1100px"
        mx="auto"
        px={{ base: 3, md: 6 }}
        py={{ base: 8, md: 12 }}
        minW={0}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "stretch", sm: "flex-end" }}
          gap={4}
        >
          <Box>
            <Heading
              as="h1"
              fontFamily="var(--font-heading), system-ui, sans-serif"
              fontWeight="800"
              letterSpacing="-0.01em"
              fontSize={{ base: "1.875rem", md: "2.5rem" }}
              lineHeight="1.15"
              color="text.500"
            >
              Site analytics
            </Heading>
            <Text mt={2} color="text.600" fontSize="1rem">
              Privacy-friendly totals · no cookies · no PII
              {data.demo ? " · demo sample data" : ""}
            </Text>
          </Box>
          <Flex gap={2}>
            {([7, 30] as const).map((r) => {
              const active = data.range === r;
              return (
                <Link
                  key={r}
                  href={q(r)}
                  px={3}
                  py={2}
                  fontFamily="Pixel"
                  fontSize="0.7rem"
                  bg={active ? "marioRed.700" : "secondary.500"}
                  border="2px solid"
                  borderColor={active ? "marioRed.800" : "primary.700"}
                  boxShadow="2px 2px 0 #1b2426"
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: "none", bg: active ? "marioRed.600" : "secondary.400" }}
                >
                  {r}d
                </Link>
              );
            })}
          </Flex>
        </Flex>

        <SimpleGrid columns={{ base: 2, md: 4 }} gap={3}>
          <StatCard label="Visitors" value={String(data.totals.visitors)} hint={`sum of daily uniques · ${data.range}d`} />
          <StatCard label="Pageviews" value={String(data.totals.pageviews)} />
          <StatCard label="Conversions" value={String(data.totals.conversions)} hint="contact + resume + hire" />
          <StatCard label="Conv. rate" value={pct(data.totals.conversionRate)} hint="per visitor" />
        </SimpleGrid>

        <Box {...panel} p={{ base: 4, md: 5 }}>
          <Heading
            as="h2"
            fontFamily="var(--font-heading), system-ui, sans-serif"
            fontWeight="800"
            fontSize="1.15rem"
            mb={4}
          >
            Daily visitors
          </Heading>
          <BarChart days={data.days} valueKey="visitors" color="#007BFF" />
        </Box>

        <Box {...panel} p={{ base: 4, md: 5 }}>
          <Heading
            as="h2"
            fontFamily="var(--font-heading), system-ui, sans-serif"
            fontWeight="800"
            fontSize="1.15rem"
            mb={4}
          >
            Daily pageviews
          </Heading>
          <BarChart days={data.days} valueKey="pageviews" color="#1e8a1e" />
        </Box>

        <Box {...panel} p={{ base: 4, md: 5 }}>
          <Heading
            as="h2"
            fontFamily="var(--font-heading), system-ui, sans-serif"
            fontWeight="800"
            fontSize="1.15rem"
            mb={4}
          >
            Daily conversions
          </Heading>
          <BarChart days={data.days} valueKey="conversions" color="#F54103" />
        </Box>

        <Box {...panel} p={{ base: 4, md: 5 }} w="full" overflowX="auto">
          <Heading
            as="h2"
            fontFamily="var(--font-heading), system-ui, sans-serif"
            fontWeight="800"
            fontSize="1.15rem"
            mb={3}
          >
            By referral (first-touch)
          </Heading>
          {data.byRef.length === 0 ? (
            <Text color="text.600">No referral data yet.</Text>
          ) : (
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th color="text.600" borderColor="primary.700">
                    Ref
                  </Th>
                  <Th isNumeric color="text.600" borderColor="primary.700">
                    Visitors
                  </Th>
                  <Th isNumeric color="text.600" borderColor="primary.700">
                    Conversions
                  </Th>
                  <Th isNumeric color="text.600" borderColor="primary.700">
                    Rate
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.byRef.map((r) => (
                  <Tr key={r.ref}>
                    <Td borderColor="primary.700">{r.ref}</Td>
                    <Td isNumeric borderColor="primary.700">
                      {r.visitors}
                    </Td>
                    <Td isNumeric borderColor="primary.700">
                      {r.conversions}
                    </Td>
                    <Td isNumeric borderColor="primary.700">
                      {pct(r.rate)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <RankTable title="Top pages" rows={data.topPages} nameLabel="Path" />
          <RankTable title="Blog reads" rows={data.topBlog} nameLabel="Slug" />
          <RankTable title="Outbound clicks" rows={data.outbound} nameLabel="Target" />
          <RankTable title="Referrer domains" rows={data.referrers} nameLabel="Domain" />
          <RankTable title="Landing pages" rows={data.landings} nameLabel="Path" />
          <RankTable title="Project views" rows={data.projects} nameLabel="Slug" />
          <RankTable title="Event totals" rows={eventRows} nameLabel="Event" />
        </SimpleGrid>
      </VStack>
    </>
  );
}
