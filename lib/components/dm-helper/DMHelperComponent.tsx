import { Flex, Tabs, TabList, TabPanels, Tab, TabPanel, Img, Text, Button, useDisclosure } from '@chakra-ui/react';
import { MobForm } from '@lib/components/dm-helper/MobForm';
import { HeroForm } from '@lib/components/dm-helper/HeroForm';
import { DMHelperContext } from '@lib/components/contexts/DMHelperContext';
import { EntityList } from '@lib/components/dm-helper/EntityList';
import { MobFavorites } from '@lib/components/dm-helper/MobFavorites';
import { HeroList } from '@lib/components/dm-helper/HeroList';
import { useContext } from 'react';
import { InitiativeModal } from '@lib/components/dm-helper/InititativeModal';

export const DMHelperComponent = () => {
  const { combatStarted, setCombatStarted, heroes, setEntities, resetHeroInitiatives, isClient } =
    useContext(DMHelperContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const startCombat = () => {
    if (heroes.length > 0) {
      resetHeroInitiatives();
      onOpen();
    }
    setCombatStarted(true);
  };

  const endCombat = () => {
    resetHeroInitiatives();
    setCombatStarted(false);
  };

  return (
    <>
      <Tabs display="flex" flexDir="column" alignContent={'center'}>
        <TabList
          alignSelf="center"
          border="2px solid"
          justifyContent="center"
          mb="4"
          p={2}
          w="fit-content"
          bgColor="secondary.500"
        >
          <Tab _selected={{ color: 'white', bg: 'primary.200' }} borderRadius="lg" fontWeight="bold">
            <Img src="/static/images/sword.png" alt="sword-icon" w="20px" h="20px" mr="1" />
            <Text as="span" lineHeight="24px">
              Combat
            </Text>
          </Tab>
          <Tab _selected={{ color: 'white', bg: 'primary.200' }} borderRadius="lg" fontWeight="bold">
            <Img src="/static/images/knight.png" alt="knight" w="20px" h="20px" mr="1" />
            <Text as="span" lineHeight="24px">
              Heroes
            </Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex direction={{ base: 'column', lg: 'row' }} justifyContent="center" gap="12">
              <Flex direction="column" gap="4">
                <MobForm />
                <MobFavorites />
              </Flex>
              <Flex direction="column" gap="4">
                {isClient && combatStarted && (
                  <Button variant="redSolid" onClick={() => endCombat()}>
                    End Combat
                  </Button>
                )}
                {isClient && !combatStarted && <Button onClick={() => startCombat()}>Start Combat</Button>}
                <EntityList />
              </Flex>
            </Flex>
          </TabPanel>

          <TabPanel>
            <Flex gap="4" justifyContent="center">
              <HeroForm />
              <HeroList />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <InitiativeModal isOpen={isOpen} heroes={heroes} onClose={onClose} />
    </>
  );
};
