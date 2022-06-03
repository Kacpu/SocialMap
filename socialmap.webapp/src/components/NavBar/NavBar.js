import React, {useEffect, useState} from 'react';
import {Link as RouterLink, Outlet} from "react-router-dom";
import {
    Box,
    Stack,
    Flex,
    Text,
    Button,
    useDisclosure,
    useColorModeValue,
    Link, Icon, Divider
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import Userfront from "@userfront/react";
import Logo from "./Logo";
import {FaUser} from "react-icons/fa";
import {isMod, isUserAuthenticated} from "../../auth/authenticationFunctions";

//Userfront.init("pn4xgmpn");

export default function NavBar() {
    let navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());
    // const userData = JSON.stringify(Userfront.user, null, 2);

    const linkColor = useColorModeValue('gray.200', 'gray.200');
    const linkHoverColor = useColorModeValue('blue.300', 'blue.300');
    const bgColor = useColorModeValue('gray.800', 'gray.700');

    const handleLogin = () => {
        navigate('/login');
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    const links = [
        {id: 0, name: "Add point", url: '/addpoint', protect: true},
        {id: 1, name: "About", url: '/about', protect: false},
        {id: 2, name: "Contact Us", url: '/contact', protect: false},
    ]

    const buttons = [{id: 0, name: "Log In", onClick: handleLogin, signed: false},
        {id: 1, name: "Sign Up", onClick: handleSignUp, signed: false},
        {id: 2, name: "Log Out", onClick: Userfront.logout, signed: true}]

    const linkItems = links.map((link) =>
        ((link.protect && isUserAuthenticated()) || !link.protect) &&
        <Link as={RouterLink} to={{pathname: link.url}}
              key={link.id}
              color={linkColor}
              fontSize='lg'
              href={link.url}
              onClick={isOpen ? handleToggle : null}
              _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
              }}>
            {link.name}
        </Link>
    );

    const moderatorLink =
        <Link as={RouterLink} to={{pathname: '/moderatorpanel'}}
              key={3}
              color={linkColor}
              fontSize='lg'
              href={'/moderatorpanel'}
              onClick={isOpen ? handleToggle : null}
              _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
              }}>
            {"Moderator Panel"}
        </Link>

    const profileLinkButton =
        <Button as={RouterLink} to={'/profile'}
                fontWeight={'bold'}
                href={'/profile'}
                onClick={isOpen ? handleToggle : null}
                _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                }}
                variant={"ghost"}>
            <Icon as={FaUser}></Icon>
            <Text ml={"10px"}>
                {Userfront.user.name}
            </Text>
        </Button>

    const buttonItems = buttons.map((button) =>
        ((!button.signed && !isUserAuthenticated()) || (button.signed && isUserAuthenticated())) &&
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
                    {isMod() && moderatorLink}
                    {linkItems}

                </Stack>

                {/*{authenticationFunctions() && console.log(Userfront.user)}*/}
                {/*{console.log(Userfront.user?.hasRole("admin"))}*/}

                <Stack
                    direction={{base: "column", md: "row"}}
                    display={{base: isOpen ? "flex" : "none", md: "block"}}
                    width={{base: "full", md: "auto"}}
                    mt={{base: 5, md: 0}}
                >
                    <Divider display={{base: "", md: "none"}}/>
                    {
                        isUserAuthenticated() &&
                        profileLinkButton
                    }
                    {buttonItems}
                </Stack>
            </Flex>
            <Outlet/>
        </React.Fragment>
    );
}
