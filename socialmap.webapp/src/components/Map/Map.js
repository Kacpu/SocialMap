import React, {forwardRef, useImperativeHandle, useMemo, useRef} from "react";
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import './Map.js.css'
import MapMarkers from "./MapMarkers";
import {ReactComponent as Pin} from '../../icons/pin-icon.svg'
import {ReactComponent as Arrow} from '../../icons/arrow-right.svg'
import {Box, Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Text} from "@chakra-ui/react";
import L from "leaflet";
import {ReactComponent as RedPin} from "../../icons/Pin-red.svg";
import {ArrowForwardIcon, CloseIcon} from "@chakra-ui/icons";

const Map = forwardRef((props, _ref) => {
    const [value, setValue] = React.useState('')
    const [poiName, setPoiName] = React.useState('')
    const [mapBounds, setMapBounds] = React.useState([[52.368, 21.271], [52.098, 20.852]])
    const [centerMarkerPosition, setCenterMarkerPosition] = React.useState(new L.LatLng(props.mapCenter[0], props.mapCenter[1]))
    const [displayClearButton, setDisplayClearButton] = React.useState(false)
    const handleChange = (event) => {
        setValue(event.target.value)
        if (event.target.value.trim().length === 0)
            setDisplayClearButton(false)
        else
            setDisplayClearButton(true)
    }
    const handleClick = () => {
        setPoiName(value)
    }
    const handleClearClick = () => {
        setValue('')
        setDisplayClearButton(false)
        setPoiName('')
    }
    const ReactDOMServer = require('react-dom/server');
    const centerIcon = new L.DivIcon({
        html: ReactDOMServer.renderToString(<RedPin className={"mapPin"}/>),
        iconSize: new L.Point(40, 40),
        iconAnchor: new L.Point(0, 40),
        className: "markerHolder"
    });
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setCenterMarkerPosition(marker.getLatLng())
                    console.log(marker.getLatLng())
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
        <InputGroup className={"input-container"} minWidth={"235px"} width={"25%"} borderStyle={"solid"}
                    borderColor={"#1A202C"}>
            <InputLeftElement
                pointerEvents='none'
                children={<Pin className={"pin-icon"}/>}
            />
            <Input
                variant='outline'
                textColor={"black"}
                placeholder='Point name'
                _placeholder={{opacity: 1, color: 'gray.500'}}
                value={value}
                backgroundColor={"white"}
                onChange={handleChange}
            />
            <InputRightElement style={{width: "auto", height: "100%", marginRight: "4px"}}>
                <HStack spacing='0px'>
                    {displayClearButton ? clearButton() : null}
                    <Button  variant={'ghost'} color={'blue.300'} onClick={handleClick}>
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
                {/*<Rectangle*/}
                {/*    bounds={mapBounds}*/}
                {/*    color={"#ff7800"}*/}
                {/*/>*/}
                {MapMarkers(poiName)}
                {props.diplayCenterMarker ? centerMarker() : null}
            </MapContainer>
        </Box>
    );
});
export default React.memo(Map);