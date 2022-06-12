import React, {useEffect, useState} from "react";
import './MapMarkers.js.css'
import {POIMock} from "../../mocks/POIMock";
import CustomMarker from "./CustomMarker";
import searchOSM from "../../tools/SearchOSM"
import OSMMarker from "./OSMMarker";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner, toast, useToast
} from "@chakra-ui/react";
import {getPois, getPoisForUser} from "../../socialMapApi/poiRequests";
import {isUserAuthenticated} from "../../auth/authenticationFunctions";

function GetMarkers(props) {
    const [appMarkers, setAppMarkers] = useState([]);
    const [filteredAppMarkers, setFilteredAppMarkers] = useState([]);
    const [markersOSM, setMarkersOSM] = useState([]);
    const [openLoadingModal, setOpenLoadingModal] = useState(true);
    const toast = useToast()
    const ac = new AbortController();

    useEffect(() => {
        (async () => {
            // console.log("start hook")
            await loadAppMarkers();
        })();
        return () => {
            ac.abort("from map");
        };
    }, []);

    useEffect(() => {
        (async () => {
            // console.log("second hook")
            const filteredLength = filterAppMarkers(props.searchedPhrase);
            const osmLength = await loadOsmMarkers(props.searchedPhrase);
            if (props.searchedPhrase.length > 0 && filteredLength === 0 && osmLength === 0) {
                getToastNoResults()
            }
        })();
        return () => {
            ac.abort("from map");
        };
    }, [props.searchedPhrase])

    const loadAppMarkers = async () => {
        setOpenLoadingModal(true)
        let res;
        if (isUserAuthenticated()) {
            res = await getPoisForUser(ac.signal, true, true, false, true).catch(console.error);
        } else {
            res = await getPois(ac.signal).catch(console.error);
        }
        if (res?.ok) {
            const data = res.data.filter(x => x.id !== props.centerPoi?.id);
            setAppMarkers(data);
            setFilteredAppMarkers(data);
        }
        if (res) {
            setOpenLoadingModal(false)
        }
    }

    const filterAppMarkers = (searchedPhrase) => {
        if(props.searchedPhrase.trim().length > 0){
            const filtered = appMarkers.filter(x => x.name.toLowerCase().includes(searchedPhrase.toLowerCase())
                || x.categories.some(c => c.name.toLowerCase().includes(searchedPhrase.toLowerCase())));
            setFilteredAppMarkers(filtered);
            return filtered.length;
        }
        else if(appMarkers?.length > 0){
            setFilteredAppMarkers(appMarkers);
            return appMarkers.length;
        }
    }

    const loadOsmMarkers = async (searchedPhrase) => {
        let data = []
        if (searchedPhrase.trim().length >= 3) {
            setOpenLoadingModal(true)
            data = await searchOSM(searchedPhrase, 50, props.currentBounds, ac.signal)
            setMarkersOSM(data)
            setOpenLoadingModal(false)
            return data.length;
        } else {
            setMarkersOSM([])
            return 0;
        }
    }

    // function initialLoad(poiName) {
    //     setOpenLoadingModal(false)
    //     setOpenLoadingModal(true)
    //     setMarkersOSM([])
    //     setAppMarkers([])
    //     return POIMock.filter(x => x.Name.toLowerCase().includes(poiName.toLowerCase()));
    // }

    const getOSMMarkers = () => {
        return (
            <div>
                {markersOSM.map(data => (
                    <OSMMarker key={data.place_id} data={data}/>
                ))}
            </div>
        );
    }

    const getSpinner = () => {
        return (
            <Modal isOpen={openLoadingModal}>
                <ModalOverlay/>
                <ModalContent style={{width: "min-content", maxWidth: "min-content"}}>
                    <ModalHeader>Loading...</ModalHeader>
                    <ModalBody>
                        <div style={{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            width: 'min-content',
                            height: "min-content"
                        }}>
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='blue.500'
                                size='xl'
                            />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        );
    }

    const getToastTooShort = () => {
        toast({
            title: 'Search query too short',
            description: "Your search query is too short to browse OSM data.",
            status: 'warning',
            duration: 3000,
            isClosable: true,
        })
    }

    const getToastNoResults = () => {
        toast({
            title: 'No results',
            description: "Your search query returned no results.",
            status: 'error',
            duration: 2000,
            isClosable: true,
        })
    }

    return (
        <div>
            {openLoadingModal ? getSpinner() : null}
            {filteredAppMarkers.map(poi => (
                <CustomMarker key={poi.id} data={poi}/>
            ))}
            {markersOSM.length === 0 ? null : getOSMMarkers()}
        </div>
    );
}

export default GetMarkers;