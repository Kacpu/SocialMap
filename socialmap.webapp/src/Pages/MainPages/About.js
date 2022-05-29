import {Box, Flex, Heading, HStack, Image, Text} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";

import socialMap from "../../assets/socialmap.png";
import explore from "../../assets/explore.png";
import point from "../../assets/point.png";
import sharing from "../../assets/sharing.png";
import socialMedia from "../../assets/social-media.png";
import lock from "../../assets/lock.png";

import SmallBoxes from "../../components/AboutPage/SmallBoxes";
import AcceptButton from "../../components/Buttons/AcceptButton";
import AddButton from "../../components/Buttons/AddButton";

export default function About() {

    return (
        <Box mt={"10"} mb={"10"}>
            <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                <Box>
                    <Heading fontWeight={"light"} textAlign={"center"}>
                        What if maps were social?
                    </Heading>
                </Box>
                <Box>
                    <Image boxSize={"150px"} src={socialMap} alt={"social map"}/>
                </Box>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"} mt={"5"}>
                <Box>
                    <Heading as={"h4"} fontWeight={"light"} size={"lg"}>
                        you could:
                    </Heading>
                </Box>
                <Flex gap={"50px"} mt={"80px"} flexDirection={{base: "column", md: "row"}}>
                    <SmallBoxes src={explore} text={"Explore the world"}/>
                    <SmallBoxes src={point} text={"Add amazing points"}/>
                    <SmallBoxes src={sharing} text={"Share your favourites places"}/>
                    <SmallBoxes src ={socialMedia} text={"Have social experience"}/>
                    <SmallBoxes src={lock} text={"Keep personal places in secret"}/>
                </Flex>

                <Heading mt={"50px"}>We've got it all!</Heading>
                <AddButton mt={"20px"} as={RouterLink} to={"/"}>Explore SocialMap world 🌍 </AddButton>
                <Text mt={"20px"} align={'center'} fontSize={"small"}>Icons by <a href={"https://www.flaticon.com"}>Flaticon</a></Text>
            </Flex>

        </Box>
    )
}