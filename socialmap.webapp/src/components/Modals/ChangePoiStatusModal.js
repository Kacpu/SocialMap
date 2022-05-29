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
import React, {useState} from "react";
import {updatePoi} from "../../socialMapApi/poiRequests";
import {errorToast, successToast} from "../Toasts/ToastUtil";
import WrapText from "../Elems/WrapText";
import AcceptButton from "../Buttons/AcceptButton";

export default function ChangePoiStatusModal(props) {
    const toast = useToast()
    const [isChanging, setIsChanging] = useState(false);

    const onChangeStatus = async () => {
        setIsChanging(true);
        let res = await updatePoi(props.id, {isGlobal: getIsGlobal()});
        if (res?.ok) {
            successToast(toast, getSuccessToastMessage(), "point " + props.name);
            props.onChangeStatus();
        } else {
            errorToast(toast)
        }
        props.onClose();
    }

    function getIsGlobal() {
        if (props.status === "public" || props.status === "waiting for acceptance") {
            return false;
        } else if (props.status === "private") {
            return true;
        }
    }

    function getSuccessToastMessage() {
        if (props.status === "public") {
            return "changed status to private";
        } else if (props.status === "waiting for acceptance") {
            return "changed status to private";
        } else if (props.status === "private") {
            return "changed status to waiting for acceptance";
        }
    }

    return (
        <Box>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={"xl"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Flex mx={5} justify={"center"} flexWrap={"wrap"}>
                            <Text mx={1}>{props.changeStatusActionName} point</Text>
                            <WrapText mx={1} textAlign={"center"} color={"teal.300"}>{props.name}</WrapText>
                        </Flex>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text color={"gray.300"} fontWeight={"semibold"}>
                            Do you want to {props.changeStatusActionName?.charAt(0).toLowerCase()
                            + props.changeStatusActionName?.slice(1)} the point {props.name}?
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <AcceptButton mr={3} onClick={onChangeStatus} isLoading={isChanging}>
                            {props.status === "waiting for acceptance" ? "Cancel Request"
                                : props.status === "private" ? "Send Request"
                                    : props.changeStatusActionName}
                        </AcceptButton>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}