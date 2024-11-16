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
  useDisclosure,
  Icon,
  Heading,
} from '@chakra-ui/react';
import { MobForm } from '@lib/components/dm-helper/MobForm';
import { HeroForm } from '@lib/components/dm-helper/HeroForm';
import { DMHelperContext } from '@lib/components/contexts/DMHelperContext';
import { EntityList } from '@lib/components/dm-helper/EntityList';
import { MobQuickAdd } from '@lib/components/dm-helper/MobQuickAdd';
import { HeroList } from '@lib/components/dm-helper/HeroList';
import { useContext } from 'react';
import { InitiativeModal } from '@lib/components/dm-helper/modals/InititativeModal';
import EndCombatConfirmationModal from './modals/EndCombatConfirmationModal';
import { InviteOthersForm } from './InviteOthersForm';
import DMHelperSignInComponent from './DMHelperSignInComponent';
import { FaDoorOpen } from 'react-icons/fa';
import JoinRoomTabPanel from './JoinRoomTabPanel';

export const DMHelperComponent = () => {
  const { combatStarted, updateCombatStarted, heroes, resetHeroInitiatives, isClient, readOnlyRoom } =
    useContext(DMHelperContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: endCombatIsOpen, onOpen: onEndCombatModalOpen, onClose: onEndCombatModalClose } = useDisclosure();

  const startCombat = () => {
    if (heroes.length > 0) {
      resetHeroInitiatives();
      onOpen();
    }
    updateCombatStarted(true);
  };

  const endCombat = () => {
    onEndCombatModalOpen();

    if (!combatStarted) {
      resetHeroInitiatives();
      updateCombatStarted(false);
    }
  };

  return (
    <>
      <DMHelperSignInComponent />
      <Tabs display="flex" flexDir="column" alignContent={'center'}>
        {!readOnlyRoom && (
          <>
            <TabList
              alignSelf="center"
              border="2px solid"
              justifyContent="center"
              mb="4"
              p={2}
              w="fit-content"
              bgColor="secondary.500"
            >
              <Tab
                _selected={{ color: 'white', bg: 'primary.200' }}
                borderRadius="lg"
                fontWeight="bold"
                data-testid="combat-panel"
              >
                <Img src="/static/images/sword.png" alt="sword-icon" w="20px" h="20px" mr="1" />
                <Text as="span" lineHeight="24px">
                  Combat
                </Text>
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'primary.200' }}
                borderRadius="lg"
                fontWeight="bold"
                data-testid="heroes-panel"
              >
                <Img src="/static/images/knight.png" alt="knight" w="20px" h="20px" mr="1" />
                <Text as="span" lineHeight="24px">
                  Heroes
                </Text>
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'primary.200' }}
                borderRadius="lg"
                fontWeight="bold"
                data-testid="invite-others-panel"
              >
                <Img src="/static/images/join-party.png" alt="knight" w="20px" h="20px" mr="1" />
                <Text as="span" lineHeight="24px">
                  Invite Others
                </Text>
              </Tab>
              <Tab
                _selected={{ color: 'white', bg: 'primary.200' }}
                borderRadius="lg"
                fontWeight="bold"
                data-testid="join-room-panel"
              >
                <Icon as={FaDoorOpen} mr="2" />
                <Text as="span" lineHeight="24px">
                  Join Room
                </Text>
              </Tab>
            </TabList>
          </>
        )}

        <TabPanels>
          <TabPanel>
            <Flex direction={{ base: 'column', lg: 'row' }} justifyContent="center" gap="12">
              <Flex direction="column" gap="4">
                <MobForm />
                <MobQuickAdd />
              </Flex>
              <Flex direction="column" gap="4">
                {!readOnlyRoom ? (
                  <>
                    {isClient && combatStarted && (
                      <Button variant="redSolid" onClick={() => endCombat()} data-testid="end-combat-btn">
                        End Combat
                      </Button>
                    )}
                    {isClient && !combatStarted && (
                      <Button onClick={() => startCombat()} data-testid="start-combat-button">
                        Start Combat
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {isClient && combatStarted && (
                      <Heading variant="redSolid" data-testid="combat-started-heading" textAlign="center">
                        Combat has started...
                      </Heading>
                    )}
                    {isClient && !combatStarted && (
                      <Heading data-testid="combat-ended-heading" textAlign="center">
                        Combat has NOT started.
                      </Heading>
                    )}
                  </>
                )}

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
          <TabPanel>
            <Flex gap="4" justifyContent="center">
              <InviteOthersForm />
            </Flex>
          </TabPanel>
          <TabPanel>
            <JoinRoomTabPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <InitiativeModal isOpen={isOpen} heroes={heroes} onClose={onClose} />
      <EndCombatConfirmationModal
        isOpen={endCombatIsOpen}
        updateCombatStarted={updateCombatStarted}
        onClose={onEndCombatModalClose}
      />
    </>
  );
};
