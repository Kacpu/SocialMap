
import React, {useState} from "react"
import {Marker, Popup} from "react-leaflet";
import {Box, Button, Flex, HStack, Icon, Link, Text} from "@chakra-ui/react";
import {SiGooglestreetview} from "react-icons/si";
import AddButton from "../Buttons/AddButton";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import {ReactComponent as BluePin} from "../../icons/Pin-blue.svg";

const iconPerson = new L.DivIcon({
    html: ReactDOMServer.renderToString(<BluePin className={"mapPin"}/>),
    iconSize: new L.Point(30, 30),
    iconAnchor: new L.Point(0, 30),
    className: "markerHolder"
});

export default function CustomMarker(props){

    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState();
    const [likesCount, setLikesCount] = useState(props.data.likes.length);

    function toggleLike(){
        if(isLiked){
            setLikesCount(likesCount-1);
        }
        else{
            setLikesCount(likesCount+1);
        }

        setIsLiked(!isLiked);
    }

    function handleChangePage(){
        navigate(`point/${props.data.Id}`, {state: {beforeSite : "/"}});
    }

    return(
        <React.Fragment>
            <Marker
                key={props.data.Id}
                position={[props.data.X, props.data.Y]}
                icon={iconPerson}>
                <Popup autoClose={false} className={"popup-marker"}>
                    <Box className={"google-link"} mb={"-10px"}>
                        <Link href={'https://www.google.com/maps/dir//' + props.data.X + ',' + props.data.Y + '/@' + props.data.X + ',' + props.data.Y + ',15z'} isExternal>
                            <Button w={5} h={5} variant={"ghost"} color={"green.500"} size='sm'>
                                <Icon w={5} h={5} as={SiGooglestreetview}></Icon>
                            </Button>
                        </Link>
                    </Box>
                    <Box className={"popup-title"} mb={"2"}>
                        {props.data.Name}
                    </Box>
                    <Box mb={"5"} className={"popup-description"}>
                        {props.data.description}
                    </Box >
                    <HStack spacing='24px'>
                        <Box w='50%' h='40px'>
                            <AddButton onClick={handleChangePage}
                                       leftIcon={<ExternalLinkIcon />}
                                       size='sm' className={'editButton'} >
                                Details
                            </AddButton>
                        </Box>
                        <Box w='50%' h='40px'>
                            <HStack spacing='7px' className={'HStackLikes'}>
                                <Flex justifyContent={"center"} pt={"10px"} alignItems={"center"} height={"100%"}>
                                    <Text>{likesCount}</Text>
                                </Flex>
                                <Box>
                                    <Button h={7} w={7} py={0} px={0} onClick={() => toggleLike()}>
                                        <Icon h={7} w={7}
                                              as={isLiked ? AiFillLike : AiOutlineLike}
                                        ></Icon>
                                    </Button>
                                </Box>
                            </HStack>
                        </Box>
                    </HStack>
                </Popup>
            </Marker>
        </React.Fragment>
    )
}