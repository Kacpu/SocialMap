import React, {useState} from "react";
import {MapContainer, TileLayer, Marker, Popup, useMapEvents} from 'react-leaflet';
import './Map.js.css'
import MapMarkers from "./MapMarkers";
import {ReactComponent as Pin} from '../../icons/pin-icon.svg'
import {ReactComponent as Arrow} from '../../icons/arrow-right.svg'
import leaflet from 'leaflet'
import {InputGroup, InputLeftElement, Input, InputRightElement, Button, Box} from "@chakra-ui/react";

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click(event) {
            new leaflet.marker(event.latlng).addTo(map);
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
function Map(props) {
    const [value, setValue] = React.useState('')
    const [name, setName] = React.useState('')
    const handleChange = (event) => {
        setValue(event.target.value)
    }
    const handleClick = () => {
        setName(value)
    }
    return (
        <Box className={"map-container"}>
            <InputGroup className={"input-container"} minWidth={"300px"} width={"25%"} borderStyle={"solid"} borderColor={"#1A202C"}>
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
            <MapContainer  className={"leaflet-container"} center={[ 52.22983, 21.01173 ]} zoom={12} scrollWheelZoom={true} height={'200px'} style={{height: props.heigh ? '100%' : props.height}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {MapMarkers(name)}
                {/*<LocationMarker />*/}
            </MapContainer>
        </Box>
        
    );
}
export default Map;