import { Box, Button, Flex, IconButton, Link, useDisclosure, VStack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { PRIMARY_NAV_ITEMS, isActiveNav } from "@data/primary-nav-data";

const HamburgerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const path = router.asPath.split(/[?#]/)[0];
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    router.events.on("routeChangeStart", onClose);
    return () => router.events.off("routeChangeStart", onClose);
  }, [router.events, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      onClose();
      buttonRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (PRIMARY_NAV_ITEMS.length === 0) return null;

  return (
    <Flex display={{ base: "flex", md: "none" }} align="center">
      <IconButton
        ref={buttonRef}
        size="md"
        minW="44px"
        minH="44px"
        icon={isOpen ? <CloseIcon boxSize={3} /> : <HamburgerIcon boxSize={5} />}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        variant="ghost"
        color="white"
        borderRadius="2px"
        _hover={{ bg: "whiteAlpha.100" }}
        _active={{ bg: "whiteAlpha.200" }}
        _focusVisible={{
          boxShadow: "none",
          outline: "2px solid",
          outlineColor: "coin",
          outlineOffset: "2px",
        }}
        onClick={isOpen ? onClose : onOpen}
      />

      <Box
        id="mobile-nav"
        display={{ base: isOpen ? "block" : "none", md: "none" }}
        bg="#0b1020"
        position="absolute"
        top="100%"
        left="0"
        right="0"
        py={3}
        px={4}
        zIndex="1000"
        borderBottom="1px solid"
        borderColor="rgba(255, 215, 92, 0.45)"
      >
        <VStack as="nav" aria-label="Mobile" spacing={1} align="stretch" w="100%">
          {PRIMARY_NAV_ITEMS.map((item, index) => {
            const active = isActiveNav(item.href, path);
            return (
              <Link
                key={item.href}
                ref={index === 0 ? firstLinkRef : undefined}
                as={NextLink}
                href={item.href}
                variant="nav"
                textStyle="nav"
                aria-current={active ? "page" : undefined}
                display="flex"
                alignItems="center"
                minH="44px"
                px={3}
                borderLeft="2px solid"
                borderColor={active ? "coin" : "transparent"}
                color={active ? "coin" : "text.600"}
                bg={active ? "rgba(255, 215, 92, 0.06)" : "transparent"}
                _hover={{ textDecoration: "none", color: "coin", bg: "rgba(255, 215, 92, 0.06)" }}
              >
                {item.label}
              </Link>
            );
          })}
          <Button
            as="a"
            href="mailto:wdixon@will-dixon.com"
            data-track="hire_cta"
            variant="mario"
            mt={3}
            w="full"
            textDecoration="none"
            _hover={{ bg: "marioRed.600", textDecoration: "none" }}
          >
            Contact Me
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default HamburgerMenu;
