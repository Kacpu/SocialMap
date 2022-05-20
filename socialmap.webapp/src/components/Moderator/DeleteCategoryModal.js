import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
     ModalOverlay, 
     Text} from "@chakra-ui/react";



export default function DeleteCategoryModal(props){
    return (
      <Box>  
        <Modal blockScrollOnMount={false} isOpen={props.isOpen} onClose={props.onClose}>
          <ModalOverlay  />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight='bold' mb='1rem'>
                You can scroll the content behind the modal
              </Text>
              <Text>
                  blalbalal
              </Text>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
}