import {
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    useColorModeValue,
    IconButton,
    Button,
    VStack,
    HStack,
    useClipboard,
    Tooltip
} from '@chakra-ui/react';
import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
    MdOutlineEmail,
} from 'react-icons/md';
import React from "react";
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';

export default function Contact() {
    //dane do skopiowania
    const [value, setValue] = React.useState('');
    const { hasCopied, onCopy } = useClipboard(value)
        //'01153115@pw.edu.pl');
    //const { hasLocalCopied, onCopy} = useClipboard('Poland, Warsaw, Warsaw Institute of Technology')
    function handleAction(name){
        var toCopy = "null"
        if(name === "email1")
        {
            toCopy = "01153115@pw.edu.pl"
        }
        else if(name === "localization")
        {
            toCopy ="Poland, Warsaw, WUT"
        }
        setValue(toCopy);
        onCopy();
    }
    return (
        <Flex
            minH={'100vh'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>

            <Stack spacing={12} mx={'auto'} maxW={'500px'} w={'100%'} py={12} px={0}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Contact us!
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={5}
                >
                    <Stack align="center">
                        <Text color={"gray.500"}>Use one of contacts below:</Text>
                    </Stack>
                    <Box py={{ base: 5, sm: 5, md: 5, lg: 5 }}>
                        <VStack pl={0} spacing={3} alignItems="center">
                            <Tooltip
                                label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                                closeOnClick={false}
                                hasArrow>
                                <Button
                                    size="md"
                                    height="48px"
                                    width="200px"
                                    variant="ghost"
                                    color="blue"
                                    _hover={{ border: '2px solid #1C6FEB' }}
                                    onClick={event => handleAction("email1")}
                                    leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                                    01153115@pw.edu.pl
                                </Button>
                            </Tooltip>
                        </VStack>

                        <VStack pl={0} spacing={3} alignItems="center">
                        <Tooltip
                                label={hasCopied ? 'Localization Copied!' : 'Copy Localization'}
                                closeOnClick={false}
                                hasArrow>
                            <Button
                                size="md"
                                height="48px"
                                width="200px"
                                variant="ghost"
                                color="blue"
                                _hover={{ border: '2px solid #1C6FEB' }}
                                onClick={event => handleAction("localization")}
                                leftIcon={<MdLocationOn color="#1970F1" size="20px"
                                />}
                            >
                                Poland, Warsaw
                            </Button>
                            </Tooltip>
                        </VStack>
                    </Box>

                    <Stack align={'center'} mt={20}>
                        <HStack
                            mt={{ lg: 0, md: 0 }}
                            spacing={5}
                        >
                            <IconButton
                                aria-label="facebook"
                                variant="ghost"
                                size="lg"
                                isRound={true}
                                _hover={{ bg: '#0D74FF' }}
                                icon={<MdFacebook size="28px" />}
                            />
                            <IconButton
                                aria-label="github"
                                variant="ghost"
                                size="lg"
                                isRound={true}
                                _hover={{ bg: '#0D74FF' }}
                                icon={<BsGithub size="28px" />}
                            />
                            <IconButton
                                aria-label="discord"
                                variant="ghost"
                                size="lg"
                                isRound={true}
                                _hover={{ bg: '#0D74FF' }}
                                icon={<BsDiscord size="28px" />}
                            />
                        </HStack>
                    </Stack>
                </Box>

            </Stack>
        </Flex>
    );
}