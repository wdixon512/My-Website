import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { PageShell } from "@lib/components/PageShell";

type Item = { name: React.ReactNode; note?: React.ReactNode; href?: string };

const ExtLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Box
    as="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    fontWeight="bold"
    color="accent.400"
    textDecoration="underline"
    textDecorationStyle="dotted"
    textUnderlineOffset="0.15em"
    _hover={{ color: "accent.200", textDecorationStyle: "solid" }}
    _focusVisible={{
      color: "accent.200",
      textDecorationStyle: "solid",
      outline: "2px solid",
      outlineColor: "accent.300",
      outlineOffset: "2px",
    }}
  >
    {children}
    <Box as="span" aria-hidden="true" ml="0.2em" fontSize="0.85em">
      ↗
    </Box>
  </Box>
);

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
          {item.href ? (
            <ExtLink href={item.href}>{item.name}</ExtLink>
          ) : (
            <Text as="span" fontWeight="bold">
              {item.name}
            </Text>
          )}
          {item.note && (
            <Text as="span" color="text.600">
              {" "}
              {"\u2014"} {item.note}
            </Text>
          )}
        </Box>
      ))}
    </VStack>
  </Box>
);

const WD_BLACK_SN850X = "https://www.sandisk.com/products/ssd/internal-ssd/wd-black-sn850x-nvme-ssd";

const hardware: Item[] = [
  {
    name: "AMD Ryzen 7 9800X3D",
    href: "https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9800x3d.html",
    note: "8 cores of overkill for a guy who mostly runs a browser and a terminal",
  },
  {
    name: "NVIDIA GeForce RTX 3070",
    href: "https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3070-3070ti/",
    note: "games, mostly. let's be honest",
  },
  { name: "64 GB RAM", note: "so I can leave 40 Chrome tabs open and not think about it" },
  {
    name: "Gigabyte B850 Gaming WIFI6 motherboard",
    href: "https://www.gigabyte.com/Motherboard/B850-GAMING-WIFI6-rev-1x",
  },
  {
    name: "Storage",
    note: (
      <>
        <ExtLink href={WD_BLACK_SN850X}>WD_BLACK SN850X</ExtLink> 4 TB +{" "}
        <ExtLink href={WD_BLACK_SN850X}>WD_BLACK SN850X</ExtLink> 1 TB NVMe, plus an SK hynix 500 GB SSD
      </>
    ),
  },
  {
    name: 'Three 27" monitors',
    note: (
      <>
        <ExtLink href="https://www.gigabyte.com/Monitor/G27QC-A">Gigabyte G27QC A</ExtLink>,{" "}
        <ExtLink href="https://www.aoc.com/us/gaming/monitors/27g51f">AOC 27G51F</ExtLink> and{" "}
        <ExtLink href="https://www.acer.com/us-en/monitors/gaming/nitro-vg1">Acer VG271 P</ExtLink>
        {". yes, three. no, I don't need them"}
      </>
    ),
  },
  {
    name: "HyperX Cloud III Wireless",
    href: "https://hyperx.com/products/hyperx-cloud-iii-wireless-gaming-headset",
    note: "wireless headset",
  },
  {
    name: "Corsair K100 RGB",
    href: "https://www.corsair.com/us/en/p/keyboards/ch-912a01a-na/k100-rgb-optical-mechanical-gaming-keyboard-corsair-opx-switch-ch-912a01a-na",
    note: "keyboard",
  },
  {
    name: "UtechSmart Venus Pro Wireless MMO Gaming Mouse",
    href: "https://www.utechsmart.com/products/DS-2833.html",
    note: "yea, I'm a WoW player, of course I need an MMO mouse",
  },
];

const tools: Item[] = [
  {
    name: "Lazygit",
    href: "https://github.com/jesseduffield/lazygit",
    note: "this is a big one. git in a TUI that doesn't make me want to die",
  },
  {
    name: "Cursor",
    href: "https://cursor.com/",
    note: "my editor, and the AI that does a scary amount of the typing",
  },
  {
    name: "PowerShell on Windows",
    href: "https://learn.microsoft.com/en-us/powershell/",
    note: "bread and butter",
  },
  { name: "Chrome", href: "https://www.google.com/chrome/", note: "browser, devtools, the usual" },
  { name: "1Password", href: "https://1password.com/", note: "every login lives here" },
  { name: "GitHub", href: "https://github.com/", note: "code, PRs, CI" },
  {
    name: "Vercel",
    href: "https://vercel.com/",
    note: "push a branch, get a preview URL. hosts this site",
  },
];

const services: Item[] = [
  { name: "Cursor", href: "https://cursor.com/", note: "big time. I use the hell out of it" },
  {
    name: "Grok Bot",
    href: "https://x.ai/bot",
    note: "my AI agents that handle the boring shit. I wrote a whole post about it",
  },
  { name: "Vercel", href: "https://vercel.com/", note: "hosting for this site" },
  { name: "GitHub", href: "https://github.com/", note: "where all the code lives" },
  { name: "Firebase", href: "https://firebase.google.com/", note: "backend for dm squire" },
  {
    name: "FADR",
    href: "https://fadr.com/",
    note: "splits songs into stems so I can remix and sample stuff",
  },
];

const music: Item[] = [
  {
    name: "Ableton Live",
    href: "https://www.ableton.com/en/live/",
    note: "I produce music in my free time. this is where that happens",
  },
  { name: "FADR", href: "https://fadr.com/", note: "stem splitting, see above" },
  {
    name: "Voicemeeter",
    href: "https://vb-audio.com/Voicemeeter/",
    note: "virtual audio mixer for routing all the sound on my PC",
  },
];

export default function SetupPage() {
  return (
    <PageShell
      title="Setup"
      description="The hardware, editor, tools and services I use to build stuff and make music."
      intro="The gear and software I actually use every day. No affiliate links, just the stuff on my desk."
    >
      <Section world="WORLD 1-1 / gear" title="Hardware" items={hardware} />
      <Section world="WORLD 1-2 / dev" title="Editor & Tools" items={tools} />
      <Section world="WORLD 1-3 / cloud" title="Hosting & Services" items={services} />
      <Section world="WORLD 1-4 / side quest" title="Music" items={music} />
    </PageShell>
  );
}
