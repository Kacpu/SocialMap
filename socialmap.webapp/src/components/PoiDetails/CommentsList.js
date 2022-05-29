import React, {useEffect, useState} from "react";
import {Box, Flex, HStack, Icon, Spinner, Stack, Text} from "@chakra-ui/react";
import {FaUser} from "react-icons/fa";
import WrapText from "../Elems/WrapText";
import BaseInfiniteScrollPanel from "../UserPanel/Tabs/BaseInfiniteScrollPanel";

export default function CommentsList(props) {
    const createCommentsList = (comments) => {
        return comments.map((c) =>
            <Stack key={c.id} mt={2} border={"1px"} borderColor={"gray.600"} rounded={"lg"}>
                <Box px={"10px"} py={"5px"}>
                    <Flex justify={"space-between"}>
                        <HStack color={"gray.300"} spacing={"4px"}>
                            <Icon w={3} h={3} as={FaUser}></Icon>
                            <WrapText fontSize={"14px"}>{c.hasOwnProperty("authorName") && c.authorName}</WrapText>
                        </HStack>
                        <Text color={"gray.400"} fontSize={"14px"}>
                            {c.hasOwnProperty("publicationDate") && getDateString(c.publicationDate)}
                        </Text>
                    </Flex>
                    <Text py={1} px={4} textAlign={"justify"} fontSize={"lg"}>{c.hasOwnProperty("content") && c.content}</Text>
                </Box>
            </Stack>
        );
    }

    function getDateString(dateObject) {
        const day = dateObject.day?.toString().length === 1 ? "0" + dateObject.day : dateObject.day;
        const month = dateObject.month?.toString().length === 1 ? "0" + dateObject.month : dateObject.month;
        return day + "." + month + "." + dateObject.year;
    }

    return (
        <React.Fragment>
            {props.isLoading ? (
                <Flex pt={2} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"md"}/>
                </Flex>
            ) : (
                <BaseInfiniteScrollPanel
                    allData={props.comments}
                    createDataComponentList={createCommentsList}
                    dataName={"comments"}
                />
            )}
        </React.Fragment>
    );
}