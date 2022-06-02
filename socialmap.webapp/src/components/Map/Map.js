import React, {forwardRef, useImperativeHandle, useMemo, useRef} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import './Map.js.css'
import MapMarkers from "./MapMarkers";
import {
    Box,
    Button,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Text
} from "@chakra-ui/react";
import L from "leaflet";
import {ReactComponent as RedPin} from "../../icons/Pin-red.svg";
import {ArrowForwardIcon, CloseIcon} from "@chakra-ui/icons";
import {FiMapPin} from "react-icons/fi";

const Map = forwardRef((props, _ref) => {
    const [value, setValue] = React.useState('')
    const [searchedPhrase, setSearchedPhrase] = React.useState('')
    const [mapBounds, setMapBounds] = React.useState([[52.368, 21.271], [52.098, 20.852]])
    const [centerMarkerPosition, setCenterMarkerPosition] = React.useState(new L.LatLng(props.mapCenter[0], props.mapCenter[1]))
    const [displayClearButton, setDisplayClearButton] = React.useState(false)
    const [currentBounds, setCurrentBounds] = React.useState(mapBounds)

    const handleChange = (event) => {
        setValue(event.target.value)
        if (event.target.value.trim().length === 0) {
            setDisplayClearButton(false);
            setSearchedPhrase('')
        } else
            setDisplayClearButton(true)
    }

    const handleButtonPress = (event) => {
        if (event.code === "Enter") {
            handleClick();
        }
    }

    const handleClick = () => {
        setSearchedPhrase(value)
    }

    const handleClearClick = () => {
        setValue('')
        setDisplayClearButton(false)
        setSearchedPhrase('')
    }
    const ReactDOMServer = require('react-dom/server');
    const centerIcon = new L.DivIcon({
        html: ReactDOMServer.renderToString(<RedPin className={"mapPin"}/>),
        iconSize: new L.Point(40, 40),
        iconAnchor: new L.Point(0, 40),

        className: " markerHolder centerMarker",
    });
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setCenterMarkerPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )
    const centerMarker = () => {
        return (
            <Marker position={props.mapCenter} icon={centerIcon} draggable={props.draggable} ref={markerRef}
                    eventHandlers={eventHandlers}>
                <Popup autoClose={false}>
                    <HStack>
                        <Text fontSize={"lg"}>Current</Text>
                        <Text fontSize={"lg"} color={"red.500"}>point</Text>
                    </HStack>
                </Popup>
            </Marker>
        );
    }
    const getInput = () => (
        <InputGroup className={"input-container"} minWidth={"235px"} width={"25%"} borderStyle={"solid"} borderColor={"#1A202C"}>
            <InputLeftElement
                pointerEvents='none'
                children={<Icon color={"black"} as={FiMapPin}/>}
            />
            <Input
                variant='outline'
                textColor={"black"}
                placeholder='Point name or category'
                _placeholder={{opacity: 1, color: 'gray.500'}}
                value={value}
                backgroundColor={"white"}
                onKeyPress={handleButtonPress}
                onChange={handleChange}
            />
            <InputRightElement style={{width: "auto", height: "100%", marginRight: "4px"}}>
                <HStack spacing='0px'>
                    {displayClearButton ? clearButton() : null}
                    <Button variant={'ghost'} color={'blue.300'} onClick={handleClick}>
                        <ArrowForwardIcon w={6} h={6}/>
                    </Button>
                </HStack>
            </InputRightElement>
        </InputGroup>
    );
    const clearButton = () => (
        <Button variant={'ghost'} color={'blue.300'} onClick={handleClearClick}>
            <CloseIcon/>
        </Button>
    );
    useImperativeHandle(_ref, () => ({
        getCentralMarkerPosition: () => {
            return centerMarkerPosition;
        }
    }))

    function MapMoved() {
        const map = useMapEvents({
            moveend() {
                setCurrentBounds([[map.getBounds()._northEast.lat, map.getBounds()._northEast.lng], [map.getBounds()._southWest.lat, map.getBounds()._southWest.lng]])
            }
        })
        return null
    }
    return (
        <Box className={"map-container"}>
            {props.showSearch ? getInput() : null}
            <MapContainer className={"leaflet-container"}
                          center={props.mapCenter}
                          zoom={props.zoom}
                          minZoom={12}
                          maxBoundsViscosity={0.8}
                          maxBounds={mapBounds}
                          scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapMoved/>
                <MapMarkers searchedPhrase={searchedPhrase} currentBounds={currentBounds}/>
                {props.diplayCenterMarker ? centerMarker() : null}
            </MapContainer>
        </Box>
    );
});
export default React.memo(Map);