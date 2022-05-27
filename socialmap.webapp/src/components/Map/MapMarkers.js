import React, {useState} from "react";
import {Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import './MapMarkers.js.css'
import {ReactComponent as Like} from '../../icons/like-icon.svg'
import {ReactComponent as BluePin} from '../../icons/Pin-blue.svg'
import {POIMock} from "../../mocks/POIMock";
import {Box, Button, Flex, GridItem, HStack, Icon, Link, Text} from "@chakra-ui/react";
import {EditIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import Grid from "antd/es/card/Grid";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {SiGooglestreetview} from "react-icons/si"
import {BiLike} from "react-icons/bi"
import {AiOutlineLike, AiFillLike} from "react-icons/ai"
import {FcLikePlaceholder, FcLike} from "react-icons/fc"
import AddButton from "../Buttons/AddButton";
import CustomMarker from "./CustomMarker";

const ReactDOMServer = require('react-dom/server');




function GetMarkers(poiName) {

    const [markers, setMarkers] = useState(initialLoad(poiName));

    function initialLoad(poiName){
        //fetch from API
        let data = POIMock.filter(x => x.Name.toLowerCase().includes(poiName.toLowerCase()));
        return data;

    }

    return (
        <div>
            {markers.map(data => (
            <CustomMarker data={data}/>
            ))}
        </div>
    );
}

export default GetMarkers;