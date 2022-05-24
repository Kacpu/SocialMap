import {Badge, Button, Text} from "@chakra-ui/react";
import BasePoiBox from "./BasePoiBox";
import React from "react";

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

    const footer =
        <Text textAlign={"center"} mb={5} color={"gray.300"} fontWeight={"semibold"}>
            Shared by: {props.poiData.creatorName}
        </Text>;

    const leftButtons = [
        <Button variant={'ghost'} size='sm' color={"teal.300"} fontSize={16} key={1}>
            See comments
        </Button>,
    ];

    return (
        <BasePoiBox
            poiData={props.poiData}
            badges={badges}
            leftButtons={leftButtons}
            footer={footer}
        />
    );
}