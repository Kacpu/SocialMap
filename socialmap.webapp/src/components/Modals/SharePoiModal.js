import {
    Box,
    Button, Divider, Flex, FormControl, FormLabel,
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
import {getUsers} from "../../socialMapApi/userRequests";
import {useState} from "react";
import React from "react"

export default function SharePoiModal(props) {
    const [searchUsers, setSearchUsers] = useState([]);
    const [isUsersLoading, setIsUsersLoading] = useState(null);
    const [chosenUser, setChosenUser] = useState(null)

    const searchForUser = async (searchInput) => {
        setIsUsersLoading(true);
        setChosenUser(null)
        const res = await getUsers(null, searchInput).catch(console.error);
        if (res !== null && res !== undefined) {
            setSearchUsers(res);
            setIsUsersLoading(false);
        }
    };

    const onUserChosen = (u) => {
        setChosenUser(u);
        setIsUsersLoading(null);
    };

    const chosenUserComp =
        <Flex rounded={"md"} direction={"column"} my={1} width={"100%"}>
            <Text color={"gray.200"} fontWeight={"semibold"} mb={1}>Chosen User</Text>
            <Flex pl={3}>
                <Text mr={5} fontWeight={"semibold"} fontSize={17}>{chosenUser?.userName}</Text>
                <Text color={"gray.400"}>{chosenUser?.email}</Text>
            </Flex>
        </Flex>

    const usersList = searchUsers.map((u) =>
            <Flex key={u.email} rounded={"md"}  my={1} py={2} px={5} width={"100%"}
                  _hover={{bg: "gray.600"}} _focus={{bg: "gray.600"}} onClick={() => onUserChosen(u)}>
                <Text mr={5} fontWeight={"semibold"} fontSize={17}>{u.userName}</Text>
                <Text color={"gray.400"}>{u.email}</Text>
            </Flex>
    ) ;

    return (
        <Box>
            <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack><Text>Share point</Text><Text color={"teal.300"}>{props.name}</Text></HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={5}>
                            <FormLabel color={"gray.200"}>Search for the user</FormLabel>
                            <SearchInput placeholder={"username"} findFromInput={searchForUser}/>
                        </FormControl>

                        {/*{isUsersLoading === false && searchUsers.length}*/}
                        {/*{isUsersLoading === true && <Button width={"100%"} isLoading={true}></Button>}*/}
                        {/*/!*{chosenUser !== null && chosenUserComp}*!/*/}

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