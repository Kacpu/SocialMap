import {
    Box,
    Container,
    Text,
    useColorModeValue,
    Heading
} from '@chakra-ui/react';

import './ContactUs.css'

export default function ContactUs() {
    return (
        <div>
            <Box maxW='32rem'>
                <Heading mb={4}>If you have any question: contact us!</Heading>
                <Text fontSize='xl'>
                    Email us. https://chakra-templates.dev/forms/contact
                </Text>
            </Box>
        </div>
    );
}