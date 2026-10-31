import { Button, Circle, Flex, Stack, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PRIMARY_NAV_ITEMS, isActiveNav } from "@data/primary-nav-data";
import HamburgerMenu from "./HamburgerMenu";
import SteamLogout from "./steam/SteamLogout";

type NavigationBarProps = {};

export const NavigationBar = (props: NavigationBarProps) => {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0];
  return (
    <Flex
      as="header"
      className="wow-header"
      w="full"
      maxW="100%"
      minW={0}
      h={{ base: "72px", md: "80px" }}
      bg="rgba(28, 40, 51, 0.82)"
      borderBottom="2px solid rgba(255,255,255,0.08)"
      boxShadow="0 6px 20px rgba(0,0,0,0.25)"
      px={{ base: 3, md: 6 }}
      gap={{ base: 4, md: 10 }}
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0"
      zIndex="1100"
      overflowX="clip"
    >
      <Circle
        flexShrink={0}
        overflow="hidden"
        size={{ base: "52px", md: "56px" }}
        position="relative"
        border="2px solid rgba(255,255,255,0.6)"
      >
        <Link as={NextLink} href="/home" aria-label="Home">
          <Image
            src="/static/images/agios-nikolaos.jpg"
            alt="Will Dixon and fiancée in Agios Nikolaos, Crete"
            width="128"
            height="234"
            priority
            style={{ objectFit: "cover" }}
          />
        </Link>
      </Circle>

      <Stack
        as="nav"
        display={{ base: "none", md: "flex" }}
        direction="row"
        flex="1"
        align="center"
        aria-label="Primary"
        gap="10"
      >
        {PRIMARY_NAV_ITEMS.map((item) => {
          const active = isActiveNav(item.href, path);
          return (
            <Link
              key={item.href}
              as={NextLink}
              href={item.href}
              className="wow-navlink"
              aria-current={active ? "page" : undefined}
              fontFamily="Pixel"
              color={active ? "#ffd75c" : "white"}
              _hover={{ textDecoration: "none", color: "#ffd75c" }}
            >
              {item.label}
            </Link>
          );
        })}
      </Stack>
      <Flex display={{ base: "none", md: "flex" }} justify="flex-end" gap="6" align="center">
        <Button
          as="a"
          href="mailto:wdixon@will-dixon.com"
          data-track="hire_cta"
          className="wow-coin"
          bg="marioRed.700"
          color="white"
          fontFamily="Pixel"
          border="2px solid"
          borderColor="#1b2426"
          boxShadow="3px 3px 0 #1b2426"
          _hover={{ bg: "marioRed.800" }}
        >
          Contact Me
        </Button>
      </Flex>
      <SteamLogout />
      <HamburgerMenu />
    </Flex>
  );
};

export default NavigationBar;
