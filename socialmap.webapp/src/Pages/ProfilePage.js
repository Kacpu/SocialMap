import Userfront from "@userfront/react";
import {Box, Button, HStack, Stack, Text, useColorModeValue} from "@chakra-ui/react";
import {Divider} from "antd";
import PoiBox from "../components/PoiBox";
import {useState} from "react";

//Userfront.init("xbr78p4n");

export default function ProfilePage() {
    const [isPoiDisplay, setPoiDisplay] = useState(false);
    const boxColor = useColorModeValue('gray.600', 'gray.700');

    const displayPoi = () => {
        setPoiDisplay(prevState => !prevState)
    }

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems='center' mb={20} >
            <Box width={'80vw'} mt={8} p={5} px={10} >
                <Text fontSize={'32px'} fontWeight='bold' mb={6}>
                    {Userfront.user.name}
                </Text>
                <Stack spacing={'12px'}>
                    <HStack>
                        <Text fontSize={'18px'} color={"gray.400"}>Email: </Text>
                        <Text fontSize={'18px'}>{Userfront.user.email}</Text>
                    </HStack>
                    <HStack>
                        <Text fontSize={'18px'} color={"gray.400"}>Uuid: </Text>
                        <Text fontSize={'18px'}>{Userfront.user.userUuid}</Text>
                    </HStack>
                </Stack>
                <Box height={0.5} border={'none'} bg={"#32a2a8"} marginTop={10}  boxShadow={'0 3px 13px 1px gray'}>
                </Box>
            </Box>

            <Button colorScheme='teal' size='sm' onClick={displayPoi}>
                poi details
            </Button>

            {isPoiDisplay && <PoiBox poiId={40}></PoiBox>}

        </Box>
    );
}

function getRole() {
    if (Userfront.user.hasRole("admin"))
        return "Admin";
    else if (Userfront.user.hasRole("editor"))
        return "Editor";
    else
        return "User";
}