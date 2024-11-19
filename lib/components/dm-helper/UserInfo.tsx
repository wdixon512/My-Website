import { Box, Heading, Text, BoxProps, Flex } from '@chakra-ui/layout';
import { auth } from '@lib/services/firebase';
import { DMHelperContext } from '../contexts/DMHelperContext';
import { useContext } from 'react';
import { Image } from '@chakra-ui/react';

interface UserInfoProps extends BoxProps {}

export const UserInfo: React.FC<UserInfoProps> = ({ ...props }) => {
  const { room } = useContext(DMHelperContext);
  return (
    <Box {...props}>
      <Heading as="h3" color="white">
        User Info
      </Heading>
      <hr />
      {auth.currentUser ? (
        <Flex gap="4" mt="4">
          <Image src={auth.currentUser.photoURL} />
          <Flex direction="column">
            <Text color="white">
              <b>User Name:</b> {auth.currentUser.displayName}
            </Text>
            <Text color="white">
              <b>Email: </b>
              {auth.currentUser.email}
            </Text>
          </Flex>
        </Flex>
      ) : (
        <>
          <Text>You are not signed in to your Google account.</Text>
        </>
      )}
    </Box>
  );
};

export default UserInfo;
