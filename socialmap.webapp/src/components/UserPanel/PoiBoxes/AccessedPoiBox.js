import {Badge, Button, Text} from "@chakra-ui/react";
import BasePoiBox from "./BasePoiBox";
import React from "react";
import {BsFillPeopleFill} from "react-icons/bs";
import {Link as RouterLink} from "react-router-dom";
import WrapText from "../../../Elems/WrapText";

export default function AccessedPoiBox(props) {
    let badges = [
        <Badge key={0} colorScheme={"yellow"} mr={"2"}>
            Accessed
        </Badge>
    ];

    badges = badges.concat(props.poiData.categoryDTOs.map(category => (
        <Badge key={category.id + 1} colorScheme={"teal"} mr={"2"}>
            {category.name}
        </Badge>
    )));

    const centerFooter = <React.Fragment>
        <Text mr={2} color={"gray.300"} fontWeight={"semibold"}>
            Shared by:
        </Text>
        <BsFillPeopleFill/>
        <WrapText ml={1} color={"gray.200"} fontWeight={"semibold"}>
            {props.poiData.creatorName}
        </WrapText>
    </React.Fragment>;

    const leftButtons = [
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
            centerFooter={centerFooter}
        />
    );
}