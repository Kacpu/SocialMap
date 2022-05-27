import {serverUrl} from "./requestsParams";
import {getReq} from "./baseRequetsts";

async function getUser(id, signal = null,) {
    const query = `${serverUrl}/appuser/${id}`;
    return await getReq(query, signal);
}

async function getUsers(signal = null, searchInput = null,uuid = null) {
    let query = `${serverUrl}/appuser`;
    if(searchInput != null)
        query += `?searchInput=${searchInput}`;
    if(uuid != null)
        query += `?uuid=${uuid}`;

    return await getReq(query, signal);
}

export {getUser, getUsers}