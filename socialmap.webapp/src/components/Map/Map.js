import React, {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap} from 'react-leaflet';
import './Map.js.css'
import MapMarkers from "./MapMarkers";
import {ReactComponent as Pin} from '../../icons/pin-icon.svg'
import {ReactComponent as Arrow} from '../../icons/arrow-right.svg'
import leaflet from 'leaflet'
import {InputGroup, InputLeftElement, Input, InputRightElement, Button, Box} from "@chakra-ui/react";
import {POIMock} from "../../mocks/POIMock";
import {ReactComponent as Like} from "../../icons/like-icon.svg";

function LocationMarker() {
    const map = useMapEvents({
        moveend(event) {
            console.log(map.getCenter())
            return(map.getCenter())
        }
    })
    return null;
}
function Map(props) {
    const [value, setValue] = React.useState('')
    const [name, setName] = React.useState('')
    const [position, setPosition] = React.useState('')
    const [display, setDisplay] = React.useState(false)
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleClick = () => {
        setName(value)
    }
    const getTempPoints = (points) => {
        try {
            if(points.features.length > 0) {
                return(
                    points.features.map(data => (
                        <Marker key={1} position={[data.geometry.coordinates[1], data.geometry.coordinates[0]]}/>
                    ))
                );
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }
    return (
        <Box className={"map-container"}>
            <InputGroup className={"input-container"} minWidth={"235px"} width={"25%"} borderStyle={"solid"} borderColor={"#1A202C"}>
                <InputLeftElement
                    pointerEvents='none'
                    children={<Pin className={"pin-icon"} />}
                />
                <Input
                    variant='outline'
                    textColor={"black"}
                    placeholder='Point name'
                    _placeholder={{ opacity: 1, color: 'gray.500' }}
                    value={value}
                    backgroundColor={"white"}
                    onChange={handleChange}
                />
                <InputRightElement marginRight={"7px"}>
                    <Button height={"75%"} size='sm' onClick={handleClick}>
                        <Arrow className={"pin-icon"}/>
                    </Button>
                </InputRightElement>
            </InputGroup>
            <MapContainer className={"leaflet-container"} center={[ 52.22983, 21.01173 ]} zoom={12} maxBounds={[
                [52.31222, 20.81361],
                [52.10302, 21.26336]
            ]} scrollWheelZoom={true} height={'200px'} style={{height: props.height ? '100%' : props.height}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {getTempPoints(props.arr)}
                {MapMarkers(name)}
                <LocationMarker/>
            </MapContainer>
        </Box>
        
    );
}
export default Map;