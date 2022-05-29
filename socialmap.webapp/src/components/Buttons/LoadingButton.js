import {Button} from "@chakra-ui/react";
import React from "react";

export default function LoadingButton(props) {
    return(
        <Button width={"100%"} isLoading={true} variant={"ghost"} {...props}></Button>
    );
}