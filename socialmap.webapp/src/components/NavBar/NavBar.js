import React from "react";
import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    Button,
    useDisclosure,
    useColorModeValue,
    Link
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import mapIcon from "../../icons/map-icon.png";
//import "./NavBar.css";

import Logo from "./Logo";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    const linkColor = useColorModeValue('gray.200', 'gray.200');
    const linkHoverColor = useColorModeValue('blue.300', 'blue.300');
    const bgColor = useColorModeValue('gray.700', 'gray.700');

    const start_links = ["About", "Contact Us"]
    const start_buttons = ["Sign in", "Sign up"]

    const linkItems = start_links.map((name) =>
        <Link color={linkColor} 
        fontSize='lg'
        _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
        }}>{name}
        </Link>
    );

    const buttonItems = start_buttons.map((name) =>
        <Button
            color={linkColor}
            variant="outline"
            _hover={{ bg: linkHoverColor, borderColor: linkHoverColor, color: bgColor }}
        >
            {name}
        </Button>
    );


    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding={3}
            bg={bgColor}
        >
            <Logo />
            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <Button variant="outline" color={linkColor}>
                    <HamburgerIcon />
                </Button>
            </Box>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "flex" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 5, md: 0 }}
                paddingLeft={isOpen ? 0:5}
                spacing={5}
            >
                {linkItems}
            </Stack>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "flex" : "none", md: "block" }}
                width={{ base: "full", md: "auto" }}
                mt={{ base: 5, md: 0 }}
                
            >
                {buttonItems}
            </Stack>
        </Flex>
    );
}
