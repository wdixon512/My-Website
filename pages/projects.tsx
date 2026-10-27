import { Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { LevelCard } from "@lib/components/LevelCard";
import { PageShell, Todo } from "@lib/components/PageShell";

const linkProps = { color: "text.500", textDecoration: "underline", isExternal: true };

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description="Side projects by Will Dixon: ahprice, dm squire, and will-dixon.com."
      intro="Things I build outside of work."
    >
      <LevelCard
        worldLabel="WORLD 1-1 / ahprice"
        title="ahprice"
        meta="Free auction house price addon for World of Warcraft Forever"
        link="https://ahprice.com"
        imageSrc="/static/images/knight.png"
        imageAlt="ahprice"
      >
        <UnorderedList>
          <ListItem>
            A free addon that scans the auction house in under 10 seconds,
            shows the market average and latest price on item tooltips, and
            shares scans with other players.
          </ListItem>
          <ListItem>An addon, a helper app, and the ahprice.com price site.</ListItem>
          <ListItem>Built with AI tools by an experienced software engineer.</ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Stack:</Text> Python helper app.{" "}
            <Todo>addon language and site stack</Todo>
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Code:</Text> private repo.
          </ListItem>
        </UnorderedList>
      </LevelCard>

      <LevelCard
        worldLabel="WORLD 1-2 / dm squire"
        title="dm squire"
        meta="D&D 5e combat tracker"
        link="https://dmsquire.com"
        imageSrc="/static/images/sword.png"
        imageAlt="dm squire"
      >
        <UnorderedList>
          <ListItem>
            Tracks combat, characters and enemies for tabletop sessions, with
            invites for other players.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Stack:</Text> Next.js, React,
            Chakra UI, Firebase / Firestore.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Code:</Text>{" "}
            <Link href="https://github.com/wdixon512/dm-squire-web" {...linkProps}>
              github.com/wdixon512/dm-squire-web
            </Link>
          </ListItem>
        </UnorderedList>
      </LevelCard>

      <LevelCard
        worldLabel="WORLD 1-3 / will-dixon.com"
        title="will-dixon.com"
        meta="This site"
        link="https://www.will-dixon.com"
        imageSrc="/static/images/static-star.png"
        imageAlt="will-dixon.com"
      >
        <UnorderedList>
          <ListItem>My personal site, with a Super Mario 64 theme.</ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Stack:</Text> Next.js, React,
            TypeScript, Chakra UI, hosted on Vercel.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Code:</Text>{" "}
            <Link href="https://github.com/wdixon512/My-Website" {...linkProps}>
              github.com/wdixon512/My-Website
            </Link>
          </ListItem>
        </UnorderedList>
      </LevelCard>
    </PageShell>
  );
}
