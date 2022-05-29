import {Box, Button, Input, InputGroup} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {useState} from "react";

export default function SearchInput(props) {
    const [inputValue, setInputValue] = useState("");

    function checkKey(event){
        if(event.key == 'Enter'){
            props.findFromInput(inputValue);
            checkReset();
        }
    }

    function handle(event){
        setInputValue(event.target.value);
        if(event.target.value.length === 0 && props.findWithReset !== false){
            props.findFromInput(event.target.value);
        }
    }

    const onButtonClick = () => {
        props.findFromInput(inputValue)
        checkReset();
    }

    function checkReset(){
        if(props.withInputClear === true){
            setInputValue("");
        }
    }

    return (
        <Box>
            <InputGroup>
                <Input bg={"gray.800"}  placeholder={props.placeholder}
                       onChange={handle} onKeyDown={checkKey} value={inputValue} {...props.inputStyle}/>
                <Button leftIcon={<SearchIcon></SearchIcon>} width={"120px"} ml={"2"}
                        variant={"outline"} onClick={onButtonClick}
                >Find</Button>
            </InputGroup>
        </Box>
    );

}