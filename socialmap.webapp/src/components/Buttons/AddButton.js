import {Button} from "@chakra-ui/react";

export default function AddButton(props) {
    return (
        <Button bg={'blue.600'}
                color={'white'}
                _active={{
                    bg: 'blue.700',
                }}
                _hover={{
                    bg: 'blue.500',
                }}
                {...props}></Button>
    );
}