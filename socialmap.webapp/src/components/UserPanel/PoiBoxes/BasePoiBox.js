import {Badge, Box, Button, Flex, HStack, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {useState} from "react";
import React from "react";
import {ReactComponent as Like} from '../../../icons/like-icon.svg'
import Map from "../../Map/Map";
import ExpandButton from "../../Buttons/ExpandButton";

export default function BasePoiBox(props) {
    const [displayContent, setDisplayContent] = useState(false);

    const onHideContent = () => {
        setDisplayContent(prevState => !prevState);
    }

    const boxColor = useColorModeValue('gray.600', 'gray.700');

    return (
        <React.Fragment>
            <Box px={4} py={2} rounded={'lg'} bg={!displayContent ? boxColor : "#394256"}
                 _hover={!displayContent ? {
                     bg: "#394256",
                     cursor: 'pointer'
                 } : ""}
            >
                <Flex flexDirection={{base: "column", md: "row"}} justifyContent={"space-between"} my={2}
                      position={"relative"} onClick={onHideContent}
                      _hover={displayContent ? {
                          cursor: 'pointer'
                      } : ""}
                >
                    <Flex alignItems={"center"}>
                        <ExpandButton isExpand={displayContent}/>
                        <Box ml={5}>
                            <Text fontSize={'30px'} fontWeight='bold'>
                                {props.poiData.name}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex alignItems={"center"} justifyContent={"center"} rowGap={2} flexWrap={"wrap"}
                          mt={{base: "2", md: "0"}}>
                        {props.badges}
                    </Flex>
                </Flex>

                <Box display={!displayContent ? "none" : ""}>
                    <Box mx={{base: 3, md: 14}} mt={4} mb={2}>
                        <Text align={'center'} fontSize={'16px'} textAlign={"justify"}>
                            {props.poiData.description}
                        </Text>
                    </Box>

                    <Flex pt={2} pb={1} mx={1} justifyContent={"space-between"} align={"center"} flexWrap={"wrap"}
                          flexDirection={{base: "column", md: "row"}} rowGap={props.centerFooter ? 1 : 0}>
                        <Flex align={"center"} width={"10vw"} justifyContent={"left"}>
                            {props.leftFooter}
                        </Flex>
                        <Flex align={"center"}>
                            {props.centerFooter}
                        </Flex>
                        <Flex align={"center"} width={"10vw"} justify={"right"} alignSelf={"end"}>
                            <Text fontSize={'16px'} fontWeight={"semibold"} color={"gray.200"} mr={2}>
                                {props.poiData.likesNumber}
                            </Text>
                            <Like style={{width: 30, height: 30}}></Like>
                        </Flex>
                    </Flex>

                    <Box height={0.5} border={'none'} bg={'gray.600'} my={2}
                         boxShadow={'0 3px 10px -1px gray'}/>

                    <Flex mt={3} mb={1} flexDirection={{base: "column", md: "row"}} justifyContent={"space-between"}
                          alignItems={"center"} rowGap={2}>
                        <Flex flexWrap={"wrap"} justify={"center"} rowGap={3}>
                            {props.leftButtons}
                        </Flex>
                        <Flex mt={{base: 2, md: 0}} flexWrap={"wrap"} justify={"center"} rowGap={3}>
                            {props.rightButtons}
                        </Flex>
                    </Flex>
                </Box>
            </Box>
        </React.Fragment>
    );
}