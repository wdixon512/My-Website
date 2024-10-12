import { Container, Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Img, Text } from "@chakra-ui/react";
import { MobForm } from "@lib/components/dm-helper/MobForm";
import { HeroForm } from "@lib/components/dm-helper/HeroForm";
import { DMHelperContextProvider } from "@lib/components/contexts/DMHelperContext";
import { EntityList } from "@lib/components/dm-helper/EntityList";
import { MobFavorites } from "@lib/components/dm-helper/MobFavorites";

export function DMHelper({ Component, pageProps }) {
  return (
    <DMHelperContextProvider>
      <Container maxW={{ xl: "1200px" }} pt="12" justifyContent={"center"}>
        <Tabs display='flex' flexDir='column' alignContent={'center'}>
          <TabList alignSelf='center' border='2px solid' justifyContent="center" mb="4" p={2} w='fit-content' bgColor="secondary.500">
            <Tab _selected={{ color: "white", bg: "primary.200" }} borderRadius="lg" fontWeight="bold">
              <Img src="/static/images/sword.png" alt="sword-icon" w="20px" h="20px" mr="1" />
              <Text as="span" lineHeight="24px">Combat</Text>
            </Tab>
            <Tab _selected={{ color: "white", bg: "primary.200" }} borderRadius="lg" fontWeight="bold">
              <Img src="/static/images/knight.png" alt="knight" w="20px" h="20px" mr="1" />
              <Text as="span" lineHeight="24px">Heroes</Text>
            </Tab>
          </TabList>

          <TabPanels>
            {/* Combat Tab */}
            <TabPanel>
              <Flex direction={{ base: "column", lg: "row" }} justifyContent="center" gap="12">
                <Flex direction="column" gap="4">
                  <MobForm />
                  <MobFavorites />
                </Flex>
                <EntityList />
              </Flex>
            </TabPanel>

            {/* Hero Management Tab */}
            <TabPanel>
              <Flex direction="column" gap="4" justifyContent="center">
                <HeroForm />
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </DMHelperContextProvider >
  );
}

export default DMHelper;
