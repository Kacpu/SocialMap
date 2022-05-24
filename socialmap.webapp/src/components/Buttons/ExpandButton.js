import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import {Box} from "@chakra-ui/react";

export default function ExpandButton(props) {
    const downIcon = () =>
        (
            <ChevronDownIcon w={10} h={10}/>
        );

    const upIcon = () =>
        (
            <ChevronUpIcon w={10} h={10}/>
        )

    return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            {props.isExpand ? upIcon() : downIcon()}
        </Box>
    );
}