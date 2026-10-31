import { Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { LevelCard } from "@lib/components/LevelCard";
import { PageShell } from "@lib/components/PageShell";

const linkProps = { color: "text.500", textDecoration: "underline", isExternal: true };

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description="My side projects: ahprice, dm squire, and will-dixon.com."
      intro="Things I build outside of work."
    >
      <LevelCard
        worldLabel="WORLD 1-1 / ahprice"
        title="ahprice"
        meta="Free auction house price addon for World of Warcraft Forever"
        link="https://ahprice.com"
        projectSlug="ahprice"
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
          <ListItem>I built this with a lot of help from AI tools.</ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Stack:</Text> Lua addon, Python helper app (Windows setup exe in C#), Python site server (standard-library http.server with server-rendered HTML) on SQLite, Caddy reverse proxy, DigitalOcean Droplet, Namecheap DNS, GitHub Actions CI/CD.
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
        projectSlug="dmsquire"
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
        worldLabel="WORLD 1-3 / 99.recipes"
        title="99.recipes"
        meta="AI recipe app"
        link="https://www.99.recipes"
        projectSlug="99-recipes"
        imageSrc="/static/images/99-recipes.png"
        imageAlt="99.recipes logo"
      >
        <UnorderedList>
          <ListItem>
            An AI recipe app I built with a friend who codes as a hobby. It has
            a free tier and a $2.99/mo Premium plan.
          </ListItem>
          <ListItem>
            I redesigned the app and built the theming, form validation, OAuth,
            recipe create/edit/delete and UX, mobile nav, and regenerate-recipe.
            I also reviewed my friend&apos;s PRs.
          </ListItem>
          <ListItem>
            <Text as="span" fontWeight="bold">Code:</Text> private repo. My PRs
            are #14-#39, from June 2025.
          </ListItem>
        </UnorderedList>
      </LevelCard>

      <LevelCard
        worldLabel="WORLD 1-4 / will-dixon.com"
        title="will-dixon.com"
        meta="This site"
        link="https://www.will-dixon.com"
        projectSlug="will-dixon"
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
