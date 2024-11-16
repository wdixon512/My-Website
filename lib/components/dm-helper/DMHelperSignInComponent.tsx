import { useContext } from 'react';
import { DMHelperContext } from '../contexts/DMHelperContext';
import { Button, Flex, Text } from '@chakra-ui/react';
import { auth } from '@lib/services/firebase';
import { useFirebaseGoogleAuth } from '../contexts/FirebaseGoogleAuthContext';

export const DMHelperSignInComponent: React.FC = () => {
  const { room, readOnlyRoom } = useContext(DMHelperContext);
  const { signInWithGoogle, signOutOfGoogle } = useFirebaseGoogleAuth();

  return (
    <>
      {room?.id && <Text>Current Room Id: {room.id}</Text>}
      {!readOnlyRoom ? (
        <Flex gap={4}>
          {!auth.currentUser && (
            <Button onClick={signInWithGoogle} data-testid="sign-in-btn">
              Sign In
            </Button>
          )}
          {auth.currentUser && (
            <Button variant="redSolid" onClick={signOutOfGoogle} data-testid="sign-out-btn">
              Sign Out
            </Button>
          )}
        </Flex>
      ) : (
        <>
          {/* TODO: Implement Leave Room button */}
          <Button variant="redSolid" data-testid="leave-room-btn">
            Leave Room
          </Button>
        </>
      )}
    </>
  );
};

export default DMHelperSignInComponent;
