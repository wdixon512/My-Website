import { useRouter } from 'next/router';
import { useEffect, useContext } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { DMHelperContext } from '@lib/components/contexts/DMHelperContext';

export const JoinRoomPage: React.FC = ({}) => {
  const router = useRouter();
  const { roomId } = router.query;
  const { joinRoom, room, loadingFirebaseRoom } = useContext(DMHelperContext);

  useEffect(() => {
    if (router.isReady && roomId) {
      // Call a function in DMHelperContext to join the room
      joinRoom(roomId as string);
      //   .then(() => {
      //       router.push(`/dm-helper`);
      //   });
    }
  }, [router.isReady, roomId]);

  if (loadingFirebaseRoom) {
    return (
      <Box textAlign="center" p={4}>
        <Spinner size="lg" />
        <Text>Loading room...</Text>
      </Box>
    );
  }

  if (!room) {
    return (
      <Box textAlign="center" p={4}>
        <Text>Room not found or you do not have access to this room.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Text>Welcome to Room ID: {roomId}</Text>
      {/* Render room details or a component for the room */}
    </Box>
  );
};

export default JoinRoomPage;
