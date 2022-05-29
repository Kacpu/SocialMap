import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq, updateReq} from "./baseRequetsts";

async function getPoiAccess(id, signal = null) {
    const query = `${serverUrl}/poiAccess/${id}`;
    return await getReq(query, signal);
}

async function getPoiAccesses(signal = null, invitedUserId = null, poiId = null,
                              issuerId = null, isAccepted = null) {
    let query = `${serverUrl}/poiAccess`;
    let mark = "?";
    if(invitedUserId != null){
        query += mark + `invitedUserId=${invitedUserId}`;
        mark = "&"
    }
    if(poiId != null) {
        query += mark + `poiId=${poiId}`;
        mark = "&"
    }
    if(issuerId != null) {
        query += mark + `issuerId=${issuerId}`;
        mark = "&"
    }
    if(isAccepted != null) {
        query += mark + `isAccepted=${isAccepted}`;
    }

    return await getReq(query, signal);
}

async function getPoiAccessesForUser(signal = null, poiId = null, isAccepted = null, asIssuer= null) {
    let query = `${serverUrl}/poiAccess/user`;
    let mark = "?";
    if(poiId != null) {
        query += mark + `poiId=${poiId}`;
        mark = "&"
    }
    if(isAccepted != null) {
        query += mark + `isAccepted=${isAccepted}`;
    }
    if(asIssuer != null) {
        query += mark + `issuerId=${asIssuer}`;
    }

    return await getReq(query, signal);
}

async function addPoiAccess(poiAccess) {
    const query = `${serverUrl}/poiAccess`;
    return await addReq(query, poiAccess);
}

async function updatePoiAccess(id, poiAccess) {
    const query = `${serverUrl}/poiAccess/${id}`;
    return await updateReq(query, poiAccess);
}

async function deletePoiAccess(id) {
    const query = `${serverUrl}/poiAccess/${id}`;
    return await deleteReq(query);
}

export {getPoiAccess, getPoiAccesses, getPoiAccessesForUser, addPoiAccess, updatePoiAccess, deletePoiAccess}