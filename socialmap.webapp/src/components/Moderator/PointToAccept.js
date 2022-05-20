import {
    FormErrorMessage,
    Badge,
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Textarea,
    Select,
    Switch,
    SimpleGrid,
    IconButton,
    VStack,
    Center,
    Spacer
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import AcceptButton from '../Buttons/AcceptButton';
import WarningButton from '../Buttons/WarningButton';

export default function PointToAccept(props) {
    const [expand, setExpand] = useState(false);

    const downIcon = () =>
    (
        <ChevronDownIcon align w={10} h={10} />
    );

    const upIcon = () =>
    (
        <ChevronUpIcon align w={10} h={10} />
    )

    const handleToggle = () => (setExpand(!expand));

    function makeBox(textData) {
        return (
            <Box border={'1px'} bgColor={'gray.700'} rounded={'md'} mb={1} borderColor={'gray.500'}>
                <Text ml={2} mr={2} mt={1} mb={1}>{textData}</Text>
            </Box>
        );
    }

    return (
        <Box>
            <Stack bgColor={'gray.600'} border={'1px'} borderColor={'transparent'} roundedTop={'lg'} px={5} py={2}
                _hover={{
                    borderColor: 'white',
                    cursor: 'pointer'
                }}
                onClick={handleToggle}>
                <Flex>
                    <Box >
                        <HStack>
                            <Text>ID: </Text>
                            {makeBox(props.id)}
                        </HStack>

                        <HStack mt={2}>
                            <Text>Name: </Text>
                            {makeBox(props.name)}
                        </HStack>
                    </Box>
                    <Spacer />
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} >
                        {expand ? upIcon() : downIcon()}
                    </Box>
                </Flex>
            </Stack>
            <Box display={expand ? '' : 'none'}>
                <Stack bgColor={'gray.600'} roundedBottom={'lg'}>
                    <Box mt={2} mb={2} ml={5} mr={'5'}>
                        <HStack pb={2}>
                            <Text mb={1}>Author:</Text>
                            {makeBox(props.author)}
                        </HStack>
                        <HStack pb={2}>
                            <Text mb={1}>Category: </Text>
                            {makeBox(props.category)}
                        </HStack>
                        <HStack pb={2}>
                            <Text mb={1}>X:</Text>
                            {makeBox(props.x)}
                        </HStack>
                        <HStack pb={2}> 
                            <Text mb={1}>Y:</Text>
                            {makeBox(props.y)}
                        </HStack>
                        
                        <Text mb={1}>MAP: </Text>
                        <Text mb={1}>Description: </Text>
                        {makeBox(props.description)}
                        <Text>IsGlobal: {props.isGlobal}</Text>
                    </Box>
                    <Box display='flex' pb={5}>
                        <AcceptButton w={'50%'} ml={5} mr={2}>Accept</AcceptButton>
                        <WarningButton w={'50%'} mr={5} ml={2}>Reject</WarningButton>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}