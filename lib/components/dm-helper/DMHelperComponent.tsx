import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Img,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Slide,
  useToast,
} from '@chakra-ui/react';
import { MobForm } from '@lib/components/dm-helper/MobForm';
import { HeroForm } from '@lib/components/dm-helper/HeroForm';
import { DMHelperContext } from '@lib/components/contexts/DMHelperContext';
import { EntityList } from '@lib/components/dm-helper/EntityList';
import { MobFavorites } from '@lib/components/dm-helper/MobFavorites';
import { HeroList } from '@lib/components/dm-helper/HeroList';
import { useContext, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Entity, { EntityType } from '@lib/models/dm-helper/Entity';

export const DMHelperComponent = () => {
  const { combatStarted, setCombatStarted, heroes, setEntities, resetHeroInitiatives } = useContext(DMHelperContext);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [initiativeRolls, setInitiativeRolls] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const startCombat = () => {
    if (heroes.length > 0) {
      setCurrentHeroIndex(0);
      resetHeroInitiatives();
      setInitiativeRolls(new Array(heroes.length).fill(undefined));
      onOpen();
    }
    setCombatStarted(true);
  };

  const endCombat = () => {
    resetHeroInitiatives();
    setCurrentHeroIndex(0);
    setCombatStarted(false);
  };

  const handleInitiativeChange = (value: string) => {
    const updatedRolls = [...initiativeRolls];
    updatedRolls[currentHeroIndex] = Number(value);
    setInitiativeRolls(updatedRolls);
  };

  const handleNextHero = () => {
    if (currentHeroIndex < heroes.length - 1) {
      setCurrentHeroIndex(currentHeroIndex + 1);
    }
  };

  const handlePreviousHero = () => {
    if (currentHeroIndex > 0) {
      setCurrentHeroIndex(currentHeroIndex - 1);
    }
  };

  const handleDone = () => {
    // Check if some heroes still have undefined or null initiative rolls
    if (initiativeRolls.some((roll) => roll === undefined || roll === null)) {
      toast({
        title: 'Warning',
        description: 'Initiative setting was aborted. Please set all initiatives before closing.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      return;
    }

    // Apply initiative rolls only if all are set
    const updatedHeroes = heroes.map((hero, index) => ({
      ...hero,
      initiative: initiativeRolls[index],
    }));

    // Update entities with the modified heroes
    setEntities((prevEntities: Entity[]) =>
      prevEntities.map((entity) =>
        entity.type === EntityType.HERO ? updatedHeroes.find((h) => h.id === entity.id) || entity : entity
      )
    );
    onClose();
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
          {/* Combat Tab */}
          <TabPanel>
            <Flex direction={{ base: 'column', lg: 'row' }} justifyContent="center" gap="12">
              <Flex direction="column" gap="4">
                <MobForm />
                <MobFavorites />
              </Flex>
              <Flex direction="column" gap="4">
                {combatStarted && (
                  <Button variant="redSolid" onClick={() => endCombat()}>
                    End Combat
                  </Button>
                )}
                {!combatStarted && <Button onClick={() => startCombat()}>Start Combat</Button>}
                <EntityList />
              </Flex>
            </Flex>
          </TabPanel>

          {/* Hero Management Tab */}
          <TabPanel>
            <Flex gap="4" justifyContent="center">
              <HeroForm />
              <HeroList />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal for Initiative Rolls */}
      <Modal isOpen={isOpen} onClose={handleDone} isCentered>
        <ModalOverlay />
        <ModalContent>
          {heroes && heroes.length > 0 ? (
            <>
              <ModalHeader textColor="primary.400">
                What did {heroes[currentHeroIndex]?.name} roll for initiative?
              </ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  textColor="primary.400"
                  placeholder="Enter initiative"
                  value={initiativeRolls[currentHeroIndex] || ''}
                  onChange={(e) => handleInitiativeChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if (currentHeroIndex === heroes.length - 1) {
                        handleDone();
                      } else {
                        handleNextHero();
                      }
                    }
                  }}
                />
              </ModalBody>
              <ModalFooter justifyContent="space-between">
                {currentHeroIndex > 0 && (
                  <Button leftIcon={<ChevronLeftIcon />} onClick={handlePreviousHero}>
                    Previous Hero ({heroes[currentHeroIndex - 1]?.name})
                  </Button>
                )}
                {currentHeroIndex < heroes.length - 1 ? (
                  <Button rightIcon={<ChevronRightIcon />} onClick={handleNextHero}>
                    Next Hero ({heroes[currentHeroIndex + 1]?.name})
                  </Button>
                ) : (
                  <Button colorScheme="green" onClick={handleDone}>
                    Done
                  </Button>
                )}
              </ModalFooter>
            </>
          ) : (
            <ModalHeader>No heroes available</ModalHeader>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
