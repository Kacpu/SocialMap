import {
    Flex,
    Box,
    HStack,
    Stack,
    Text,
    Spacer, useToast
} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react';
import {ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons';
import AcceptButton from '../Buttons/AcceptButton';
import WarningButton from '../Buttons/WarningButton';
import Map from "../Map/Map";
import EditButton from '../Buttons/EditButton';
import {useNavigate} from "react-router-dom";
import {updatePoi} from "../../socialMapApi/poiRequests";
import {errorToast, successToast} from "../Toasts/ToastUtil";

export default function PointBox(props) {
    const navigate = useNavigate();
    const [expand, setExpand] = useState(false);
    const [displayMap, setDisplayMap] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast()

    const downIcon = () => <ChevronDownIcon w={10} h={10}/>;

    const upIcon = () => <ChevronUpIcon w={10} h={10}/>;

    const handleToggle = () => {
        setExpand(!expand);
        setDisplayMap(!displayMap);
    };

    const handleAccept = async () => {
        setIsLoading(true);
        const res = await updatePoi(props.id, {isAccepted: true});
        if (res?.ok) {
            successToast(toast, "accepted", "point " + props.name);
            props.onPointToAcceptRemove(props.id);
        } else {
            errorToast(toast)
        }
    }

    const handleReject = async () => {
        setIsLoading(true);
        const res = await updatePoi(props.id, {isGlobal: false});
        if (res?.ok) {
            successToast(toast, "rejected", "point " + props.name);
            props.onPointToAcceptRemove(props.id);
        } else {
            errorToast(toast)
        }
    }

    const handleEdit = () => {
        navigate("/editpoint", {state: {pointId: props.id, beforeSite: "/moderatorpanel/#globalPoints"}})
    }

    const handleDelete = async () => {
        setIsLoading(true);
        const res = await updatePoi(props.id, {isGlobal: false, isAccepted: false});
        if (res?.ok) {
            successToast(toast, "removed", "point " + props.name);
            props.onGlobalPointRemove(props.id);
        } else {
            errorToast(toast)
        }
    }

    function makeBox(textData) {
        return (
            <Box border={'1px'} bgColor={'gray.700'} rounded={'md'} mb={1} borderColor={'gray.500'}>
                <Text ml={2} mr={2} mt={1} mb={1}>{textData}</Text>
            </Box>
        );
    }

    return (
        <Box mb={"10px"}>
            <Stack bgColor={'gray.600'} border={'2px'} roundedTop={'lg'}
                   px={5} py={2}
                   borderColor={expand ? "yellow.400" : 'transparent'}
                   borderBottom={expand ? "hidden" : ""}
                   boxShadow='xl'

                   _hover={{
                       borderColor: 'gray.300',
                       borderBottom: '',
                       cursor: 'pointer'
                   }}
                   onClick={handleToggle}

            >
                <Flex>
                    <Box>
                        <HStack>
                            <Text>ID: </Text>
                            {makeBox(props.id)}
                        </HStack>

                        <HStack mt={2}>
                            <Text>Name: </Text>
                            {makeBox(props.name)}
                        </HStack>
                    </Box>
                    <Spacer/>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        {expand ? upIcon() : downIcon()}
                    </Box>
                </Flex>
            </Stack>
            <Box display={expand ? '' : 'none'}>
                <Stack bgColor={'gray.700'} roundedBottom={'lg'} border={"2px"} borderTop={"hidden"}
                       borderColor={"yellow.400"}
                       boxShadow='xl'>
                    <Box mt={2} mb={2} ml={5} mr={'5'}>
                        <HStack pb={2}>
                            <Text mb={1}>Author:</Text>
                            {makeBox(props.author)}
                        </HStack>
                        <HStack pb={2}>
                            <Text mb={1}>Category: </Text>
                            {makeBox(props.category)}
                        </HStack>
                        <Text mb={1}>Map: </Text>
                        {displayMap ? (
                            <Box><Map diplayMarkers={false} mapCenter={[props.x, props.y]} zoom={17} showSearch={false}
                                      diplayCenterMarker={true} draggable={false}/> </Box>) : (<></>)}
                        <Text mb={1} mt={5}>Description: </Text>
                        {makeBox(props.description)}
                    </Box>

                    {props.pointType === "toAccept" ? (
                        <Box display='flex' pb={5}>
                            <AcceptButton w={'50%'} ml={5} mr={2} onClick={handleAccept} isLoading={isLoading}>
                                Accept
                            </AcceptButton>
                            <WarningButton w={'50%'} mr={5} ml={2} onClick={handleReject} isLoading={isLoading}>
                                Reject
                            </WarningButton>
                        </Box>
                    ) : (
                        <Box display='flex' pb={5}>
                            <EditButton w={'50%'} ml={5} mr={2} onClick={handleEdit} isLoading={isLoading}>
                                Edit
                            </EditButton>
                            <WarningButton w={'50%'} mr={5} ml={2} onClick={handleDelete} isLoading={isLoading}>
                                Remove
                            </WarningButton>
                        </Box>
                    )}

                </Stack>
            </Box>
        </Box>
    );
}