import React, {useState} from "react"
import {Marker, Popup} from "react-leaflet";
import {Box, Button, Flex, HStack, Icon, Link, Text} from "@chakra-ui/react";
import {SiGooglestreetview} from "react-icons/si";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import {ReactComponent as GreenPin} from "../../icons/Pin-green.svg";
import filterOSMName from "../../tools/FilterOSMName";
import {AddIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import AddButton from "../Buttons/AddButton";
import {useNavigate} from "react-router-dom";

export default function OSMMarker(props) {
    const navigate = useNavigate();

    const markerIconGreen = new L.DivIcon({
        html: ReactDOMServer.renderToString(<GreenPin className={"mapPin"}/>),
        iconSize: new L.Point(30, 30),
        iconAnchor: new L.Point(0, 30),
        className: "markerHolder"
    });

    const onConnect = () => {
        navigate("/addpoint", {state: {beforeSite: "/", startLocation: {x: props.data.lat, y: props.data.lon}}})
    }

    return (
        <React.Fragment>
            <Marker
                key={props.data.place_id}
                position={[props.data.lat, props.data.lon]}
                icon={markerIconGreen}>
                <Popup autoClose={false} className={"popup-marker"}>
                    <Box className={"google-link"} mb={"5px"}>
                        <Link
                            href={'https://www.google.com/maps/dir//' + props.data.lat + ',' + props.data.lon + '/@' + props.data.lat + ',' + props.data.lon + ',15z'}
                            isExternal>
                            <Button w={5} h={5} variant={"ghost"} color={"green.500"} size='sm'>
                                <Icon w={5} h={5} as={SiGooglestreetview}></Icon>
                            </Button>
                        </Link>
                    </Box>
                    <Box className={"popup-content"} >
                        <Box className={"popup-title"}>
                            {filterOSMName(props.data)[0]}
                        </Box>
                        <Box className={"popup-desc"}>
                            {filterOSMName(props.data).splice(1, filterOSMName(props.data).length).join(' ')}
                        </Box>
                        <AddButton onClick={onConnect}
                                leftIcon={<AddIcon/>}
                                size='sm' className={'editButton'} mt={5}>
                            Connect
                        </AddButton>
                    </Box>
                </Popup>
            </Marker>
        </React.Fragment>
    )
}