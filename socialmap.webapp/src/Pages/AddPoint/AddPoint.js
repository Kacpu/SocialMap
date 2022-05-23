import {
    Badge,
    Box,
    Button,
    Collapse,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Tr,
    useColorModeValue
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form'
import {ArrowForwardIcon, SearchIcon} from '@chakra-ui/icons';
import Map from '../../components/Map/Map'
import {categoryData} from '../../mocks/CategoryMock';
import React, {useRef, useState} from "react";

function InfoBadge(props) {
    return (
        <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='blue'>
                {props.text}
            </Badge>
        </Box>
    );
}

export default function AddPoint() {
    const [value, setValue] = React.useState('')
    const [mapCenter, setMapCenter] = React.useState([52.22983, 21.01173])
    const [reloadMap, setReloadMap] = React.useState(false)

    const [items, setItems] = useState([]);
    const [showPointList, setShowPointList] = useState(false)

    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const labelColor = useColorModeValue('gray.600', 'gray.200');
    const inputColor = useColorModeValue('gray.100', 'gray.50')
    const subBoxColor = useColorModeValue('gray.600', 'gray.600');
    const categoryList = categoryData.map((category) =>
        <option key={category.id} value={category.id}>{category.name}</option>
    );

    function onSubmit(data) {
        const markerPosition = getCentralMarkerPosition()
        //X: markerPosition.lat
        //Y: markerPosition.lng
        let obj = JSON.stringify(data, null, 3)
//obj.isGlobal = !obj.isGlobal;
        alert(obj)
    }

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm()

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    async function getData() {
        if (value.trim().length === 0)
            return 0;
        setItems([])
        let url = 'https://nominatim.openstreetmap.org/?addressdetails=1&q=' + value + ', Warszawa&format=json&limit=5'
        const response = await fetch(url)
        let data = await response.json()
        console.log(data)
        data = data.filter(x => x.address.city === "Warszawa");
        setItems(data)
        if (data.length === 0) {
            setShowPointList(false)
        } else {
            setShowPointList(true)
        }
    }

    const handleClick = async () => {
        await getData()
    }

    const handleTableButtonClick = (event) => {
        setMapCenter(event)
        setReloadMap(true)
        setTimeout(() => setReloadMap(false), 1)
    }
    const mapRef = useRef()
    const getCentralMarkerPosition = () => {
        return mapRef.current.getCentralMarkerPosition()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                minH={'100vh'}
                justify={'center'}
                //bg={useColorModeValue('gray.50', 'gray.800')}
            >

                <Stack spacing={5} mx={'auto'} maxW={'700px'} w={'90%'} py={12} px={0}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'} color={'gray.100'}>
                            Add new interesting Point!
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.400'}>
                            save your favourite place 🌎
                        </Text>
                    </Stack>

                    <InfoBadge text="1. Informations"/>

                    <Box
                        rounded={'lg'}
                        bg={boxColor}
                        boxShadow={'lg'}
                        p={8}>

                        <Stack spacing={5}>

                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor='name' color={labelColor}>Name</FormLabel>
                                <Input id='name' type="text" color={inputColor} bgColor={subBoxColor}
                                       placeholder='Give a wonderfull name'
                                       {...register("name", {
                                           required: "This is required",
                                           minLength: {value: 3, message: "Minimum length should be 4"}
                                       })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.description}>
                                <FormLabel htmlFor="description" color={labelColor}>Description</FormLabel>
                                <InputGroup>
                                    <Textarea id='description' color={inputColor} bgColor={subBoxColor}
                                              placeholder="Write amazing description"
                                              {...register("description", {
                                                  required: "This is required",
                                                  minLength: {value: 5, message: "Minimum length should be 5"}
                                              })} />
                                </InputGroup>
                                <FormErrorMessage>
                                    {errors.description && errors.description.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.category}>
                                <FormLabel htmlFor='category' color={labelColor}>Category</FormLabel>
                                <Select id='category' color={inputColor} bgColor={subBoxColor}
                                        placeholder='Select category'
                                        {...register("category", {
                                                required: "This is required"
                                            }
                                        )}>
                                    {categoryList}
                                </Select>
                                <FormErrorMessage>
                                    {errors.category && errors.category.message}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={errors.isPrivate} display='flex' alignItems='center'>
                                <FormLabel htmlFor='isGlobal' mb='0' color={labelColor}>Global</FormLabel>
                                <Switch id='isGlobal'
                                        {...register("isGlobal", {})} />
                                <FormErrorMessage>
                                    {errors.isGlobal && errors.isGlobal.message}
                                </FormErrorMessage>
                            </FormControl>

                        </Stack>
                    </Box>

                    <InfoBadge text="2. Pick location"/>

                    <Box
                        rounded={'lg'}
                        bg={boxColor}
                        boxShadow={'lg'}
                        p={8}>

                        <Stack spacing={5}>
                            <FormControl>
                                <FormLabel htmlFor='findLocation' color={labelColor}>Location</FormLabel>
                                <InputGroup>
                                    <Input id="findLocation"
                                           type="text"
                                           color={inputColor}
                                           value={value}
                                           onChange={handleChange}
                                           placeholder='Find location'
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={async () => {
                                                await handleClick()
                                            }}
                                            color={'blue.300'}
                                        >
                                            <SearchIcon/>
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Collapse in={showPointList} animateOpacity>
                                <Box
                                    padding={"15px"}
                                    color='white'
                                    mt='4'
                                    bg='blue.200'
                                    rounded='md'
                                    shadow='md'
                                >
                                    <TableContainer>
                                        <Table variant='striped' colorScheme='teal' whiteSpace={'break-spaces'}>
                                            <Tbody>
                                                {items.map(data => (
                                                    <Tr key={data.place_id}>
                                                        <Td>{data.display_name.split(',').filter(a => a.replace(/\s/g, '') !== data.address.country && a.replace(/\s/g, '') !== data.address.postcode && a.replace(/\s/g, '') !== data.address.state.replace(/\s/g, '') && a.replace(/\s/g, '') !== data.address.city_district.replace(/\s/g, '') && a.replace(/\s/g, '') !== data.address.neighbourhood && a.replace(/\s/g, '') !== data.address.quarter.replace(/\s/g, '')).join('')}</Td>
                                                        <Td className={'tableButton'}>
                                                            <Button rightIcon={<ArrowForwardIcon/>} colorScheme='teal'
                                                                    variant='solid' size='sm'
                                                                    onClick={() => handleTableButtonClick([parseFloat(data.lat), parseFloat(data.lon)])}>
                                                                Go to
                                                            </Button>
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Collapse>

                            {reloadMap ? <Box className={'map-container'}/> :
                                <Map ref={mapRef} height={'400px'} diplayMarkers={true} mapCenter={mapCenter}
                                     diplayCenterMarker={true} zoom={17} draggable={true}/>}
                        </Stack>
                    </Box>

                    <Stack spacing={10} pt={2}>
                        <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={'blue.600'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                            width={'99%'}
                            alignSelf={'center'}
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            Add Point
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}

// export default withAuthenticationRequired(AddPoint, {
//   // Show a message while the user waits to be redirected to the login page.
//   onRedirecting: () => <div>Redirecting you to the login page...</div>,
// });