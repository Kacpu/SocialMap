import {Badge, Box, Button, Flex, HStack, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import React from "react";
import {ReactComponent as Like} from '../../icons/like-icon.svg'
import Map from "../Map/Map";
import ExpandButton from "../Buttons/ExpandButton";
import BasePoiBox from "./BasePoiBox";

export default function UserPoiBox(props) {
    let status;
    let changeStatusButtonName;
    let changeStatusButtonFunction;

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
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={1}>
            See comments
        </Button>,
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={2}>
            Share
        </Button>,
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={3}>
            {changeStatusButtonName}
        </Button>
    ];

    const rightButtons = [
        <Button variant={"outline"} borderColor={"yellow.300"} color={"yellow.300"} mr={3}
                _hover={{bg: "rgba(241,231,136,0.12)"}} fontSize={16} key={1}>
            Edit
        </Button>,
        <Button variant={"outline"} borderColor={"red.400"} color={"red.400"}
                _hover={{bg: "rgba(225,116,116,0.12)"}} fontSize={16} key={2}>
            Delete
        </Button>
    ];

    return (
        <BasePoiBox
            poiData={props.poiData}
            badges={badges}
            leftButtons={leftButtons}
            rightButtons={rightButtons}
        />
    );
}