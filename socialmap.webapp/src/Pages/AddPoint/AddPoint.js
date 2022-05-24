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
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    Stack,
    Switch,
    Text,
    Textarea,
    useColorModeValue
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form'
import {CloseIcon, SearchIcon} from '@chakra-ui/icons';
import Map from '../../components/Map/Map'
import {categoryData} from '../../mocks/CategoryMock';
import React, {useRef, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {Select as SelectMaterial} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

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
    const [mapCenter, setMapCenter] = React.useState([52.22983, 21.01173]);
    const [reloadMap, setReloadMap] = React.useState(false)
    const [displayClearButton, setDisplayClearButton] = React.useState(false)
    const [chosenItem, setChosenItem] = React.useState('helelelelp')

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
        let obj = JSON.stringify([data.name, data.description, data.category, data.isGlobal, markerPosition.lat, markerPosition.lng], null, 3)
        alert(obj)
    }

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm()

    const handleChange = (event) => {
        setValue(event.target.value)
        if (event.target.value.trim().length === 0)
            setDisplayClearButton(false)
        else
            setDisplayClearButton(true)
    }

    async function getData() {
        if (value.trim().length === 0)
            return 0;
        setItems([])
        let url = 'https://nominatim.openstreetmap.org/?addressdetails=1&q=' + value + ', Warszawa&format=json&limit=5'
        const response = await fetch(url)
        let data = await response.json()
        if (data.length === 0) {
            setShowPointList(false)
            return 0;
        } else {
            setShowPointList(true)
        }
        data = data.filter(x => x.address.city === "Warszawa" || x.address.city === "Warsaw");
        if (data.length === 0) {
            setShowPointList(false)
            return 0;
        } else {
            setShowPointList(true)
        }
        setItems(data)
        setChosenItem(data[0])
        setMapCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)])
        setReloadMap(true)
        setTimeout(() => setReloadMap(false), 1)
        console.log(data)
    }

    const handleSelectChange = (event) => {
        setChosenItem(event.target.value)
        setMapCenter([parseFloat(event.target.value.lat), parseFloat(event.target.value.lon)])
        setReloadMap(true)
        setTimeout(() => setReloadMap(false), 1)
    }

    const handleClearClick = () => {
        setValue('')
        setDisplayClearButton(false)
    }


    const mapRef = useRef()
    const getCentralMarkerPosition = () => {
        return mapRef.current.getCentralMarkerPosition()
    }

    const clearButton = () => (
        <Button variant={'ghost'} color={'blue.300'} onClick={handleClearClick}>
            <CloseIcon/>
        </Button>
    );

    function filterString(string) {
        let poiName = string.display_name.split(',')
        let res = []
        if (string.address.hasOwnProperty('city'))
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.country.replace(/\s/g, ''))
        if (string.address.hasOwnProperty('state'))
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.state.replace(/\s/g, ''))
        if (string.address.hasOwnProperty('postcode'))
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.postcode)
        if (string.address.hasOwnProperty('city_district'))
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.city_district.replace(/\s/g, ''))
        if (string.address.hasOwnProperty('quarter'))
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.quarter.replace(/\s/g, ''))
        if (string.address.hasOwnProperty('suburb')) {
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.suburb.replace(/\s/g, ''))
            res.push(string.address.suburb)
        }
        if (string.address.hasOwnProperty('neighbourhood'))
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.neighbourhood.replace(/\s/g, ''))
        if (string.address.hasOwnProperty('road')) {
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.road.replace(/\s/g, ''))
            res.splice(0, 0, string.address.road)
        }
        if (string.address.hasOwnProperty('house_number')) {
            poiName = poiName.filter(a => a.replace(/\s/g, '') !== string.address.house_number.replace(/\s/g, ''))
            res.splice(1, 0, string.address.house_number)
        }
        res.splice(0, 0, poiName.join(''))
        return res
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

                                           colorScheme={'red'}
                                    />
                                    <InputRightElement style={{width: "auto", height: "100%", marginRight: "4px"}}>
                                        <HStack spacing='0px'>
                                            {displayClearButton ? clearButton() : null}
                                            <Button
                                                variant={'ghost'}
                                                onClick={async () => {
                                                    (await getData())
                                                }}
                                                color={'blue.300'}
                                            >
                                                <SearchIcon/>
                                            </Button>
                                        </HStack>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Collapse in={showPointList} animateOpacity>
                                <ThemeProvider theme={darkTheme}>
                                    <InputLabel style={{width: '100%', marginBottom: '5px'}}>Search results</InputLabel>
                                    <SelectMaterial
                                        value={chosenItem}
                                        onChange={handleSelectChange}
                                        style={{width: '100%'}}
                                    >
                                        {items.map(data => (
                                            <MenuItem value={data}>
                                                {filterString(data)[0]}
                                                <br/>
                                                {filterString(data).splice(1, filterString(data).length).join(' ')}
                                            </MenuItem>
                                        ))}
                                    </SelectMaterial>
                                </ThemeProvider>
                            </Collapse>

                            {
                                reloadMap ? <Box className={'map-container'}/> :
                                    <Map ref={mapRef} height={'400px'} diplayMarkers={true} mapCenter={mapCenter}
                                         diplayCenterMarker={true} zoom={17} draggable={true}/>
                            }
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
    )
        ;
}

// export default withAuthenticationRequired(AddPoint, {
//   // Show a message while the user waits to be redirected to the login page.
//   onRedirecting: () => <div>Redirecting you to the login page...</div>,
// });