import {Box, Button, Input, InputGroup} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useState} from "react";

export default function SearchInput(props) {

    const [inputValue, setInputValue] = useState();

    function checkKey(event){
        if(event.key == 'Enter'){
            props.findFromInput(inputValue);
        }
    }

    function handle(event){
        setInputValue(event.target.value);
        if(event.target.value.length == 0){
            props.findFromInput(event.target.value);
        }
        //console.log(event.target.value)
    }

    return (
        <Box>
            <InputGroup>
                <Input bg={"gray.800"} placeholder={props.placeholder} onChange={handle} onKeyDown={checkKey}></Input>
                <Button leftIcon={<SearchIcon></SearchIcon>} width={"120px"} ml={"2"}
                        variant={"outline"} onClick={() => props.findFromInput(inputValue)}
                >Find</Button>
            </InputGroup>
        </Box>
    );

}