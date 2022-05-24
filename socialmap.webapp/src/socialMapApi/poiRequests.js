import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq, updateReq} from "./baseRequetsts";

async function getPoi(id, signal = null) {
    const query = `${serverUrl}/poi/${id}`;
    return await getReq(query, signal);
}

async function getPois(signal = null, creatorId = null, isGlobal = null, isAccepted = null) {
    let query = `${serverUrl}/poi`;
    if (creatorId != null)
        query += `?creatorId=${creatorId}`;
    if (isGlobal != null)
        query += `&isGlobal=${isGlobal}`;
    if (isAccepted != null)
        query += `&isAccepted=${isAccepted}`;

    return await getReq(query, signal);
}

async function getPoisForUser(signal = null, withUser = false, withAccessed = false,
                              withInvited = false, withGlobal = false,) {
    let query = `${serverUrl}/poi/user?withGlobal=${withGlobal}&withUser=${withUser}&withAccessed=${withAccessed}`
        + `&withInvited=${withInvited}`;
    return await getReq(query, signal);
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

export {getPoi, getPois, getPoisForUser, addPoi, updatePoi, deletePoi}