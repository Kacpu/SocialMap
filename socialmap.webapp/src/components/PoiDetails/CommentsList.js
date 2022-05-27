import React from "react";
import {Box, HStack, Icon, Stack, Text, VStack} from "@chakra-ui/react";
import {FaUser} from "react-icons/fa";

export default function CommentsList(props) {


    const commentsList = props.comments.map((elem) =>
        <Stack rounded={"1px"} border={"1px"} borderColor={"gray.600"} rounded={"lg"}>
            <Box px={"10px"} py={"5px"}>
                <HStack color={"gray.300"} spacing={"4px"}>
                    <Icon w={3} h={3} as={FaUser}></Icon>
                    <Text  fontSize={"14px"}>{elem.author}</Text>
                </HStack>
                <Text fontSize={"lg"}>{elem.name}</Text>
            </Box>
        </Stack>
    );

    return (
        <React.Fragment>
            {commentsList}
        </React.Fragment>
    );
}