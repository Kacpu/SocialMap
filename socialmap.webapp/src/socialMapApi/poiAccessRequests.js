import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq, updateReq} from "./baseRequetsts";

async function getPoiAccess(id) {
    const query = `${serverUrl}/poiAccess/${id}`;
    return await getReq(query);
}

async function getPoiAccesses(invitedUserId = null, poiId = null, issuerId = null, isAccepted = null) {
    let query = `${serverUrl}/poiAccess`;
    if(invitedUserId != null)
        query += `?invitedUserId=${invitedUserId}`;
    if(poiId != null)
        query += `&poiId=${poiId}`;
    if(issuerId != null)
        query += `&issuerId=${issuerId}`;
    if(isAccepted != null)
        query += `&isAccepted=${isAccepted}`;

    return await getReq(query);
}

async function addPoiAccess(poiAccess) {
    const query = `${serverUrl}/poiAccess`;
    return await addReq(query,poiAccess);
}

async function updatePoiAccess(id, poiAccess) {
    const query = `${serverUrl}/poiAccess/${id}`;
    return await updateReq(query,poiAccess);
}

async function deletePoiAccess(id) {
    const query = `${serverUrl}/poiAccess/${id}`;
    return await deleteReq(query);
}

export {getPoiAccess, getPoiAccesses, addPoiAccess, updatePoiAccess, deletePoiAccess}