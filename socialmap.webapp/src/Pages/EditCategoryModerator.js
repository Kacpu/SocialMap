import {
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Icon,
    Input,
    Stack,
    useColorModeValue
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, Link as RouterLink, useLocation } from "react-router-dom"
import { categoryData } from '../mocks/CategoryMock';
import React, { useState } from "react";
import AddButton from '../components/Buttons/AddButton';

function InfoBadge(props) {
    return (
        <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='blue'>
                {props.text}
            </Badge>
        </Box>
    );
}

export default function EditCategoryModerator() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { categoryId } = state;

    console.log(categoryId)
    const [value, setValue] = React.useState('')

    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const labelColor = useColorModeValue('gray.600', 'gray.200');
    const inputColor = useColorModeValue('gray.100', 'gray.50')
    const subBoxColor = useColorModeValue('gray.600', 'gray.600');

    function onSubmit(data) {
        let obj = JSON.stringify(data, null, 2)
        //obj.isGlobal = !obj.isGlobal;
        alert(obj);
        navigate('/moderatorpanel/#categories')
    }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm()

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    let Category = {"id": categoryId, "name": "none"}

    const getData = () => {
        //get data from server
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
                minH={'100vh'}
                justify={'center'}
            >
                <Stack spacing={5} mx={'auto'} maxW={'700px'} w={'90%'} py={9} px={0}>
                    <Button alignSelf={"flex-start"} position="absolute" variant={"outline"}
                        as={RouterLink} to="/moderatorpanel/#categories">
                        <ArrowBackIcon />
                    </Button>
                    <Stack align={'center'} pt={6}>
                        <Heading fontSize={'4xl'} textAlign={'center'} color={'gray.100'}>
                            Edit Category
                        </Heading>
                    </Stack>

                    <InfoBadge text="1. Informations" />

                    <Box
                        rounded={'lg'}
                        bg={boxColor}
                        boxShadow={'lg'}
                        p={8}>

                        <Stack spacing={5}>
                            <FormControl>
                                <FormLabel htmlFor='name' color={labelColor}>Id</FormLabel>
                                <Input readOnly textColor={'gray.500'} value={Category.id}
                                {...register("id", {
                                    required: "This is required"
                                })}/>
                            </FormControl>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel htmlFor='name' color={labelColor}>Name</FormLabel>
                                <Input id='name' type="text" color={inputColor} bgColor={subBoxColor}
                                    placeholder='type down a category'
                                    defaultValue={Category.name}
                                    {...register("name", {
                                        required: "This is required",
                                        minLength: { value: 3, message: "Minimum length should be 4" }
                                    })} />
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </Box>
                    <Stack spacing={10} pt={2}>
                        <AddButton
                            loadingText="Submitting"
                            size="lg"
                            width={'99%'}
                            alignSelf={'center'}
                            type="submit"
                            isLoading={isSubmitting}
                        >
                            Edit Category
                        </AddButton>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    );
}
