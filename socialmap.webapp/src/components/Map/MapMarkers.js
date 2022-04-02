import React from "react";
import {Marker, Popup} from 'react-leaflet';
import './MapMarkers.js.css'
import {ReactComponent as Like} from '../../icons/like-icon.svg'
import {POIMock} from "../../mocks/POIMock";
import {Box} from "@chakra-ui/react";

function GetMarkers(name) {
    return (
        <div>
            {POIMock.filter(a => a.Name.toLowerCase().includes(name.toLowerCase())).map(data => (
                <Marker key={data.Id} position={[data.X, data.Y]}>
                    <Popup autoClose={false}>
                        <Box className={"popup-title"}>
                            {data.Name}
                        </Box>
                        {data.description}
                        <Box className={"popup-likes-container"}>
                            <Box className={"popup-like"}>
                                {data.likes.length}
                            </Box>
                            <Like className={"popup-like-icon"}/>
                        </Box>
                    </Popup>
                </Marker>
            ))}
        </div>
    );
}
export default GetMarkers;