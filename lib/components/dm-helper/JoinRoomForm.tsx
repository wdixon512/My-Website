import { useState } from 'react';
import { Flex, Heading, Text, Button, Input } from '@chakra-ui/react';

export const JoinRoomForm = () => {
  const [roomLink, setRoomLink] = useState('');

  const createRoom = () => {
    const newRoomLink = `${process.env.NEXT_PUBLIC_BASE_URL}/room/123`; // Replace with dynamic logic
    setRoomLink(newRoomLink);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomLink);
    alert('Link copied to clipboard!');
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
        <Button onClick={createRoom}>Create Room</Button>
      )}
    </Flex>
  );
};
