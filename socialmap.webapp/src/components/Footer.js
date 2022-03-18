import {
    Box,
    Container,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function SmallWithSocial() {
    return (
        <Box
            bg={useColorModeValue('gray.700', 'gray.700')}
            color={useColorModeValue('gray.200', 'gray.200')}>
            <Container
                py={3}
            >
                <Text align={'center'}>© 2022 Bartłomiej Kopyść, Kacper Tarłowski, Oskar Jankowski</Text>
            </Container>
        </Box>
    );
}