import {
  FormErrorMessage,
  Badge,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Textarea,
  Select,
  Switch
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import Map from '../../components/Map/Map'
import { withAuthenticationRequired } from '@auth0/auth0-react';

import { categoryData } from '../../mocks/CategoryMock';



function InfoBadge(props) {
  return (
    <Box display='flex' alignItems='baseline'>
      <Badge borderRadius='full' px='2' colorScheme='teal'>
        {props.text}
      </Badge>
    </Box>
  );
}



export default function AddPoint() {

  console.log(categoryData)

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
    formState: { errors, isSubmitting },
  } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        minH={'100vh'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>

        <Stack spacing={5} mx={'auto'} maxW={'700px'} w={'100%'} py={12} px={0}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Add new interesting Point!
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              save your favourite place 🌎
            </Text>
          </Stack>

          <InfoBadge text="1. Informations" />

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={5}>

              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor='name' >Name</FormLabel>
                <Input id='name' type="text" placeholder='Give a wonderfull name'
                  {...register("name", {
                    required: "This is required",
                    minLength: { value: 3, message: "Minimum length should be 4" }
                  })} />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <InputGroup>
                  <Textarea id='description' placeholder="Write amazing description"
                    {...register("description", {
                      required: "This is required",
                      minLength: { value: 5, message: "Minimum length should be 5" }
                    })} />
                </InputGroup>
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.category}>
                <FormLabel htmlFor='category'>Category</FormLabel>
                <Select id='category' placeholder='Select category'
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
                <FormLabel htmlFor='isGlobal' mb='0'>Global</FormLabel>
                <Switch id='isGlobal'
                  {...register("isGlobal", {})} />
                <FormErrorMessage>
                  {errors.isGlobal && errors.isGlobal.message}
                </FormErrorMessage>
              </FormControl>

            </Stack>
          </Box>

          <InfoBadge text="2. Pick location" />

          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>

            <Stack spacing={5}>
              <FormControl>
                <FormLabel htmlFor='findLocation'>Location</FormLabel>
                <InputGroup>
                  <Input id="findLocation" type="text" placeholder='find location' />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        console.log("find place")
                      }>
                      <SearchIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Map height={'400px'} />

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
              bg={'blue.400'}
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