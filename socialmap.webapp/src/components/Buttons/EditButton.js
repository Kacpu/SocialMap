
import {Button} from "@chakra-ui/react";

export default function EditButton(props){
    return(
        <Button bg={"yellow.500"} _hover={{ backgroundColor: "yellow.600"}}  {...props}></Button>
    );
}