import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { PageShell, Todo } from "@lib/components/PageShell";

type Item = { name: React.ReactNode; note?: React.ReactNode };

const Section = ({ world, title, items }: { world: string; title: string; items: Item[] }) => (
  <Box
    as="section"
    className="wow-card"
    bg="secondary.500"
    border="1px solid"
    borderColor="primary.700"
    boxShadow="4px 4px 0 #1b2426"
    px={{ base: 4, md: 6 }}
    py={{ base: 5, md: 6 }}
    color="text.500"
  >
    <Text fontFamily="Pixel" fontSize={{ base: "0.65rem", md: "0.75rem" }} color="marioRed.300" mb={2}>
      {world}
    </Text>
    <Flex align="center" gap={3} mb={4}>
      <Box as="span" className="wow-qblock" position="static" aria-hidden="true" flexShrink={0} style={{ animation: "none" }}>
        ?
      </Box>
      <Heading
        as="h2"
        fontFamily="var(--font-heading), system-ui, sans-serif"
        fontWeight="800"
        fontSize={{ base: "1.5rem", md: "1.75rem" }}
        lineHeight="1.2"
      >
        {title}
      </Heading>
    </Flex>
    <VStack as="ul" listStyleType="none" align="stretch" gap={3} m={0} p={0}>
      {items.map((item, i) => (
        <Box
          as="li"
          key={i}
          bg="rgba(255,255,255,0.04)"
          border="1px solid rgba(255,255,255,0.08)"
          borderRadius="6px"
          px={4}
          py={3}
          fontSize={{ base: "1rem", md: "1.05rem" }}
          lineHeight="1.6"
        >
          <Text as="span" fontWeight="bold">{item.name}</Text>
          {item.note && <Text as="span" color="text.600"> {"\u2014"} {item.note}</Text>}
        </Box>
      ))}
    </VStack>
  </Box>
);

const hardware: Item[] = [
  { name: "AMD Ryzen 7 9800X3D", note: "8 cores of overkill for a guy who mostly runs a browser and a terminal" },
  { name: "NVIDIA GeForce RTX 3070", note: "games, mostly. let's be honest" },
  { name: "64 GB RAM", note: "so I can leave 40 Chrome tabs open and not think about it" },
  { name: "Gigabyte B850 Gaming WIFI6 motherboard" },
  { name: "Storage", note: "WD_BLACK SN850X 4 TB + WD_BLACK SN850X 1 TB NVMe, plus an SK hynix 500 GB SSD" },
  { name: "Three 27\" monitors", note: "Gigabyte G27QC A, AOC 27G51F and Acer VG271 P. yes, three. no, I don't need them" },
  { name: "HyperX Cloud III Wireless", note: "wireless headset" },
  { name: "Corsair K100 RGB", note: "keyboard" },
  { name: "UtechSmart Venus Pro Wireless MMO Gaming Mouse", note: "yea, I'm a WoW player, of course I need an MMO mouse" },
];

const tools: Item[] = [
  { name: "Lazygit", note: "this is a big one. git in a TUI that doesn't make me want to die" },
  { name: "Cursor", note: "my editor, and the AI that does a scary amount of the typing" },
  { name: "PowerShell on Windows", note: "bread and butter" },
  { name: "Chrome", note: "browser, devtools, the usual" },
  { name: "1Password", note: "every login lives here" },
  { name: "GitHub", note: "code, PRs, CI" },
  { name: "Vercel", note: "push a branch, get a preview URL. hosts this site" },
];

const services: Item[] = [
  { name: "Cursor", note: "big time. I use the hell out of it" },
  { name: "Grok Bot", note: "my AI agents that handle the boring shit. I wrote a whole post about it" },
  { name: "Vercel", note: "hosting for this site" },
  { name: "GitHub", note: "where all the code lives" },
  { name: "Firebase", note: "backend for dm squire" },
  { name: "FADR", note: "splits songs into stems so I can remix and sample stuff" },
];

const music: Item[] = [
  { name: "Ableton Live", note: "I produce music in my free time. this is where that happens" },
  { name: "FADR", note: "stem splitting, see above" },
  { name: "Voicemeeter", note: "virtual audio mixer for routing all the sound on my PC" },
];

export default function UsesPage() {
  return (
    <PageShell
      title="Uses"
      description="The hardware, editor, tools and services Will Dixon uses to build stuff and make music."
      intro="The gear and software I actually use every day. No affiliate links, just the stuff on my desk."
    >
      <Section world="WORLD 1-1 / gear" title="Hardware" items={hardware} />
      <Section world="WORLD 1-2 / dev" title="Editor & Tools" items={tools} />
      <Section world="WORLD 1-3 / cloud" title="Hosting & Services" items={services} />
      <Section world="WORLD 1-4 / side quest" title="Music" items={music} />
    </PageShell>
  );
}
