import {
    Box, Button,
    Flex,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {errorToast, successToast} from "../Toasts/ToastUtil";
import WrapText from "../Elems/WrapText";
import WarningButton from "../Buttons/WarningButton";
import {deletePoiAccess, getPoiAccesses, getPoiAccessesForUser} from "../../socialMapApi/poiAccessRequests";

export default function DeleteAccessToPoiModal(props) {
    const toast = useToast()
    const [isDeleting, setIsDeleting] = useState(false);
    const ac = new AbortController();

    useEffect(() => {
        return () => ac.abort("abort on close delete access to poi modal")
    }, [])

    const onDelete = async () => {
        setIsDeleting(true);
        const accessId = await getPoiAccessId();
        if(accessId !== null) {
            const res = await deletePoiAccess(accessId);
            if (res?.ok) {
                successToast(toast, null, null,null,
                    getSuccessToastMessage() + " to point " + props.name + "!");
                props.onClose();
                props.onAccessToPoiDelete(props.id);
                return;
            } else {
                errorToast(toast)
            }
        } else {
            errorToast(toast)
        }
        props.onClose();
    }

    async function getPoiAccessId() {
        const res = await getPoiAccessesForUser(ac.signal, props.id).catch(console.error);
        return res?.ok && res.data?.length > 0 ? res.data[0].id : null;
    }

    function getActionName(){
        if (props.action === "remove") {
            return "Remove access";
        } else if (props.action === "reject") {
            return "Reject invitation";
        }
    }

    function getSuccessToastMessage(){
        if (props.action === "remove") {
            return "Removed access";
        } else if (props.action === "reject") {
            return "Rejected invitation";
        }
    }

    return (
        <Box>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={"xl"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Flex mx={5} justify={"center"} flexWrap={"wrap"}>
                            <Text mx={1}>{getActionName()} to point</Text>
                            <WrapText mx={1} textAlign={"center"} color={"teal.300"}>{props.name}</WrapText>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text color={"gray.300"} fontWeight={"semibold"}>
                            Are you sure you want to {getActionName()?.charAt(0).toLowerCase()
                            + getActionName()?.slice(1)} from {props.issuerName} to point {props.name}?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <WarningButton mr={3} onClick={onDelete} isLoading={isDeleting}>
                            {getActionName()}
                        </WarningButton>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}