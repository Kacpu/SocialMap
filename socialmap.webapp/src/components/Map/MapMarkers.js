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

function GetMarkers(props) {
    const [markers, setMarkers] = useState([]);
    const [markersOSM, setMarkersOSM] = useState([]);
    const [openModal, setOpenModal] = useState(true);
    const toast = useToast()

    useEffect(async () => {
        setMarkers(initialLoad(props.poiName));
        let data = []
        if (props.poiName.trim().length > 4) {
            data = await searchOSM(props.poiName, 50, props.currentBounds)
            setMarkersOSM(data)
        } else if(props.poiName.trim().length < 5 && props.poiName.trim().length !== 0){
            getToastTooShort()
        }if(data.length === 0 && props.poiName.trim().length !== 0) {
            getToastNoResults()
        }
        setOpenModal(false)
    }, [props.poiName])

    function initialLoad(poiName) {
        setOpenModal(false)
        setOpenModal(true)
        setMarkersOSM([])
        setMarkers([])
        return POIMock.filter(x => x.Name.toLowerCase().includes(poiName.toLowerCase()));
    }

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
        return(
            <Modal isOpen={openModal}>
                <ModalOverlay />
                <ModalContent style={{width: "min-content", maxWidth: "min-content"}}>
                    <ModalHeader>Loading...</ModalHeader>
                    <ModalBody>
                        <div style={{marginLeft: 'auto', marginRight: 'auto', width: 'min-content', height: "min-content"}}>
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
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <div>
            {openModal ? getSpinner() : null}
            {markers.map(data => (
            <CustomMarker key={data.Id} data={data}/>
            ))}
            {markersOSM.length === 0 ? null : getOSMMarkers()}
        </div>
    );
}

export default GetMarkers;