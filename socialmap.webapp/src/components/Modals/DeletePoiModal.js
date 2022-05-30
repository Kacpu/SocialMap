import {
    Box,
    Button, Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text, useToast
} from "@chakra-ui/react";
import React, {useState} from "react";
import WarningButton from "../Buttons/WarningButton";
import {errorToast, successToast} from "../Toasts/ToastUtil";
import {deletePoi} from "../../socialMapApi/poiRequests";
import WrapText from "../Elems/WrapText";

export default function DeletePoiModal(props) {
    const toast = useToast()
    const [isDeleting, setIsDeleting] = useState(false);

    const onDelete = async () => {
        setIsDeleting(true);
        let res = await deletePoi(props.id);
        if (res?.ok) {
            successToast(toast, "deleted", "point " + props.name);
            props.onClose();
            props.onUserPointDelete(props.id);
            return;
        } else {
            errorToast(toast)
        }
        props.onClose();
    }

    return (
        <Box>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={"xl"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Flex mx={5} justify={"center"} flexWrap={"wrap"}>
                            <Text mx={1}>Delete point</Text>
                            <WrapText mx={1} textAlign={"center"} color={"teal.300"}>{props.name}</WrapText>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text color={"gray.300"} fontWeight={"semibold"}>
                            Are you sure you want to delete point {props.name}?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <WarningButton mr={3} onClick={onDelete} isLoading={isDeleting}>
                            Delete
                        </WarningButton>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}