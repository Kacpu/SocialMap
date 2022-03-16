import React from "react"
import {Flex} from "@chakra-ui/react";
import mapIcon from "../../icons/map-icon.png";

export default function Logo(props) {
    return (
        <Flex align="center" mr={4}>
            <img src={mapIcon} />
        </Flex>
    )
}