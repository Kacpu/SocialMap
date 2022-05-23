import {Badge, Box, Button, Flex, HStack, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import React from "react";
import {ReactComponent as Like} from '../../icons/like-icon.svg'
import Map from "../Map/Map";
import ExpandButton from "../Buttons/ExpandButton";

export default function PoiBox(props) {
    const [displayContent, setDisplayContent] = useState(false);
    const [displayMap, setDisplayMap] = useState(false);

    const onHideContent = () => {
        setDisplayContent(prevState => !prevState);
        setDisplayMap(false);
    }

    const onHideMap = () => {
        setDisplayMap(prevState => !prevState);
    }

    const boxColor = useColorModeValue('gray.600', 'gray.700');

    let status;
    let changeStatusButtonName;
    let changeStatusButtonFunction;

    if (props.isAccepted === true && props.isGlobal === true) {
        status = "public";
        changeStatusButtonName = "Make private";
    } else if (props.isAccepted === false && props.isGlobal === true) {
        status = "waiting for acceptance";
        changeStatusButtonName = "Make private";
    } else {
        status = "private";
        changeStatusButtonName = "Make public";
    }

    let badges = [
        <Badge key={1} colorScheme={"yellow"} mr={"2"}>
            {status}
        </Badge>
    ];

    badges = badges.concat(props.categoryDTOs.map(category => (
        <Badge key={category.id + 1} colorScheme={"teal"} mr={"2"}>
            {category.name}
        </Badge>
    )));

    return (
        <React.Fragment>
            <Box px={4} py={2} rounded={'lg'} bg={boxColor}
                 _hover={!displayContent ? {
                     bg: "gray.600",
                     cursor: 'pointer'
                 } : ""}
            >
                <Flex flexDirection={{base: "column", md: "row"}}  justifyContent={"space-between"}
                      position={"relative"} onClick={onHideContent}
                      _hover={displayContent ? {
                          cursor: 'pointer'
                      } : ""}
                >
                    <Flex alignItems={"center"}>
                        <ExpandButton isExpand={displayContent} />
                        <Box ml={5}>
                            <Text fontSize={'30px'} fontWeight='bold'>
                                {props.name}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex alignItems={"center"} justifyContent={"center"} rowGap={2} flexWrap={"wrap"} mt={{base: "2", md: "0"}}>
                            {badges}
                    </Flex>

                    {/*<Box position={"absolute"} left={"0"}>*/}
                    {/*    {!displayContent ? <ChevronDownIcon w={10} h={10}/> : <ChevronUpIcon w={10} h={10}/>}*/}
                    {/*</Box>*/}
                    {/*<Box alignSelf={"center"}>*/}
                    {/*    <Text fontSize={'30px'} fontWeight='bold'>*/}
                    {/*        {props.name}*/}
                    {/*    </Text>*/}
                    {/*</Box>*/}
                    {/*<Box position={"absolute"} right={"0"}>*/}
                    {/*    {badges}*/}
                    {/*</Box>*/}
                </Flex>

                <Box display={!displayContent ? "none" : ""}>
                    <Box>
                        <Text align={'center'} fontSize={'16px'} textAlign={"justify"} my={5}>
                            {props.description}
                        </Text>

                    </Box>

                    <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={"5px"}>
                        <Button variant={'ghost'} size='sm' color={"gray.400"} fontSize={16} onClick={onHideMap}
                                _focus={{boxShadow: ''}}>
                            {displayMap ? "Hide map" : "Show map"}
                        </Button>
                    </Flex>

                    {displayMap ? (<Box my={5}><Map diplayMarkers={true} mapCenter={[props.x, props.y]} zoom={17}
                                                    showSearch={false}/> </Box>) : (<></>)}

                    <HStack align={"center"} justify={"right"}>
                        <Text fontSize={'12px'}>
                            {props.likesNumber}
                        </Text>
                        <Like style={{width: 30, height: 30}}></Like>
                    </HStack>

                    <Text align={'center'} fontSize={'14px'} textAlign={"center"} mb={5}
                          display={props.creatorName ? "" : "none"}>
                        Author: {props.creatorName}
                    </Text>

                    <Box height={0.5} border={'none'} bg={'teal.600'} opacity={0.6} my={3}
                         boxShadow={'0 3px 10px -0.5px teal'}/>

                    <Flex mt={5} flexDirection={{base: "column", md: "row"}} justifyContent={"space-between"} alignItems={"center"}>
                        <Flex flexDirection={{base: "column", md: "row"}}>
                            <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16}>
                                See comments
                            </Button>
                            <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16}>
                                Share
                            </Button>
                            <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16}>
                                {changeStatusButtonName}
                            </Button>
                        </Flex>
                        <Flex flexDirection={{base: "column", md: "row"}}>
                            <Button variant={'ghost'} size='sm' color={"yellow.200"} fontSize={16}>
                                Edit
                            </Button>
                            <Button variant={'ghost'} size='sm' color={"red.400"} fontSize={16}>
                                Delete
                            </Button>
                        </Flex>
                    </Flex>

                </Box>
            </Box>

        </React.Fragment>
    );
}