import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';

interface JoinRoomTabPanelProps {}

export const JoinRoomTabPanel: React.FC<JoinRoomTabPanelProps> = ({}) => {
  return (
    <Flex gap="4" justifyContent="center">
      <Heading>Join Room - Coming Soon!</Heading>
    </Flex>
  );
};

export default JoinRoomTabPanel;
