import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq, updateReq} from "./baseRequetsts";

async function getComment(id, signal = null) {
    const query = `${serverUrl}/comment/${id}`;
    return await getReq(query, signal);
}

async function getComments(signal = null, poiId = null, userId = null) {
    let query = `${serverUrl}/comment`;
    if(poiId != null)
        query += `?poiId=${poiId}`;
    if(userId != null)
        query += `&userId=${userId}`;

    return await getReq(query, signal);
}

async function addComment(comment) {
    const query = `${serverUrl}/comment`;
    return await addReq(query, comment);
}

async function updateComment(id, comment) {
    const query = `${serverUrl}/comment/${id}`;
    return await updateReq(query, comment);
}

async function deleteComment(id) {
    const query = `${serverUrl}/comment/${id}`;
    return await deleteReq(query);
}

export {getComment, addComment, getComments, updateComment, deleteComment}