import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

interface EndCombatConfirmationModalProps {
  isOpen: boolean;
  setCombatStarted: (value: boolean) => void;
  onClose: () => void;
}

export const EndCombatConfirmationModal: React.FC<EndCombatConfirmationModalProps> = ({
  isOpen,
  setCombatStarted,
  onClose,
}) => {
  const handleDone = (success: boolean) => {
    if (success) {
      setCombatStarted(false);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textColor="primary.400">Are you sure you want to end combat?</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter justifyContent="space-between">
          <Button variant="redLink" onClick={() => handleDone(false)}>
            Cancel
          </Button>
          <Button variant="solid" onClick={() => handleDone(true)}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EndCombatConfirmationModal;
