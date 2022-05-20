
import {Button} from "@chakra-ui/react";

export default function AcceptButton(props){
    return(
        <Button bg={"green.500"} _hover={{ backgroundColor: "green.600"}} {...props}></Button>
    );
}