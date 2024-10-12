import { Container, Flex } from "@chakra-ui/react";
import { MobForm } from "@lib/components/dm-helper/MobForm";
import { DMHelperContextProvider } from "@lib/components/contexts/DMHelperContext";
import { EntityList } from "@lib/components/dm-helper/EntityList";
import { MobFavorites } from "@lib/components/dm-helper/MobFavorites";

export function DMHelper({ Component, pageProps }) {
  return (
    <DMHelperContextProvider>
      <Container maxW={{ xl: "1200px" }} pt="12" justifyContent={"center"}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          justifyContent="center"
          gap="12"
        >
          <Flex direction="column" gap="4">
            <MobForm />
            <MobFavorites />
          </Flex>
          <EntityList />
        </Flex>
      </Container>
    </DMHelperContextProvider>
  );
}

export default DMHelper;
