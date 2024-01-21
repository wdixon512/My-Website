import { Button, Circle, Flex, Stack, Link } from "@chakra-ui/react";
import Image from "next/image";
import { PRIMARY_NAV_ITEMS } from "../data/primary-nav-data";

type NavigationBarProps = {};

export const NavigationBar = (props: NavigationBarProps) => {
  const handleContactClick = () => {
    alert("Contact form coming soon!");
  };
  return (
    <Flex w="full" maxH="24" bg="secondary.500" px="6" py="4" gap="12">
      <Circle flex="1" overflow="hidden" maxW="16">
        <Link href="/home">
          <Image
            src="/static/images/agios-nikolaos.jpg"
            alt="My Fiance and I in Agios Nikolaos, Crete"
            width={64}
            height={64}
            style={{ objectFit: "cover" }}
          />
        </Link>
      </Circle>
      <Stack
        direction="row"
        flex="1"
        align="center"
        aria-label="primary-nav"
        gap="12"
      >
        {PRIMARY_NAV_ITEMS.map((item, index) => (
          <Link key={index} href={item.href} fontFamily="Pixel">
            {item.label}
          </Link>
        ))}
      </Stack>
      <Flex>
        <Flex w="full" justify="flex-end" flex="1" gap="6" align="center">
          <Button
            bg="marioRed.500"
            color="white"
            fontFamily="Pixel"
            onClick={handleContactClick}
          >
            Contact Me
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavigationBar;
