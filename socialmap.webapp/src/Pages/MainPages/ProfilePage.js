import Userfront from "@userfront/react";
import {
    Box, Button,
    HStack,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import UserTable from "../../components/UserPanel/Tabs/UserTable";
import HorizontalLineBox from "../../components/Boxes/HorizontalLineBox";

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
                <HorizontalLineBox marginTop={10}/>
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