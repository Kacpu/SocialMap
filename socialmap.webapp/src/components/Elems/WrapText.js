import {Text} from "@chakra-ui/react";

const WrapText = ({children, ...style}) =>
    <Text wordBreak={"normal"} overflowWrap={"anywhere"} {...style}>{children}</Text>;

    export default WrapText;