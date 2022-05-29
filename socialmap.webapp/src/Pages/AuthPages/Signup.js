import SignupForm from '../../auth/SignupForm'
import SignupFormCustom from "../../auth/SignupFormCustom";
import {Button, Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export default function Signup() {


    return (
        <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <SignupForm/>
        </Flex>
    );
}