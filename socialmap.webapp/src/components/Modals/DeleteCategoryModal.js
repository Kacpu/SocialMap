import {
    Box, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Text, useToast
} from "@chakra-ui/react";
import WarningButton from "../Buttons/WarningButton";
import {deleteCategory} from "../../socialMapApi/categoryRequests";
import {errorToast, successToast} from "../Toasts/ToastUtil";
import {useState} from "react";

export default function DeleteCategoryModal(props) {
    const toast = useToast()
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = async () => {
        setIsDeleting(true);
        let res = await deleteCategory(props.id);
        console.log(res)
        if (res?.ok) {
            successToast(toast, "deleted", "category");
        } else {
            errorToast(toast)
        }
        props.onClose();
        props.onCategoryDelete(props.id);
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
                            <Text>
                                {props.name}
                            </Text>
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