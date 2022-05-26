import React from "react";
import {Box, Stack, Text, VStack} from "@chakra-ui/react";


export default function CommentsList(props) {


    const commentsList = props.comments.map((elem) =>
        <Stack rounded={"1px"} border={"1px"} borderColor={"gray.600"} rounded={"lg"}>
            <Box px={"10px"} py={"5px"}>
            <Text color={"gray.300"} fontSize={"14px"}>@{elem.author}</Text>
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