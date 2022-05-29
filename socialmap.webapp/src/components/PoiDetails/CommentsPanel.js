import {Button, HStack, Input, Stack, Text} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import CommentsList from "./CommentsList";
import React, {useEffect, useState} from "react";
import {addComment, getComments} from "../../socialMapApi/commentRequests";

export default function CommentsPanel(props) {
    const [newCommentContentValue, setNewCommentContentValue] = useState("");
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [reloadComments, setReloadComments] = useState(false);
    const ac = new AbortController();

    useEffect(() => {
        (async () => {
            const res = await getComments(ac.signal, props.poiId);
            if (res?.ok) {
                setComments(res.data);
                setIsLoading(false);
            }
        })();
        return () => {
            ac.abort("abort from comments list")
        }
    }, [reloadComments])

    const handleChangeNewCommentInputValue = (event) => setNewCommentContentValue(event.target.value);

    const checkEnter = async (event) => {
        if(event.key === 'Enter'){
            await handleAddComment(newCommentContentValue);
        }
    }

    const handleAddComment = async () => {
        if(newCommentContentValue.trim() === ""){
            return;
        }
        setIsAdding(true);
        const res = await addComment({poiId: props.poiId, content: newCommentContentValue}, ac.signal);
        if (res?.ok) {
            //let newList = [res.data, ...comments];
            //setComments(newList);
            setReloadComments(prevState => !prevState);
            setIsAdding(false);
            setNewCommentContentValue("");
        }
    }

    return(
        <Stack width={"100%"} mb={"50px"}>
            <HStack mb={"10px"}>
                <Input placeholder={"share your thoughts!"}
                       value={newCommentContentValue}
                       onChange={handleChangeNewCommentInputValue}
                       onKeyDown={checkEnter}/>
                <Button gap={"5px"} onClick={handleAddComment} isLoading={isAdding}>
                    <SmallAddIcon/>
                    <Text display={{base: "none", md: "block"}}>Comment</Text>
                </Button>
            </HStack>
            <Stack mt={"10px"} spacing={0}>
                <Text color={"gray.300"}>Comments:</Text>
                <CommentsList
                    poiId={props.poiId}
                    isLoading={isLoading}
                    comments={comments}/>
            </Stack>
        </Stack>
    );
}