import {
    Box,
    Button, Flex, FormControl, FormLabel,
    HStack, IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Text, useToast
} from "@chakra-ui/react";
import SearchInput from "../Buttons/SearchInput";
import AcceptButton from "../Buttons/AcceptButton";
import {useEffect, useState} from "react";
import React from "react"
import {getUser} from "../../socialMapApi/userRequests";
import LoadingButton from "../Buttons/LoadingButton";
import {CloseIcon} from "@chakra-ui/icons";
import Userfront from "@userfront/react";
import {errorToast, successToast} from "../Toasts/ToastUtil";
import {addPoiAccess, getPoiAccesses} from "../../socialMapApi/poiAccessRequests";

export default function SharePoiModal(props) {
    const [isUserSearching, setIsUserSearching] = useState(null);
    const [isSharing, setIsSharing] = useState(false);
    const [chosenUser, setChosenUser] = useState(null);
    const [searchError, setSearchError] = useState("");
    const toast = useToast();
    const ac = new AbortController();

    useEffect(() => {
        return () => ac.abort("abort on close share poi modal")
    }, [])

    const handleSharePoi = async () => {
        setIsSharing(true);
        const res = await addPoiAccess(
            {
                poiId: props.poiData.id,
                invitedUserId: chosenUser.id
            });
        if (res?.ok) {
            successToast(toast, "Shared", props.poiData.name)
        } else {
            errorToast(toast)
        }
        props.onClose();
    }

    const searchForUser = async (email) => {
        setIsUserSearching(true);
        const res = await getUser(ac.signal, email !== "" ? email : null).catch(console.error);

        if (res === null) {
            return;
        } else if (res.ok && res.data.hasOwnProperty("id") && res.data.hasOwnProperty("email")
            && res.data.email !== Userfront.user.email) {
            const isPoiAlreadyShared = await isPoiAccessExist(res.data.id);
            if (isPoiAlreadyShared === false) {
                setChosenUser(res.data);
            } else if (isPoiAlreadyShared === true) {
                setChosenUser(null);
                setSearchError(props.poiData.name + " is already shared with " + res.data.userName + "!");
            } else {
                return;
            }
        } else if (res.ok && res.data.email === Userfront.user.email) {
            setChosenUser(null);
            setSearchError("It's you!");
        } else if (!res.ok && res.status === 404) {
            setChosenUser(null);
            setSearchError("User not found!");
        }
        setIsUserSearching(false);
    };

    async function isPoiAccessExist(userId) {
        const res = await getPoiAccesses(ac.signal, userId, props.poiData.id).catch(console.error);
        return res === null ? null : res.ok && res.data.length > 0;
    }

    const onFoundUserCancel = () => {
        setChosenUser(null);
        setIsUserSearching(null);
    }

    const searchResultElement = chosenUser !== null
        ? <Flex rounded={"md"} direction={"column"} width={"100%"}>
            <Text color={"gray.300"} fontWeight={"semibold"} mb={2}>Chosen User</Text>
            <Flex rounded={"md"} ml={1} py={1} px={4} bg={"gray.800"} justify={"space-between"} align={"center"}>
                <Flex align={"center"}>
                    <Text mr={5} fontWeight={"semibold"} fontSize={17}>{chosenUser.userName}</Text>
                    <Text color={"gray.400"}>{chosenUser.email}</Text>
                </Flex>
                <IconButton aria-label={"cancel search"} icon={<CloseIcon/>} variant={"ghost"} size={"sm"}
                            onClick={onFoundUserCancel}/>
            </Flex>
            <Text color={"gray.300"} fontWeight={"semibold"} mt={5}>
                Do you want to share {props.name} with {chosenUser.userName}?
            </Text>
        </Flex>
        : <Text color={"red.400"} fontWeight={"semibold"} fontSize={16}>{searchError}</Text>;

    return (
        <Box>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={"xl"}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <HStack justify={"center"}>
                            <Text>Share point</Text><Text color={"teal.300"}>{props.poiData.name}</Text>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl mb={5}>
                            <FormLabel color={"gray.300"}>Search for the user</FormLabel>
                            <SearchInput placeholder={"email"}
                                         findFromInput={searchForUser}
                                         findWithReset={false}
                                         inputStyle={{border: "none", _focus: {border: "none"}}}/>
                        </FormControl>
                        {isUserSearching === true && <LoadingButton/>}
                        {isUserSearching === false && searchResultElement}
                    </ModalBody>
                    <ModalFooter>
                        <AcceptButton mr={3} isDisabled={chosenUser === null} onClick={handleSharePoi}
                                      isLoading={isSharing}>
                            Share
                        </AcceptButton>
                        <Button onClick={props.onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}