import React, { useState } from 'react';
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

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    //Stan logowania
    const [isSigned, setIsSigned] = useState(false);

    const linkColor = useColorModeValue('gray.200', 'gray.200');
    const linkHoverColor = useColorModeValue('blue.300', 'blue.300');
    const bgColor = useColorModeValue('gray.700', 'gray.700');

    const start_links_names = ["About", "Contact Us"]
    const start_links_urls = ["about", "contact"]

    const signed_links_names = ["Add point", ...start_links_names]
    const signed_links_urls = ["addpoint", ...start_links_urls]

    const start_buttons = ["Sign in", "Sign up"]
    const signed_buttons = ["Logout"]

    
    //Prosty przełącznik
    function sign(){
        if(isSigned){
            setIsSigned(false);
        } else{
            setIsSigned(true);
        }
    }


    const linkItems = start_links_names.map((name,index) =>
        <Link color={linkColor}
            fontSize='lg'
            href={start_links_urls[index]}
            _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
            }}>{name}
        </Link>
    );

    const singedLinkItems = signed_links_names.map((name,index) =>
        <Link color={linkColor}
            fontSize='lg'
            href={signed_links_urls[index]}
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
            onClick={sign}
        >
            {name}
        </Button>
    );

    const signedButtonItems = signed_buttons.map((name, index) =>
    <Button
        color={linkColor}
        variant="outline"
        _hover={{ bg: linkHoverColor, borderColor: linkHoverColor, color: bgColor }}
        onClick={sign}
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
                paddingLeft={isOpen ? 0 : 5}
                spacing={5}
            >
                {isSigned ? singedLinkItems : linkItems}
            </Stack>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "flex" : "none", md: "block" }}
                width={{ base: "full", md: "auto" }}
                mt={{ base: 5, md: 0 }}
            >
                {isSigned ? signedButtonItems : buttonItems}
            </Stack>
        </Flex>
    );
}
