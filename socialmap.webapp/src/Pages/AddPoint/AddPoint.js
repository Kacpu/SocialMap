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
  Textarea
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import Map from '../../components/Map/Map'
import { withAuthenticationRequired } from '@auth0/auth0-react';


function InfoBadge(props) {
  return (
    <Box display='flex' alignItems='baseline'>
      <Badge borderRadius='full' px='2' colorScheme='teal'>
        {props.text}
      </Badge>
    </Box>
  );
}


function AddPoint() {


  function onSubmit(data) {
    let obj = JSON.stringify(data, null, 2)
    alert(obj);
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
                <Input id='name' type="text" placeholder='wonderfull name'
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
                  <Textarea id='description' placeholder="amazing plot"
                    {...register("description", {
                      required: "This is required",
                      minLength: { value: 5, message: "Minimum length should be 5" }
                    })} />
                </InputGroup>
                <FormErrorMessage>
                  {errors.description && errors.description.message}
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
                <FormLabel htmlFor='location'>Location</FormLabel>
                <InputGroup>
                  <Input id="location" type="text" placeholder='find location' />
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
              <Text>
                ul. Sample 123
              </Text>
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

export default withAuthenticationRequired(AddPoint, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});