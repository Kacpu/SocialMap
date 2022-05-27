import React from "react";
import {Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import './MapMarkers.js.css'
import {ReactComponent as Like} from '../../icons/like-icon.svg'
import {ReactComponent as BluePin} from '../../icons/Pin-blue.svg'
import {POIMock} from "../../mocks/POIMock";
import {Box, Button, GridItem, HStack, Link} from "@chakra-ui/react";
import {EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import Grid from "antd/es/card/Grid";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import AddButton from "../Buttons/AddButton";

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
                    <Popup autoClose={false} class={"popup-marker"} >
                        <Box className={"popup-title"} mb={"2"}>
                            {data.Name}
                        </Box>
                        <Box mb={"5"} className={"popup-description"}>
                            {data.description}
                        </Box >
                        <HStack spacing='24px'>
                            <Box w='50%' h='40px'>
                                <AddButton as={RouterLink} to={`point/${data.Id}`} leftIcon={<ExternalLinkIcon />}
                                           size='sm' className={'editButton'} >
                                    Details
                                </AddButton>
                            </Box>
                            <Box>
                                <Link href={'https://www.google.com/maps/dir//' + data.X + ',' + data.Y + '/@' + data.X + ',' + data.Y + ',15z'} isExternal>
                                    <Button colorScheme='teal' size='sm'>
                                        Navigate
                                    </Button>
                                </Link>
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