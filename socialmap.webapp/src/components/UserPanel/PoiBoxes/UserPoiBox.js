import {Badge, Box, Button, Flex, HStack, Icon, Text, useColorModeValue, useDisclosure} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import React from "react";
import {ReactComponent as Like} from '../../../icons/like-icon.svg'
import Map from "../../Map/Map";
import ExpandButton from "../../Buttons/ExpandButton";
import BasePoiBox from "./BasePoiBox";
import SharePoiModal from "../../Modals/SharePoiModal";
import useOpenStatus from "../../../hooks/useOpenStatus";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import AddButton from "../../Buttons/AddButton";

export default function UserPoiBox(props) {
    const navigate = useNavigate();
    let status;
    let changeStatusButtonName;
    let changeStatusButtonFunction;

    const { isOpen: isOpenShareModal, onOpen: onOpenShareModal, onClose: onCloseShareModal } = useOpenStatus();


    // useEffect(() => {
    //     console.log("render poi box")
    //     return () => console.log("un user poi box")
    // })

    const handleShare = () => {
        onOpenShareModal();
    }

    const onEdit = () => {
        navigate("/editpoint", {state: {pointId: props.poiData.id}})
    }

    if (props.poiData.isAccepted === true && props.poiData.isGlobal === true) {
        status = "public";
        changeStatusButtonName = "Make private";
    } else if (props.poiData.isAccepted === false && props.poiData.isGlobal === true) {
        status = "waiting for acceptance";
        changeStatusButtonName = "Make private";
    } else {
        status = "private";
        changeStatusButtonName = "Make public";
    }

    let badges = [
        <Badge key={0} colorScheme={"yellow"} mr={"2"}>
            {status}
        </Badge>
    ];

    badges = badges.concat(props.poiData.categoryDTOs.map(category => (
        <Badge key={category.id + 1} colorScheme={"teal"} mr={"2"}>
            {category.name}
        </Badge>
    )));

    const leftButtons = [
        <Button as={RouterLink} to={`/point/${props.poiData.id}`}
                   variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={1}>
            Details
        </Button>,
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={2} onClick={handleShare}>
            Share
        </Button>,
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={3}>
            {changeStatusButtonName}
        </Button>
    ];

    const rightButtons = [
        <Button variant={"outline"} borderColor={"yellow.300"} color={"yellow.300"} mr={3}
                _hover={{bg: "rgba(241,231,136,0.12)"}} fontSize={16} key={1} onClick={onEdit}>
            Edit
        </Button>,
        <Button variant={"outline"} borderColor={"red.400"} color={"red.400"}
                _hover={{bg: "rgba(225,116,116,0.12)"}} fontSize={16} key={2}>
            Delete
        </Button>
    ];

    return (
        <React.Fragment>
            {isOpenShareModal &&
                <SharePoiModal
                    isOpen={isOpenShareModal}
                    onClose={onCloseShareModal}
                    poiData={props.poiData}
                />
            }
            <BasePoiBox
                poiData={props.poiData}
                badges={badges}
                leftButtons={leftButtons}
                rightButtons={rightButtons}
            />
        </React.Fragment>
    );
}