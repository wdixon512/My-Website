import { useContext, useState } from 'react';
import { signInWithGoogle } from '@services/firebase';
import { Flex, Heading, Text, Button, Input, useToast } from '@chakra-ui/react';
import { createRoomService } from '@lib/services/dm-helper-room-service';
import { DMHelperContext } from '../contexts/DMHelperContext';

export const JoinRoomForm = () => {
  const roomService = createRoomService();
  const { room, setRoom } = useContext(DMHelperContext);
  const [roomLink, setRoomLink] = useState<string | null>(null);
  const toast = useToast();

  const createRoom = async () => {
    await signInWithGoogle();
    const newRoom = await roomService.createRoom(room);
    setRoom(newRoom);
    toast({
      title: 'Room Created',
      description: 'Your room has been created!',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const copyToClipboard = () => {};

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
        <Button onClick={createRoom} data-testid="create-room-button">
          Create Room
        </Button>
      )}
    </Flex>
  );
};
