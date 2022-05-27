import {Badge, Button, Text, useDisclosure} from "@chakra-ui/react";
import BasePoiBox from "./BasePoiBox";
import React, {useEffect} from "react";
import {rgbToHex} from "@mui/material";
import {BsFillPeopleFill} from "react-icons/bs";
import {Link as RouterLink} from "react-router-dom";

export default function InvitationBoiBox(props) {
    let badges = [
        <Badge key={0} colorScheme={"yellow"} mr={"2"}>
            Invitation
        </Badge>
    ];

    badges = badges.concat(props.poiData.categoryDTOs.map(category => (
        <Badge key={category.id + 1} colorScheme={"teal"} mr={"2"}>
            {category.name}
        </Badge>
    )));

    const centerFooter = <React.Fragment>
        <Text mr={2} color={"gray.300"} fontWeight={"semibold"}>
            Invited by:
        </Text>
        <BsFillPeopleFill/>
        <Text ml={1} color={"gray.200"} fontWeight={"semibold"}>
            {props.poiData.creatorName}
        </Text>
    </React.Fragment>;

    const leftButtons = [
        <Button ml={2} variant={"outline"} borderColor={"green.400"} color={"green.400"}
                _hover={{bg: "rgba(62,131,41,0.12)"}} fontSize={16} mr={3} key={1}>
            Accept
        </Button>,
        <Button variant={"outline"} borderColor={"red.400"} color={"red.400"}
                _hover={{bg: "rgba(225,116,116,0.12)"}} fontSize={16} key={2}>
            Reject
        </Button>
    ];

    const rightButtons = [
        <Button as={RouterLink} to={`/point/${props.poiData.id}`}
                variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={1}>
            Details
        </Button>
    ];

    return (
        <BasePoiBox
            poiData={props.poiData}
            badges={badges}
            leftButtons={leftButtons}
            rightButtons={rightButtons}
            centerFooter={centerFooter}
            mapButtonOnLeft={false}
        />
    );
}