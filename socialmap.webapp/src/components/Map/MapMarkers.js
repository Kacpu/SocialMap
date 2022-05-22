import React from "react";
import {Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import './MapMarkers.js.css'
import {ReactComponent as Like} from '../../icons/like-icon.svg'
import {ReactComponent as BluePin} from '../../icons/Pin-blue.svg'
import {POIMock} from "../../mocks/POIMock_old";
import {Box, Button, GridItem, HStack} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import Grid from "antd/es/card/Grid";

const ReactDOMServer = require('react-dom/server');
const iconPerson = new L.DivIcon({
    html: ReactDOMServer.renderToString(<BluePin className={"mapPin"}/>),
    iconSize: new L.Point(30, 30),
    iconAnchor: new L.Point(0, 30),
    className: "markerHolder"
});

function GetMarkers(poiName) {
    return (
        <div>
            {POIMock.filter(x => x.Name.toLowerCase().includes(poiName.toLowerCase())).map(data => (
                <Marker
                    key={data.Id}
                    position={[data.X, data.Y]}
                    icon={iconPerson}>
                    <Popup autoClose={false}>
                        <Box className={"popup-title"}>
                            {data.Name}
                        </Box>
                        {data.description}
                        <HStack spacing='24px'>
                            <Box w='50%' h='40px'>
                                <Button leftIcon={<EditIcon />} colorScheme='teal' variant='solid' size='sm' className={'editButton'}>
                                    Edit
                                </Button>
                            </Box>
                            <Box w='50%' h='40px'>
                                <HStack spacing='10px' className={'HStackLikes'}>
                                    <Box>
                                        {data.likes.length}
                                    </Box>
                                    <Box>
                                        <Like className={"popup-like-icon"}/>
                                    </Box>
                                </HStack>
                            </Box>
                        </HStack>
                    </Popup>
                </Marker>
            ))}
        </div>
    );
}

export default GetMarkers;