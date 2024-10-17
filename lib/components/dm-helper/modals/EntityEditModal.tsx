import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useContext, useState, useRef } from 'react';
import Entity from '@lib/models/dm-helper/Entity';
import { DMHelperContext } from '../../contexts/DMHelperContext';

interface EntityEditModalProps {
  entity: Entity;
  isOpen: boolean;
  onClose: () => void;
}

export const EntityEditModal: React.FC<EntityEditModalProps> = ({ entity, isOpen, onClose }) => {
  const { setEntities } = useContext(DMHelperContext);
  const [newInitiaive, setNewInitiative] = useState<string>(entity.initiative?.toString());

  const handleDone = (success: boolean) => {
    if (success) {
      setEntities((prevEntities) =>
        prevEntities.map((e) => {
          if (e.id === entity.id) {
            return { ...e, initiative: parseInt(newInitiaive, 10) };
          }
          return e;
        })
      );
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleDone(true)} isCentered>
      <ModalOverlay />
      <ModalContent>
        {entity && (
          <>
            <ModalHeader textColor="primary.400">Update {entity.name}'s Initiative</ModalHeader>
            <ModalBody>
              <Input
                type="number"
                textColor="primary.400"
                placeholder="Enter initiative"
                value={newInitiaive}
                onChange={(e) => setNewInitiative(e.target.value)}
                required={true}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleDone(true);
                  }
                }}
              />
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              <Button variant="redLink" onClick={() => handleDone(false)}>
                Cancel
              </Button>
              <Button variant="solid" onClick={() => handleDone(true)}>
                Done
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EntityEditModal;
