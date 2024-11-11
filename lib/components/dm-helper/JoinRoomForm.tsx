import { useContext, useState } from 'react';
import { signInWithGoogle } from '@services/firebase';
import { Flex, Heading, Text, Button, Input, useToast } from '@chakra-ui/react';
import { DMHelperContext } from '../contexts/DMHelperContext';

export const JoinRoomForm = () => {
  const { createRoom } = useContext(DMHelperContext);
  const [roomLink, setRoomLink] = useState<string | null>(null);
  const toast = useToast();

  const handleCreateRoom = async () => {
    await signInWithGoogle();
    const joinRoomLink = await createRoom();
    if (joinRoomLink) setRoomLink(joinRoomLink);
  };

  const copyToClipboard = () => {
    if (roomLink) {
      navigator.clipboard.writeText(roomLink).then(() => {
        toast({
          title: 'Link Copied',
          description: 'Join room link has been copied to clipboard.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      });
    }
  };

  return (
    <Flex direction="column">
      <Heading>Looking to share with others?</Heading>
      <Text as="p">You can now give others readonly access to your combat!</Text>
      <Text as="p">Readonly users will NOT see enemy health.</Text>

      {roomLink ? (
        <Flex direction="column">
          <Input value={roomLink} isReadOnly />
          <Button onClick={copyToClipboard}>Copy Join Room Link</Button>
        </Flex>
      ) : (
        <Button onClick={handleCreateRoom} data-testid="create-room-button">
          Create Room
        </Button>
      )}
    </Flex>
  );
};
