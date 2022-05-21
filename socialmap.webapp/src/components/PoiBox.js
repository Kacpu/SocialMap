import {Badge, Box, Button, HStack, Text, useColorModeValue} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getPoi} from "../socialMapApi/poiRequests";
import React from "react";
import {poiResponse} from "../socialMapApi/schemas";
import {ReactComponent as Like} from '../icons/like-icon.svg'

export default function PoiBox({poiId}) {
    const [poiData, setPoiData] = useState(poiResponse);

    const boxColor = useColorModeValue('gray.600', 'gray.700');

    useEffect(() => {
        (async () => {
            const res = await getPoi(poiId).catch(console.error);
            console.log(res);
            setPoiData(res);
        })();
    }, [poiId]);

    const categoryBadges = poiData != null ? poiData.categoryDTOs.map(category => (
        <Badge key={category.id} colorScheme={"teal"}>
            {category.name}
        </Badge>
    )) : [];

    return (
        <React.Fragment>
            {poiData != null
                ? <Box width={'50vw'} mt={8} px={10} py={5} rounded={'lg'} bg={boxColor} boxShadow={'lg'}>
                    <Text textAlign={"center"} fontSize={'30px'} fontWeight='bold' mb={0} mr={30}>
                        {poiData.name}
                    </Text>
                    <HStack justify={"right"} mb={5}>
                        {categoryBadges}
                    </HStack>
                    <Text align={'center'} fontSize={'16px'} textAlign={"justify"} mb={6}>
                        {poiData.description}
                    </Text>
                    <HStack align={"center"} justify={"right"}>
                        <Text fontSize={'12px'}>
                            {poiData.likesNumber}
                        </Text>
                        <Like style={{width:30, height:30}}></Like>
                    </HStack>
                    <Text align={'center'} fontSize={'12px'} textAlign={"center"} mb={3}>
                        Author: {poiData.creatorName}
                    </Text>

                    <Box height={0.5} border={'none'} bg={"#32a2a8"} marginTop={5}  boxShadow={'0 3px 13px 1px gray'}>
                    </Box>

                    <HStack mt={5} justify={"space-between"}>
                        <HStack>
                            <Button backgroundColor={"transparent"} size='sm' color={"teal.300"} fontSize={16}>
                                See comments
                            </Button>
                            <Button backgroundColor={"transparent"} size='sm' color={"teal.300"} fontSize={16}>
                                Share
                            </Button>
                        </HStack>
                        <Button backgroundColor={"transparent"} size='sm' color={"red.400"} fontSize={16}>
                            Delete
                        </Button>
                    </HStack>

                </Box>

                : <Text mt={8} >Can't load poi data</Text>
            }
        </React.Fragment>
    );
}