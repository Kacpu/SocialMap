import React, {useEffect, useState} from "react"
import {Marker, Popup} from "react-leaflet";
import {Box, Button, Flex, HStack, Icon, Link, Text, useToast} from "@chakra-ui/react";
import {SiGooglestreetview} from "react-icons/si";
import AddButton from "../Buttons/AddButton";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import {ReactComponent as BluePin} from "../../icons/Pin-blue.svg";
import {ReactComponent as DarkRedPin} from "../../icons/Pin-dark-red.svg";
import {ReactComponent as GreenPin} from "../../icons/Pin-green.svg";
import {addLike, deleteLike, getLike, getLikes} from "../../socialMapApi/likeRequests";
import {getPois, getPoisForUser} from "../../socialMapApi/poiRequests";
import useOpenStatus from "../../hooks/useOpenStatus";
import Userfront from "@userfront/react";
import {isUserAuthenticated} from "../../auth/authenticationFunctions";

export default function CustomMarker(props) {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [userLike, setUserLike] = useState({});
    const [likesCount, setLikesCount] = useState(props.data.likesNumber);
    const [isLikable, setIsLikable] = useState(false);
    const ac = new AbortController();
    //const [isAborted, setAborted] = useState(false)
    const toast = useToast()

    useEffect(() => {
        return () => {
            //setAborted(true)
            ac.abort("from marker");
        };
    }, []);

    const onOpen = async () => {
        if (isUserAuthenticated()) {
            await checkLike()
        }
    }

    const checkLike = async () => {
        if(props.data.creatorUuid === Userfront.user.userUuid ){
            return;
        }
        const res = await getLikes(ac.signal, props.data.id)
        if (res?.ok) {
            setIsLikable(true);
            if (res.data.length > 0) {
                setUserLike(res.data[0])
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        }
    }

    const toggleLike = async () => {
        if (isLiked) {
            setIsLikable(false);
            const res = await deleteLike(userLike.id, ac.signal);
            if(res?.ok){
                setIsLiked(false);
                setLikesCount(likesCount - 1);
                setUserLike({})
                setIsLikable(true);
            }
        } else {
            setIsLikable(false);
            const res = await addLike(ac.signal,{poiId: props.data.id});
            if(res?.ok){
                setIsLiked(true);
                setLikesCount(likesCount + 1);
                setUserLike(res.data);
                setIsLikable(true);
            }
        }
    }

    function shortenDescription(text){
        const maxLen = 80;
        if(text.length > maxLen){
            let newText = text.slice(0,maxLen) + "...";
            return newText;
        }

        return text;
    }

    function handleChangePage() {
        if(isUserAuthenticated()){
            navigate(`point/${props.data.id}`, {state: {beforeSite: "/"}});
        } else {
            noLogToast();
        }
    }

    const markerIconBlue = new L.DivIcon({
        html: ReactDOMServer.renderToString(<BluePin className={"mapPin"}/>),
        iconSize: new L.Point(30, 30),
        iconAnchor: new L.Point(0, 30),
        className: "markerHolder"
    });

    const markerIconDarkRed = new L.DivIcon({
        html: ReactDOMServer.renderToString(<DarkRedPin className={"mapPin"}/>),
        iconSize: new L.Point(30, 30),
        iconAnchor: new L.Point(0, 30),
        className: "markerHolder"
    });


    const markerIconGreen = new L.DivIcon({
        html: ReactDOMServer.renderToString(<GreenPin className={"mapPin"}/>),
        iconSize: new L.Point(30, 30),
        iconAnchor: new L.Point(0, 30),
        className: "markerHolder"
    });

    const noLogToast = () => {
        toast({
            title: 'You are not log in',
            description: "Please log in or create account to see more content.",
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <React.Fragment>
            <Marker
                eventHandlers={{
                    click: onOpen,
                }}
                key={props.data.id}
                position={[props.data.x, props.data.y]}
                icon={props.data.creatorUuid === Userfront?.user?.userUuid ? markerIconDarkRed : markerIconBlue}>
                <Popup autoClose={false} className={"popup-marker"}>
                    <Box className={"google-link"} mb={"5px"}>
                        <Link
                            href={'https://www.google.com/maps/dir//' + props.data.x + ',' + props.data.y + '/@' + props.data.x + ',' + props.data.y + ',15z'}
                            isExternal>
                            <Button w={5} h={5} variant={"ghost"} color={"green.500"} size='sm'>
                                <Icon w={5} h={5} as={SiGooglestreetview}></Icon>
                            </Button>
                        </Link>
                    </Box>
                    <Box className={"popup-content"}>
                        <Box className={"popup-title"}>
                            {props.data.name}
                        </Box>
                        <Box className={"popup-desc"}>
                            {shortenDescription(props.data.description)}
                        </Box>
                    </Box>
                    <HStack spacing='24px' align={"center"}>
                        <Box w='50%' h='40px'>
                            <AddButton onClick={handleChangePage}
                                       leftIcon={<ExternalLinkIcon/>}
                                       size='sm' className={'editButton'}>
                                Details
                            </AddButton>
                        </Box>
                        <Box w='50%' h='40px'>
                            <HStack spacing='7px' className={'HStackLikes'} alignItems={"center"}>
                                <Flex justifyContent={"center"} >
                                    <Text pt={2} fontSize={'16px'} fontWeight={"semibold"} color={"gray.600"}>
                                        {likesCount}
                                    </Text>
                                </Flex>
                                <Flex alignItems={"center"}>
                                    {isLikable
                                        ? <Button h={7} minW={7} py={0} px={0} onClick={toggleLike}>
                                            <Icon h={7} w={7}
                                                  as={isLiked ? AiFillLike : AiOutlineLike}
                                            ></Icon>
                                        </Button>
                                        : <Icon h={7} w={7}
                                                as={isLiked ? AiFillLike : AiOutlineLike}
                                        ></Icon>
                                    }
                                </Flex>
                            </HStack>
                        </Box>
                    </HStack>
                </Popup>
            </Marker>
        </React.Fragment>
    )
}