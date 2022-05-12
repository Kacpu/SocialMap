import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq} from "./baseRequetsts";

async function getLike(id) {
    const query = `${serverUrl}/like/${id}`;
    return await getReq(query);
}

async function getLikes(poiId = null, userId = null) {
    let query = `${serverUrl}/like`;
    if(poiId != null)
        query += `?poiId=${poiId}`;
    if(userId != null)
        query += `&userId=${userId}`;

    return await getReq(query);
}

async function addLike(like) {
    const query = `${serverUrl}/like`;
    return await addReq(query, like);
}

async function deleteLike(id) {
    const query = `${serverUrl}/like/${id}`;
    return await deleteReq(query);
}

export {getLike, getLikes, addLike, deleteLike}