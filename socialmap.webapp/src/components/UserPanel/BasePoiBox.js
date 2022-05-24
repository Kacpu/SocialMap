import {Badge, Box, Button, Flex, HStack, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import React from "react";
import {ReactComponent as Like} from '../../icons/like-icon.svg'
import Map from "../Map/Map";
import ExpandButton from "../Buttons/ExpandButton";

export default function BasePoiBox(props) {
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
                                {props.poiData.name}
                            </Text>
                        </Box>
                    </Flex>
                    <Flex alignItems={"center"} justifyContent={"center"} rowGap={2} flexWrap={"wrap"} mt={{base: "2", md: "0"}}>
                        {props.badges}
                    </Flex>
                </Flex>

                <Box display={!displayContent ? "none" : ""}>
                    <Box>
                        <Text align={'center'} fontSize={'16px'} textAlign={"justify"} my={5}>
                            {props.poiData.description}
                        </Text>

                    </Box>

                    <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                        <Button variant={'ghost'} size='sm' color={"gray.400"} fontSize={16} onClick={onHideMap}
                                _focus={{boxShadow: ''}}>
                            {displayMap ? "Hide map" : "Show map"}
                        </Button>
                    </Flex>

                    {displayMap ? (<Box my={5}><Map diplayMarkers={true} mapCenter={[props.x, props.y]} zoom={17}
                                                    showSearch={false}/> </Box>) : (<></>)}

                    <HStack align={"center"} justify={"right"}>
                        <Text fontSize={'12px'}>
                            {props.poiData.likesNumber}
                        </Text>
                        <Like style={{width: 30, height: 30}}></Like>
                    </HStack>

                    {props.footer}

                    <Box height={0.5} border={'none'} bg={'teal.600'} opacity={0.6} my={3}
                         boxShadow={'0 3px 10px -0.5px teal'}/>

                    <Flex mt={5} flexDirection={{base: "column", md: "row"}} justifyContent={"space-between"} alignItems={"center"}>
                        <Flex flexDirection={{base: "column", md: "row"}}>
                            {props.leftButtons}
                        </Flex>
                        <Flex flexDirection={{base: "column", md: "row"}}>
                            {props.rightButtons}
                        </Flex>
                    </Flex>

                </Box>
            </Box>

        </React.Fragment>
    );
}