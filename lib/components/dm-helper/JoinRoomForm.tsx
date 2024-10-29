import { useState } from 'react';
import { db, signInWithGoogle } from '@services/firebase';
import { Flex, Heading, Text, Button, Input } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';

export const JoinRoomForm = () => {
  const [roomLink, setRoomLink] = useState<string | null>(null);
  const rooms = getDocs(collection(db, 'rooms')).then((snapshot) => {
    console.log(
      'rooms: ',
      snapshot.docs.map((doc) => doc.data())
    );
  });

  const createRoom = () => {
    signInWithGoogle();
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
        <Button onClick={createRoom}>Create Room</Button>
      )}
    </Flex>
  );
};
