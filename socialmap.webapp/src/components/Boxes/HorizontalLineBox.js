import {Box} from "@chakra-ui/react";

export default function HorizontalLineBox(props){
    return(
        <Box height={0.5} border={'none'} bg={'gray.600'}
             boxShadow={'0 3px 10px -0.5px gray'} {...props}>

        </Box>
    )
}