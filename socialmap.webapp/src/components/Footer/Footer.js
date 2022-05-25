import {
    Box,
    Container,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import './Footer.css';

export default function SmallWithSocial() {
    return (
        <Box
            bg={useColorModeValue('gray.700', 'gray.700')}
            color={useColorModeValue('gray.200', 'gray.200')}>
            <Container
                py={3}
                maxWidth={"800px"}
            >
                <Text align={"center"}>SocialMap @ 2022</Text>
                <Text align={'center'} fontWeight={"light"}>Bartłomiej Kopyść, Kacper Tarłowski, Oskar Jankowski</Text>
            </Container>
        </Box>
    );
}