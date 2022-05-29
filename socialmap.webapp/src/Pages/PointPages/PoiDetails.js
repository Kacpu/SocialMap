import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react"
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Spinner,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import Map from "../../components/Map/Map";
import HorizontalLineBox from "../../components/Boxes/HorizontalLineBox";
import {ArrowBackIcon} from "@chakra-ui/icons";
import {FaUser} from "react-icons/fa"
import {getPoi} from "../../socialMapApi/poiRequests";
import CommentsPanel from "../../components/PoiDetails/CommentsPanel";


export default function PoiDetails(props) {
    const {id} = useParams();
    const [poiData, setPoiData] = useState({});
    const [mapCenter, setMapCenter] = useState(initialMap());
    const [reloadMap, setReloadMap] = useState(false);
    const [centerMarkerFlag, setCenterMarkerFlag] = useState(true);

    const navigate = useNavigate();
    const {state} = useLocation();
    const {beforeSite} = state || {};
    const [loading, setLoading] = useState(true);
    const ac = new AbortController();

    function initialMap() {
        return [52.22983, 21.01173]
    }

    // const com = [
    //     {
    //         name: "test",
    //         author: "Adam"
    //     },
    //     {
    //         name: "wow",
    //         author: "Kacper"
    //     },
    //     {
    //         name: "hehe",
    //         author: "Oskar"
    //     }
    // ]

    useEffect(() => {
        (async () => {
            await fetchData()
        })();
        return () => {
            ac.abort("abort from poi details")
        }
    }, [])

    async function fetchData() {
        // var data = {
        //     name: "testowa",
        //     description: "opis punktu asdasdsadasdopis punktu asdasdsadasdopis punktu asdasdsadasdopis",
        //     author: "bartek",
        //     likesNumber: 34
        // }
        const res = await getPoi(id, ac.signal);
        if (res?.ok) {
            setPoiData(res.data);
            setMapCenter([res.data.x, res.data.y])
            setLoading(false);
        }
    }

    function handleBack() {
        let to = "";
        if (!beforeSite) {
            to = "/"
        } else {
            to = beforeSite;
        }
        navigate(to);
    }

    const mapRef = useRef()

    return (
        <React.Fragment>
            {loading ? (
                <Flex height={"100%"} alignItems={"center"} justifyContent={"center"}>
                    <Spinner size={"xl"}/>
                </Flex>
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
                        <VStack mb={"5"} align={"center"} width={"100%"}>
                            <HStack>
                                <Heading>{poiData.name}</Heading>
                                <Text size={"sm"} color={"gray.500"}>#{id}</Text>
                            </HStack>
                            <HStack color={"gray.400"}>
                                <Icon as={FaUser}></Icon>
                                <Text mt={'3'}>{poiData.creatorName}</Text>
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
                                <Text px={3} pt={2} pb={2} textAlign={"justify"}>
                                    {poiData.description}
                                </Text>
                            </Box>
                        </Stack>

                        <HorizontalLineBox width={"100%"} mt={"50px"} mb={"20px"}/>

                        <CommentsPanel poiId={poiData.id}/>

                    </Flex>
                </Flex>
            )}

        </React.Fragment>
    );

}