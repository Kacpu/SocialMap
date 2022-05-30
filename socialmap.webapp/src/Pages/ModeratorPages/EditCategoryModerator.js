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
    Input, Spinner,
    Stack,
    useColorModeValue, useToast
} from '@chakra-ui/react';
import {useForm} from 'react-hook-form'
import {ArrowBackIcon} from '@chakra-ui/icons';
import {useNavigate, Link as RouterLink, useLocation} from "react-router-dom"
import {categoryData} from '../../mocks/CategoryMock';
import React, {useEffect, useState} from "react";
import AddButton from '../../components/Buttons/AddButton';
import {addCategory, getCategory, updateCategory} from "../../socialMapApi/categoryRequests";
import {errorToast, successToast} from "../../components/Toasts/ToastUtil";
import {getPoi} from "../../socialMapApi/poiRequests";


export default function EditCategoryModerator() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {categoryId, beforeSite} = state || {};
    const toast = useToast();
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(true);

    const boxColor = useColorModeValue('gray.600', 'gray.700');
    const labelColor = useColorModeValue('gray.600', 'gray.200');
    const inputColor = useColorModeValue('gray.100', 'gray.50')
    const subBoxColor = useColorModeValue('gray.600', 'gray.600');

    useEffect(() => {
        const ac = new AbortController();
        (async () => {
            const res = await getCategory(categoryId, ac.signal);
            if (res?.ok) {
                setCategory(res.data);
                setLoading(false);
            }
        })();
        return () => {
            ac.abort("abort from edit category")
        }
    }, [])

    async function onSubmit(data) {
        const res = await updateCategory(category.id, data)
        if (res?.ok) {
            successToast(toast, "edited", "category")
        } else {
            errorToast(toast)
        }
        handleBack();
    }

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
    } = useForm()

    function handleBack() {
        navigate(!beforeSite ? "/" : beforeSite);
    }

    //let category = {"id": categoryId, "name": "none"}

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex justify={'center'}>
                <Stack spacing={5} mx={'auto'} maxW={'700px'} w={'90%'} py={9} px={0}>
                    <Button alignSelf={"flex-start"} position="absolute" variant={"outline"}
                            onClick={() => handleBack()}>
                        <ArrowBackIcon/>
                    </Button>
                    <Stack align={'center'} pt={6}>
                        <Heading fontSize={'4xl'} textAlign={'center'} color={'gray.100'}>
                            Edit Category
                        </Heading>
                    </Stack>

                    {loading ? (
                        <Flex pt={30} alignItems={"center"} justifyContent={"center"}>
                            <Spinner size={"lg"}/>
                        </Flex>
                    ) : (
                        <React.Fragment>
                            <InfoBadge text="1. Informations"/>

                            <Box
                                rounded={'lg'}
                                bg={boxColor}
                                boxShadow={'lg'}
                                p={8}>

                                <Stack spacing={5}>
                                    <FormControl>
                                        <FormLabel htmlFor='name' color={labelColor}>Id</FormLabel>
                                        <Input readOnly textColor={'gray.500'} value={category.id}
                                               {...register("id", {
                                                   required: "This is required"
                                               })}/>
                                    </FormControl>
                                    <FormControl isInvalid={errors.name}>
                                        <FormLabel htmlFor='name' color={labelColor}>Name</FormLabel>
                                        <Input id='name' type="text" color={inputColor} bgColor={subBoxColor}
                                               placeholder='type down a category'
                                               defaultValue={category.name}
                                               {...register("name", {
                                                   required: "This is required",
                                                   minLength: {value: 3, message: "Minimum length should be 4"}
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
                        </React.Fragment>
                    )}
                </Stack>
            </Flex>
        </form>
    );
}

function InfoBadge(props) {
    return (
        <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='blue'>
                {props.text}
            </Badge>
        </Box>
    );
}
