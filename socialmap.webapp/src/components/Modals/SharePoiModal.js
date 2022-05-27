import {
    Box,
    Button, FormControl, FormLabel,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import SearchInput from "../Buttons/SearchInput";
import AcceptButton from "../Buttons/AcceptButton";

export default function SharePoiModal(props) {
    const searchForUser = () => {

    };

    return (
        <Box>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack><Text>Share point</Text><Text color={"teal.300"}>{props.name}</Text></HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel color={"gray.200"}>Search for the user</FormLabel>
                            <SearchInput placeholder={"username"} findFromInput={searchForUser}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <AcceptButton mr={3} >
                            Confirm
                        </AcceptButton>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}