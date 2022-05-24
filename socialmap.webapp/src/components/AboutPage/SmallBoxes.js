import {Box, Flex, Image, Text, VStack} from "@chakra-ui/react";


export default function SmallBoxes(props){

    return(
        <Box>
            <VStack width={"120px"} textAlign={"center"}>
                <Image boxSize={"80px"}src={props.src}></Image>
                <Text fontWeight={"thin"}>{props.text}</Text>
            </VStack>
        </Box>
    );
}