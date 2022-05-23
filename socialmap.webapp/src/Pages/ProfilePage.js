import Userfront from "@userfront/react";
import {
    Box,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import UserTable from "../components/UserPanel/UserTable";

//Userfront.init("xbr78p4n");

export default function ProfilePage() {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems='center' mb={20}>
            <Box width={'80vw'} mt={8}>
                <Text fontSize={'32px'} fontWeight='bold' mb={6}>
                    {Userfront.user.name}
                </Text>
                <Stack spacing={'12px'}>
                    <HStack>
                        <Text fontSize={'18px'} color={"gray.400"}>Email: </Text>
                        <Text fontSize={'18px'}>{Userfront.user.email}</Text>
                    </HStack>
                    <HStack>
                        <Text fontSize={'18px'} color={"gray.400"}>Uuid: </Text>
                        <Text fontSize={'18px'}>{Userfront.user.userUuid}</Text>
                    </HStack>
                </Stack>
                <Box height={0.5} border={'none'} bg={'gray.600'} marginTop={10} boxShadow={'0 3px 10px -0.5px gray'}>
                </Box>
            </Box>
            <UserTable/>
        </Box>
    );
}

function getRole() {
    if (Userfront.user.hasRole("admin"))
        return "Admin";
    else if (Userfront.user.hasRole("editor"))
        return "Editor";
    else
        return "User";
}