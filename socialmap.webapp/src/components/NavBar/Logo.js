import React from "react"
import { Flex, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import mapIcon from "../../icons/map-icon.png";

export default function Logo(props) {
    const color = useColorModeValue('blue.300', 'blue.300');
    return (
        <HStack align="center" mr={4}
            justify="space-between"
            spacing={2}
        >
            <a href="/">
                <img src={mapIcon} onDrag={false} />
            </a>
            {/* <a href="/" >
                <Text color={color}>Social</Text>
                <Text color={color}>Map</Text>
            </a> */}
        </HStack >
    )
}