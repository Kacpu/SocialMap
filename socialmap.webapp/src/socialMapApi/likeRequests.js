import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq} from "./baseRequetsts";

async function getLike(id, signal = null) {
    const query = `${serverUrl}/like/${id}`;
    return await getReq(query, signal);
}

async function getLikes(signal = null, poiId = null) {
    let query = `${serverUrl}/like`;
    if(poiId != null){
        query += `?poiId=${poiId}`;
    }

    return await getReq(query, signal);
}

async function addLike(signal = null, like) {
    const query = `${serverUrl}/like`;
    return await addReq(query, like, signal);
}

async function deleteLike(id, signal = null) {
    const query = `${serverUrl}/like/${id}`;
    return await deleteReq(query, signal);
}

export {getLike, getLikes, addLike, deleteLike}