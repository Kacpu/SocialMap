import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq, updateReq} from "./baseRequetsts";

async function getPoi(id) {
    const query = `${serverUrl}/poi/${id}`;
    return await getReq(query);
}

async function getPois(creatorId= null, isGlobal = null, isAccepted = null) {
    let query = `${serverUrl}/poi`;
    if(creatorId != null)
        query += `?creatorId=${creatorId}`;
    if(isGlobal != null)
        query += `&isGlobal=${isGlobal}`;
    if(isAccepted != null)
        query += `&isAccepted=${isAccepted}`;

    return await getReq(query);
}

async function addPoi(poi) {
    const query = `${serverUrl}/poi`;
    return await addReq(query, poi);
}

async function updatePoi(id, poi) {
    const query = `${serverUrl}/poi/${id}`;
    return await updateReq(query, poi);
}

async function deletePoi(id) {
    const query = `${serverUrl}/poi/${id}`;
    return await deleteReq(query);
}

export {getPoi, getPois, addPoi, updatePoi, deletePoi}