import React from "react";
import {
    Stack,
    Text,
    Link,
    useColorModeValue,
} from "@chakra-ui/react";

export default function LeftBar(props) {
    const linkColor = useColorModeValue('gray.400', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.50', 'white');

    return(
        <div>
            {/* <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: props.isOpen ? "block" : "none", md: "flex" }}
                width={{ base: 0, md: 0}}
                alignItems="left"
                flexGrow={1}
                mt={{ base: 5, md: 0 }}
            >
                <Link color={linkColor} _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>Docs</Link>
                <Text>Examples</Text>
                <Text>Blog</Text>
            </Stack> */}
        </div>
    );
}