import React, {useEffect, useState} from 'react';
import {updateCommentSchema, createComment} from "../socialMapApi/schemas";
import {addComment, deleteComment, getComment, getComments, updateComment} from "../socialMapApi/commentRequests";
import {getCategories} from "../socialMapApi/categoryRequests";
import {addPoi, getPois} from "../socialMapApi/poiRequests";

export default function ApiTest() {
    const [like, setLike] = useState('');
    const [poi, setPoi] = useState('');
    const [comment, setComment] = useState(createComment);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await fetch(`${serverUrl}/like/1`, {
    //                 headers: {
    //                     Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    //                 },
    //             });
    //             const responseData = await response.json();
    //             console.log(responseData)
    //             setLike(responseData);
    //         } catch (e) {
    //             setLike('żeś się nie zalogował nieładnie');
    //             console.error(e);
    //         }
    //     })();
    // }, [getAccessTokenSilently, serverUrl]);


    const getCommentSubmit = async () => {
        const res = await getComment(43);
        setComment(res);
        console.log(res);
    };

    const getCommentsSubmit = async () => {
        const res = await getPois();
        setComment(res);
        console.log(res);
    };

    const getCategoriesSubmit = async () => {
        const res = await getCategories();
        setComment(res);
        console.log(res);
    };

    // useEffect(() => {
    //     //const newo = {...comment, poiId: 1};
    //     const newo = {poiId: 23};
    //     setComment(prev => ({...prev, ...newo}))
    // }, [])
    //  useEffect(() => { setComment(prev => ({...prev, content: "halu"})) }, [])
    // //useEffect(() => { console.log(comment) }, [comment])

    const addCommentSubmit = async () => {
        console.log("wysyłam: ");
        console.log(comment);
        const res = await addPoi({
            name: "fajne poi",
            x: 1110,
            y: 102,
            description: "cdcdcdcdc",
            isGlobal: false,
            categoriesId: []
        });
        console.log(res);
        setComment(res);
    };

    const updateCommentSubmit = async () => {
        updateCommentSchema.content = "helloupdate224";

        const res = await updateComment(43, updateCommentSchema);
        console.log(res);
        setComment(res);
    };

    const deleteCommentSubmit = async () => {
        const res = await deleteComment(45);
        console.log(res);
        setComment(res);
    };

    return (
        <div style={{marginLeft: '50px', marginTop: '20px'}}>
            <span>GET Like at render (auth)</span>
            <div>
                {JSON.stringify(like, null, 5)}
            </div>
            <br/>
            <button type={"button"} onClick={getCommentSubmit} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                GET Comment (not auth)
            </button>
            <br/>
            <button type={"button"} onClick={getCommentsSubmit} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                GET Comments
            </button>
            <br/>
            <button type={"button"} onClick={addCommentSubmit} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                POST Comment (auth)
            </button>
            <br/>
            <button type={"button"} onClick={updateCommentSubmit} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                UPDATE Comment
            </button>
            <br/>
            <button type={"button"} onClick={deleteCommentSubmit} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                DELETE Comment
            </button>
            <br/>
            <button type={"button"} onClick={getCategoriesSubmit} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                GET Categories
            </button>
            <div>
                {JSON.stringify(comment, null, 5)}
            </div>
            <br/>
        </div>
    );
}