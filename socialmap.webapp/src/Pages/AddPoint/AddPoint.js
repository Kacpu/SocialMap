import {
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
import { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import Map from '../../components/Map/Map'

export default function AddPoint() {

  return (
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
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            1. Informations
          </Badge>
        </Box>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={5}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder='wonderfull name' />
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <InputGroup>
                <Textarea placeholder="amazing plot" />
              </InputGroup>
            </FormControl>
          </Stack>
        </Box>

        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            2. Pick location
          </Badge>
        </Box>

        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>

          <Stack spacing={5}>
            <FormControl id="location" isRequired>
              <FormLabel>Location</FormLabel>
              <InputGroup>
                <Input type="text" placeholder='find location' />
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

              <Map height={'400px'}/>
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
            alignSelf={'center'}>
            Add Point
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}