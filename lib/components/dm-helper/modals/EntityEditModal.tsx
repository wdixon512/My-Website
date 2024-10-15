import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { useContext, useState, useRef } from 'react';
import Entity, { EntityType } from '@lib/models/dm-helper/Entity';
import { DMHelperContext } from '../../contexts/DMHelperContext';

interface EntityEditModalProps {
  entity: Entity;
  isOpen: boolean;
  onClose: () => void;
}

export const EntityEditModal: React.FC<EntityEditModalProps> = ({ entity, isOpen, onClose }) => {
  const { setEntities } = useContext(DMHelperContext);

  const handleDone = (success: boolean) => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleDone(true)} isCentered>
      <ModalOverlay />
      <ModalContent>
        {entity && (
          <>
            <ModalHeader textColor="primary.400"></ModalHeader>
            <ModalBody>
              {/* <Input
                type="number"
                textColor="primary.400"
                placeholder="Enter initiative"
                value={''}
                onChange={() => {
                  return;
                }}
                required={true}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                  }
                }}
              /> */}
              <Text textColor="primary.100" fontWeight={'bold'}>
                Inline Hero/Mob edit coming soon!
              </Text>
            </ModalBody>
            <ModalFooter justifyContent="space-between"></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EntityEditModal;
