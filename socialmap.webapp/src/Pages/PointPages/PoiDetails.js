import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react"
import {Box, Button, Container, Flex, Heading, HStack, Icon, Input, Stack, Text, VStack} from "@chakra-ui/react";
import Map from "../../components/Map/Map";
import HorizontalLineBox from "../../components/Boxes/HorizontalLineBox";
import {AddIcon, ArrowBackIcon, SmallAddIcon} from "@chakra-ui/icons";
import {FaUser} from "react-icons/fa"
import CommentsList from "../../components/PoiDetails/CommentsList";


export default function PoiDetails(props) {

    const {id} = useParams();
    const [poiData, setPoiData] = useState([]);
    const [mapCenter, setMapCenter] = React.useState(initialMap());
    const [reloadMap, setReloadMap] = React.useState(false);
    const [centerMarkerFlag, setCenterMarkerFlag] = React.useState(true);

    const navigate = useNavigate();
    const {state} = useLocation();
    const {beforeSite} = state || {};
    const [loading, setLoading] = useState(true);


    function initialMap() {
        return [52.22983, 21.01173]
    }

    const com = [
        {
            name: "test",
            author: "Adam"
        },
        {
            name: "wow",
            author: "Kacper"
        },
        {
            name: "hehe",
            author: "Oskar"
        }
    ]


    function fetchData() {
        var data = {
            name: "testowa",
            description: "opis punktu asdasdsadasdopis punktu asdasdsadasdopis punktu asdasdsadasdopis",
            author: "bartek",
            likesNumber: 34
        }
        setPoiData(data);
        setLoading(false);
        return poiData;
    }

    function handleBack() {
        let to = "";
        if(!beforeSite){
            to="/"
        } else{
            to = beforeSite;
        }
        navigate(to);
    }

    const mapRef = useRef()

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <React.Fragment>
            {loading ? (
                <React.Fragment>
                    <Button isLoading={true}/>
                </React.Fragment>
            ) : (

                <Flex mt={"60px"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                    <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"}
                          width={{base: '90vw', md: '800px'}} position={"relative"}>
                        <Button alignSelf={"flex-start"}
                                position={"absolute"}
                                top={"-35px"}
                                variant={"outline"}
                                onClick={() => handleBack()}>
                            <ArrowBackIcon/>
                        </Button>
                        <VStack mb={"5"} alignText={"center"}>
                            <HStack>
                                <Heading>{poiData.name}</Heading>
                                <Text size={"sm"} color={"gray.500"}>#{id}</Text>
                            </HStack>
                            <HStack color={"gray.400"}>
                                <Icon as={FaUser}></Icon>
                                <Text mt={'3'} >{poiData.author}</Text>
                            </HStack>

                        </VStack>
                        {
                            reloadMap ? <Box className={'map-container'}/> :
                                <Map ref={mapRef} height={'400px'} diplayMarkers={true} mapCenter={mapCenter}
                                     diplayCenterMarker={centerMarkerFlag} zoom={17} draggable={false}/>
                        }
                        <Stack mt={"20px"} width={"100%"}>
                            <Text color={"gray.300"}>Description:</Text>
                            <Box width={"100%"} bg={"gray.800"} border={"1px"}
                                 borderColor={"gray.600"} rounded={'lg'}>
                                <Text pl={3} pt={2} pb={2}>
                                    {poiData.description}
                                </Text>
                            </Box>
                        </Stack>

                        <HorizontalLineBox width={"100%"} mt={"50px"} mb={"20px"}/>

                        <Stack width={"100%"} mb={"50px"}>
                            <HStack mb={"10px"}>
                                <Input placeholder={"share your thoughts!"}/>
                                <Button gap={"5px"}>
                                    <SmallAddIcon/>
                                    <Text display={{base: "none", md: "block"}}>Comment</Text>
                                </Button>
                            </HStack>
                            <Stack mt={"10px"}>
                                <Text color={"gray.300"}>Comments:</Text>
                                <CommentsList comments={com}/>
                            </Stack>
                        </Stack>


                    </Flex>
                </Flex>
            )}

        </React.Fragment>
    );

}