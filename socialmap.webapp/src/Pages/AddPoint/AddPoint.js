import {
    Badge,
    Box,
    Button, Collapse,
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
    Switch, Table, TableContainer, Tbody, Td,
    Text,
    Textarea, Th, Thead, Tr,
    useColorModeValue
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form'
import {SearchIcon} from '@chakra-ui/icons';
import Map from '../../components/Map/Map'

import {categoryData} from '../../mocks/CategoryMock';
import React, {useState} from "react";
import {Marker, Popup} from "react-leaflet";
import {ReactComponent as Like} from "../../icons/like-icon.svg";
import {POIMock} from "../../mocks/POIMock_old";


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
// console.log(categoryData)
    const [value, setValue] = React.useState('')

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
    const handleClick = () => {
        // fetch("open.mapquestapi.com/nominatim/v1/search.php?key=mNZPR3h0A0UeNPdXA33howJhCqJwBhwQ&format=json&q=" + value + "&addressdetails=1&limit=3&viewbox=-1.99%2C52.02%2C0.78%2C50.94&exclude_place_ids=41697")
        //     .then(res => res.json())
        //     .then(result => {
        //             setItems(result);
        //         }
        //     )
        // setShowPointList(true);
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
                                            onClick={handleClick}
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
                                        <Table variant='striped' colorScheme='teal'>
                                            <Thead>
                                                <Tr>
                                                    <Th>Name</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {items.map(data => (
                                                    <Tr>
                                                        <Td>data.display_name</Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Collapse>

                            <Map height={'400px'} arr={items}/>

                            <FormControl>
                                <Input id='location' type="text" placeholder='ul. Sample 123' disabled={true}
                                       value="Sample123"
                                       {...register("location", {})} />
                            </FormControl>

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