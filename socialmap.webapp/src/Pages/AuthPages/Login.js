import LoginForm from "../../auth/LoginForm";
import React from "react";
import {Box, Flex} from "@chakra-ui/react";

export default function Login() {
    return (
        <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <LoginForm />
        </Flex>
    );
}