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
import React, {useEffect, useState} from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

export default function PointToAccept(props) {
    const [expand, setExpand] = useState(false);

    const downIcon= () =>
    (
        <ChevronDownIcon align w={10} h={10} bgColor={'blue'} />
    );

    const upIcon=() =>
    (
        <ChevronUpIcon align w={10} h={10} bgColor={'blue'} />
    )

    const handleToggle= () => ( setExpand(!expand) );


    return (
        <Box>
            <Stack bgColor={'gray.600'} border={'1px'} borderColor= {'transparent'}rounded={'lg'} px={5} py={2}
            _hover={{
                borderColor: 'white',
                cursor: 'pointer'
            }}
            onClick={handleToggle}>
                <Flex>
                    <Box bgColor="green">
                        <HStack>
                            <Text>ID: </Text>
                            <Text>{props.id}</Text>
                        </HStack>

                        <HStack mt={2}>
                            <Text>Name: </Text>
                            <Text>{props.name}</Text>
                        </HStack>
                    </Box>
                    <Spacer />
                    <Box display={'flex'} bgColor="red" alignItems={'center'} justifyContent={'center'} >
                        {expand ? upIcon() : downIcon()}
                    </Box>
                </Flex>
            </Stack>
            <Box display={expand ? '' : 'none'}>
                <Stack bgColor={'gray.600'}>
                    <Text>Author</Text>
                    <Text>Category</Text>
                    <Text>X</Text>
                    <Text>Y</Text>
                    <Text>MAP</Text>
                    <Text>Description</Text>
                    <Text>IsGlobal</Text>
                    <Button>Accept</Button>
                    <Button>Reject</Button>
                </Stack>
            </Box>
        </Box>
    );
}