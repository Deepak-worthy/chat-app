import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Image,
  Tooltip,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Tooltip label={"user profile"} placement="bottom" bg="teal" hasArrow>
          <Button mx={4} _focus={{border: 'none'}} onClick={onOpen}><i class="fa fa-user" aria-hidden="true"></i></Button>
        </Tooltip>
        
      )}
      <Modal size="sm" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="300px" bg="teal" color="white">
          <ModalHeader
            fontSize="30px"
            d="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton _focus={{border: 'none'}}/>
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              style={{objectFit: 'cover'}}
            />
            <Text
              fontSize={{ base: "18px", md: "20px" }}
            >
              Email: {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
