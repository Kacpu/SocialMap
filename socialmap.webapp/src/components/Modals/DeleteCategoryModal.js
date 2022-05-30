import {
    Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Text, useToast
} from "@chakra-ui/react";
import WarningButton from "../Buttons/WarningButton";
import {deleteCategory} from "../../socialMapApi/categoryRequests";
import {errorToast, successToast} from "../Toasts/ToastUtil";
import {useState} from "react";
import WrapText from "../Elems/WrapText";

export default function DeleteCategoryModal(props) {
    const toast = useToast()
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = async () => {
        setIsDeleting(true);
        let res = await deleteCategory(props.id);
        if (res?.ok) {
            props.onClose();
            props.onCategoryDelete(props.id);
            successToast(toast, "deleted", "category " + props.name);
        } else {
            props.onClose();
            errorToast(toast)
        }
    }

    return (
        <Box>
            <Modal blockScrollOnMount={false} isOpen={props.isOpen} onClose={props.onClose} isCentered> 
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete category?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack>
                            <Text fontWeight='bold'>
                                ID:
                            </Text>
                            <Text>
                                {props.id}
                            </Text>
                        </HStack>
                        <HStack mt={2}>
                            <Text fontWeight='bold'>
                                Name
                            </Text>
                            <WrapText>
                                {props.name}
                            </WrapText>
                        </HStack>
                    </ModalBody>

                    <ModalFooter>
                        <WarningButton mr={3} onClick={onDelete} isLoading={isDeleting}>
                            Yes
                        </WarningButton>
                        <Button onClick={props.onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}