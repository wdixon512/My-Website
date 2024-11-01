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
  FormControl,
} from '@chakra-ui/react';
import { useContext, useState, useRef } from 'react';
import { EntityType, Entity } from '@lib/models/dm-helper/Entity';
import { DMHelperContext } from '../../contexts/DMHelperContext';

interface EntityEditModalProps {
  entity: Entity;
  isOpen: boolean;
  onClose: () => void;
}

export const EntityEditModal: React.FC<EntityEditModalProps> = ({ entity, isOpen, onClose }) => {
  const { updateEntities } = useContext(DMHelperContext);
  const [newInitiaive, setNewInitiative] = useState<string>(entity.initiative?.toString());
  const [newName, setNewName] = useState<string>(entity.name);
  const [newHealth, setNewHealth] = useState<string>(entity.health?.toString());

  const handleDone = (success: boolean) => {
    if (success) {
      updateEntities((prevEntities) =>
        prevEntities.map((e) => {
          if (e.id === entity.id) {
            if (entity.type === EntityType.MOB) {
              const sameName = newName === entity.name;
              const mobsWithSameName = prevEntities.filter((m) => m.name === newName);
              const newNumber = sameName ? entity.number : mobsWithSameName.length + 1;

              return {
                ...e,
                name: newName,
                health: parseInt(newHealth, 10),
                initiative: parseInt(newInitiaive, 10),
                number: newNumber,
                id: `${newName.toLowerCase()}-${newNumber}`,
              };
            }

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
      <ModalContent
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleDone(true);
          }
        }}
      >
        {entity && (
          <>
            <ModalHeader textColor="primary.400">Update {entity.name}'s Initiative</ModalHeader>
            <ModalBody>
              {entity.type === EntityType.MOB && (
                <>
                  <FormControl mb={4}>
                    <FormLabel color="blackAlpha.900">Mob Name</FormLabel>
                    <Input
                      type="text"
                      value={newName}
                      color="blackAlpha.700"
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Enter mob name"
                      required={true}
                      data-testid="name-edit-modal-input"
                    />
                  </FormControl>

                  <FormControl mb={4}>
                    <FormLabel color="blackAlpha.900">Mob Health</FormLabel>
                    <Input
                      type="text"
                      color="blackAlpha.700"
                      value={newHealth}
                      onChange={(e) => setNewHealth(e.target.value)}
                      placeholder="Enter mob health"
                      required={false}
                      data-testid="health-edit-modal-input"
                    />
                  </FormControl>
                </>
              )}
              <FormControl mb={4}>
                <FormLabel color="blackAlpha.900">Mob Initiative</FormLabel>
                <Input
                  type="number"
                  textColor="primary.400"
                  placeholder="Enter initiative"
                  value={newInitiaive}
                  onChange={(e) => setNewInitiative(e.target.value)}
                  required={true}
                  data-testid="initiative-edit-modal-input"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent="space-between">
              <Button variant="redLink" onClick={() => handleDone(false)} data-testid="cancel-edit-modal-btn">
                Cancel
              </Button>
              <Button variant="solid" onClick={() => handleDone(true)} data-testid="done-edit-modal-btn">
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
