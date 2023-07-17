import {
  Button,
  Circle,
  Flex,
  Img,
  Stack,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import { PRIMARY_NAV_ITEMS } from "../data/primary-nav-data";

type NavigationBarProps = {};

export const NavigationBar = (props: NavigationBarProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex w="full" maxH="16" px="6" my="4" gap="12">
      <Circle flex="1" overflow="hidden" maxW="16">
        <Link href="/home">
          <Img rounded={12} src="me-sam-agios-nikolaos.jpg" objectFit="fill" />
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
          <Link key={index} href={item.href}>
            {item.label}
          </Link>
        ))}
      </Stack>
      <Flex>
        <Flex w="full" justify="flex-end" flex="1" gap="6" align="center">
          <Switch onChange={toggleColorMode} colorScheme="red">
            {colorMode === "dark" ? "Light" : "Dark"} Mode
          </Switch>
          <Button colorScheme="red">Contact Me</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavigationBar;
