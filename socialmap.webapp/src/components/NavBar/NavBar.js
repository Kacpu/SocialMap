import React, {useEffect, useState} from 'react';
import {Link as RouterLink, Outlet} from "react-router-dom";
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
import {HamburgerIcon} from "@chakra-ui/icons";
import mapIcon from "../../icons/map-icon.png";
//import "./NavBar.css";

import Logo from "./Logo";
import {useAuth0} from "@auth0/auth0-react";

export default function NavBar() {
    const {loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0();

    const {isOpen, onOpen, onClose} = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    const linkColor = useColorModeValue('gray.200', 'gray.200');
    const linkHoverColor = useColorModeValue('blue.300', 'blue.300');
    const bgColor = useColorModeValue('gray.700', 'gray.700');

    const links = [{id: 0, name: "Add point", url: '/addpoint', restricted: true},
        {id: 1, name: "About", url: '/about', restricted: false},
        {id: 2, name: "Contact Us", url: '/contact', restricted: false},
        {id: 3, name: "PrivateTest", url: '/private', restricted: false},
        {id: 4, name: "ApiTest", url: '/apitest', restricted: false}]

    const buttons = [{id: 0, name: "Log In", onClick: () => loginWithRedirect(), signed: false},
        {id: 1, name: "Sign Up", onClick: () => loginWithRedirect({screen_hint: 'signup'}), signed: false},
        {id: 2, name: "Log Out", onClick: () => logout({returnTo: window.location.origin}), signed: true}]

    const linkItems = links.map((link) =>
        ((link.restricted && !isLoading && isAuthenticated) || !link.restricted) &&
        <Link as={RouterLink} to={link.url}
              key={link.id}
              color={linkColor}
              fontSize='lg'
              href={link.url}
              _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
              }}>
            {link.name}
        </Link>
    );

    const buttonItems = buttons.map((button) =>
        (!isLoading && ((!button.signed && !isAuthenticated) || (button.signed && isAuthenticated))) &&
        <Button
            key={button.id}
            color={linkColor}
            variant="outline"
            _hover={{bg: linkHoverColor, borderColor: linkHoverColor, color: bgColor}}
            onClick={button.onClick}
        >
            {button.name}
        </Button>
    );

    return (
        <React.Fragment>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding={3}
                bg={bgColor}
            >
                <Logo/>
                <Box display={{base: "block", md: "none"}} onClick={handleToggle}>
                    <Button variant="outline" color={linkColor}>
                        <HamburgerIcon/>
                    </Button>
                </Box>

                <Stack
                    direction={{base: "column", md: "row"}}
                    display={{base: isOpen ? "flex" : "none", md: "flex"}}
                    width={{base: "full", md: "auto"}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{base: 5, md: 0}}
                    paddingLeft={isOpen ? 0 : 5}
                    spacing={5}
                >
                    {linkItems}
                </Stack>

                <Stack
                    direction={{base: "column", md: "row"}}
                    display={{base: isOpen ? "flex" : "none", md: "block"}}
                    width={{base: "full", md: "auto"}}
                    mt={{base: 5, md: 0}}
                >
                    {buttonItems}
                </Stack>
            </Flex>
            <Outlet/>
        </React.Fragment>
    );
}
