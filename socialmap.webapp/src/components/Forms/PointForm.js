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
import {ArrowBackIcon, CloseIcon, SearchIcon} from '@chakra-ui/icons';
import Map from '../../components/Map/Map'
import {categoryData} from '../../mocks/CategoryMock';
import React, {useEffect, useRef, useState} from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {Select as SelectMaterial} from "@mui/material";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {getCategories} from "../../socialMapApi/categoryRequests";
import searchOSM from "../../tools/SearchOSM"
import filterOSMName from "../../tools/FilterOSMName";

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

export default function PointForm(props) {
    const [inputValue, setInputValue] = React.useState('')
    const [mapCenter, setMapCenter] = React.useState(initialMap());
    const [reloadMap, setReloadMap] = React.useState(false)
    const [displayClearButton, setDisplayClearButton] = React.useState(false)
    const [chosenItem, setChosenItem] = React.useState('')
    const [items, setItems] = useState([]);
    const [showPointList, setShowPointList] = useState(false)
    const [categories, setCategories] = useState([]);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const labelColor = useColorModeValue('gray.600', 'gray.200');
    const inputColor = useColorModeValue('gray.100', 'gray.50')
    const subBoxColor = useColorModeValue('gray.600', 'gray.600');
    const [centerMarkerFlag, setCenterMarkerFlag] = React.useState(true);
    const ac = new AbortController();

    const {
        handleSubmit,
        register,
        reset,
        formState: {errors, isSubmitting},
    } = useForm()

    function initialMap() {
        if (props.defaultValues) {
            return [props.defaultValues.x, props.defaultValues.y]
        }

        return [52.22983, 21.01173]
    }

    useEffect(() => {
        if (props.defaultValues) {
            reset({
                    name: props.defaultValues.name,
                    description: props.defaultValues.description,
                    category: props.defaultValues.categories?.length > 0 ? props.defaultValues.categories[0].id : null
                }
            )
        }
        // if(props.defaultValues.x && props.defaultValues.y){
        //     setMapCenter([props.defaultValues.x, props.defaultValues.y]);
        // }
        // setCenterMarkerFlag(true);
    }, [])

    useEffect(() => {
        (async () => {
            const res = await getCategories(ac.signal).catch(console.error);
            if (res?.ok) {
                const sortData = res.data?.sort(c => c.name);
                setCategories(sortData);
            }
            if(res){
                setIsCategoriesLoading(false);
            }
        })();
        return () => {
            ac.abort("abort from fetch categories at add point");
        };
    }, []);

    const categoryList = categories?.map((category) =>
        <option key={category.id} value={category.id}>
            {category.name}
        </option>
    );

    async function onSubmit(data) {
        const markerPosition = getCentralMarkerPosition();
        const poi = {
            ...data,
            x: markerPosition.lat,
            y: markerPosition.lng,
            categoriesId: data.category ? [data.category] : null
        };
        await props.submitAction(poi);
    }

    const handleChange = (event) => {
        setInputValue(event.target.value)
        if (event.target.value.trim().length === 0)
            setDisplayClearButton(false)
        else
            setDisplayClearButton(true)
    }

    async function getData() {
        const data = await searchOSM(inputValue, 5,null, ac.signal)
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
    }

    const handleSelectChange = (event) => {
        setChosenItem(event.target.value)
        setMapCenter([parseFloat(event.target.value.lat), parseFloat(event.target.value.lon)])
        setReloadMap(true)
        setTimeout(() => setReloadMap(false), 1)
    }

    const handleClearClick = () => {
        setInputValue('')
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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                minH={'100vh'}
                justify={'center'}
                //bg={useColorModeValue('gray.50', 'gray.800')}
            >

                <Stack spacing={5} mx={'auto'} maxW={'700px'} w={'90%'} py={12} px={0} position={"relative"}>
                    <Button alignSelf={"flex-start"} position="absolute"
                            top={"5"}
                            variant={"outline"}
                            onClick={() => props.backAction()}>
                        <ArrowBackIcon/>
                    </Button>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'} color={'gray.100'}>
                            {props.title}
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.400'}>
                            {props.subtitle}
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
                                {isCategoriesLoading ? (
                                    <Button width={"100%"} isLoading={true} loadingText={"loading categories"}></Button>
                                ) : (
                                    <Select id='category' color={inputColor} bgColor={subBoxColor}
                                            placeholder='Select category'
                                            {...register("category", {})}>
                                        {categoryList}
                                    </Select>
                                )}
                                <FormErrorMessage>
                                    {errors.category && errors.category.message}
                                </FormErrorMessage>
                            </FormControl>

                            {props.action === "add" &&
                                <FormControl isInvalid={errors.isGlobal} display='flex' alignItems='center'>
                                    <FormLabel htmlFor='isGlobal' mb='0' color={labelColor}>Global</FormLabel>
                                    <Switch id='isGlobal'
                                            {...register("isGlobal", {})} />
                                    <FormErrorMessage>
                                        {errors.isGlobal && errors.isGlobal.message}
                                    </FormErrorMessage>
                                </FormControl>
                            }

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
                                           value={inputValue}
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
                                            <MenuItem value={data} key={data.place_id}>
                                                {filterOSMName(data)[0]}
                                                <br/>
                                                {filterOSMName(data).splice(1, filterOSMName(data).length).join(' ')}
                                            </MenuItem>
                                        ))}
                                    </SelectMaterial>
                                </ThemeProvider>
                            </Collapse>

                            {
                                reloadMap ? <Box className={'map-container'}/> :
                                    <Map ref={mapRef} height={'400px'} diplayMarkers={true} mapCenter={mapCenter}
                                         diplayCenterMarker={centerMarkerFlag} zoom={17} draggable={true}
                                         centerPoi={props.defaultValues}
                                    />
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
                            {props.buttonName}
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
        ;
}

// export default withAuthenticationRequired(PointPages, {
//   // Show a message while the user waits to be redirected to the login page.
//   onRedirecting: () => <div>Redirecting you to the login page...</div>,
// });