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
import { ChevronDownIcon } from '@chakra-ui/icons';

export default function PointToAccept(props) {

    return (
        <Box>
            <Stack bgColor={'gray.600'} rounded={'lg'} px={5} py={2}>
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
                    <Box alignContet={'right'} bgColor="red">
                        <ChevronDownIcon align w={10} h={10} />
                    </Box>
                </Flex>
            </Stack>
        </Box>
    );
}