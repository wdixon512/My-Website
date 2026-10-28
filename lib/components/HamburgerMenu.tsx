import { Box, Flex, IconButton, useDisclosure, VStack, Link } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PRIMARY_NAV_ITEMS, isActiveNav } from "@data/primary-nav-data";

const HamburgerMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const path = router.asPath.split(/[?#]/)[0];

  useEffect(() => {
    router.events.on("routeChangeStart", onClose);
    return () => router.events.off("routeChangeStart", onClose);
  }, [router.events, onClose]);

  if (PRIMARY_NAV_ITEMS.length === 0) return null;

  return (
    <Flex justifyContent="end" direction="column" display={{ base: "flex", md: "none" }}>
      <IconButton
        size="md"
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
        display={{ md: "none" }}
        onClick={isOpen ? onClose : onOpen}
      />

      <Box
        display={{ base: isOpen ? "flex" : "none", md: "none" }}
        bg="rgba(28, 40, 51, 0.96)"
        className="wow-header"
        position="absolute"
        w="100vw"
        top="100%"
        left="0"
        py="6"
        zIndex="1000"
        boxShadow="0 12px 24px rgba(0,0,0,0.35)"
      >
        <VStack as="nav" aria-label="Mobile" spacing={3} align="stretch" px="4" w="100%">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const active = isActiveNav(item.href, path);
            return (
              <Link
                key={item.href}
                as={NextLink}
                href={item.href}
                aria-current={active ? "page" : undefined}
                display="block"
                p="4"
                bg={active ? "primary.500" : "secondary.600"}
                borderLeft="4px solid"
                borderColor={active ? "#ffd75c" : "transparent"}
                borderRadius="4"
                fontFamily="Pixel"
                color={active ? "#ffd75c" : "white"}
                _hover={{ textDecoration: "none", bg: "primary.500" }}
              >
                {item.label}
              </Link>
            );
          })}
        </VStack>
      </Box>
    </Flex>
  );
};

export default HamburgerMenu;
