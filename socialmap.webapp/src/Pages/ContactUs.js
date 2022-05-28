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
    const { hasCopied, onCopy } = useClipboard(value, 500);
    
    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const labelColor = useColorModeValue('gray.600', 'gray.200');
    const itemColor = useColorModeValue('gray.100', 'blue.200')
    const iconColor = useColorModeValue('gray.600', 'gray.600');

    const emails=["01153115@pw.edu.pl", "11123@pwedu.pl", "12xx@pw.edu.pl"];

    function handleAction(name){
        navigator.clipboard.writeText(name);
        onCopy();
    }

    const emailsMapped = emails.map( (email) =>
        <React.Fragment>
            <VStack pl={0} spacing={3} alignItems="center" mb={2}>
                <Tooltip
                    label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                    closeOnClick={false}
                    hasArrow>
                    <Button
                        size="md"
                        height="48px"
                        width="200px"
                        variant="ghost"
                        color={itemColor}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        onClick={(event) => handleAction(email)}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                        {email}
                    </Button>
                </Tooltip>
            </VStack>
        </React.Fragment>
    );


    return (
            <Stack spacing={12} mx={'auto'} maxW={'500px'} w={'100%'} py={12} px={0}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Contact us!
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={boxColor}
                    boxShadow={'lg'}
                    p={5}
                >
                    <Stack align="center">
                        <Text color={labelColor}>Use one of contacts below:</Text>
                    </Stack>
                    <Box py={{ base: 5, sm: 5, md: 5, lg: 5 }}>

                        {emailsMapped}

                    </Box>

                    <Stack align={'center'} mt={0}>
                        <HStack
                            mt={{ lg: 0, md: 0 }}
                            spacing={5}
                        >
                            <IconButton
                                aria-label="github"
                                variant="ghost"
                                size="lg"
                                isRound={true}
                                _hover={{ bg: '#0D74FF' }}
                                icon={<BsGithub size="28px" />}
                            />
                        </HStack>
                    </Stack>
                </Box>

            </Stack>

    );
}