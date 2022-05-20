
import {Button} from "@chakra-ui/react";

export default function WarningButton(props){
    return(
        <Button bg={"red.500"} _hover={{ backgroundColor: "red.600"}}  {...props}></Button>
    );
}