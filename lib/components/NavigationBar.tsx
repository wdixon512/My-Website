import { Button, Flex, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PRIMARY_NAV_ITEMS, isActiveNav } from "@data/primary-nav-data";
import HamburgerMenu from "./HamburgerMenu";
import SteamLogout from "./steam/SteamLogout";

export const NavigationBar = () => {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0];
  return (
    <Flex
      as="header"
      className="site-header"
      w="full"
      maxW="100%"
      minW={0}
      h={{ base: "64px", md: "68px" }}
      bg="#0b1020"
      borderBottom="1px solid"
      borderColor="rgba(255, 215, 92, 0.45)"
      px={{ base: 4, md: 8 }}
      gap={{ base: 3, md: 8 }}
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top="0"
      zIndex="1100"
    >
      <Link
        as={NextLink}
        href="/home"
        aria-label="Home"
        flexShrink={0}
        display="block"
        overflow="hidden"
        borderRadius="full"
        border="1px solid"
        borderColor="rgba(255, 215, 92, 0.75)"
        w={{ base: "44px", md: "48px" }}
        h={{ base: "44px", md: "48px" }}
        position="relative"
        _hover={{ textDecoration: "none" }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "coin",
          outlineOffset: "3px",
        }}
      >
        <Image
          src="/static/images/agios-nikolaos.jpg"
          alt="Will Dixon and fiancée in Agios Nikolaos, Crete"
          width={96}
          height={96}
          priority
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Link>

      <Flex
        as="nav"
        display={{ base: "none", md: "flex" }}
        flex="1"
        align="center"
        aria-label="Primary"
        gap="7"
        minW={0}
      >
        {PRIMARY_NAV_ITEMS.map((item) => {
          const active = isActiveNav(item.href, path);
          return (
            <Link
              key={item.href}
              as={NextLink}
              href={item.href}
              className="wow-navlink"
              variant="nav"
              textStyle="nav"
              aria-current={active ? "page" : undefined}
              color={active ? "coin" : "text.600"}
            >
              {item.label}
            </Link>
          );
        })}
      </Flex>
      <Flex display={{ base: "none", md: "flex" }} justify="flex-end" align="center" flexShrink={0}>
        <Button
          as="a"
          href="mailto:wdixon@will-dixon.com"
          data-track="hire_cta"
          variant="mario"
          textDecoration="none"
          _hover={{ bg: "marioRed.600", textDecoration: "none" }}
          _focusVisible={{
            outline: "2px solid",
            outlineColor: "coin",
            outlineOffset: "3px",
            boxShadow: "2px 2px 0 #1b120c",
            textDecoration: "none",
          }}
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
