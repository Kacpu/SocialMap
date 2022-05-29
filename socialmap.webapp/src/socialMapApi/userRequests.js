import {serverUrl} from "./requestsParams";
import {getReq} from "./baseRequetsts";

async function getUser(signal = null, email = null, uuid = null, id = null) {
    let query;

    if(uuid != null) {
        query = `${serverUrl}/appuser?uuid=${uuid}`;
    }
    else if(email != null) {
        query = `${serverUrl}/appuser?email=${email}`;
    }
    else if(id != null){
        query = `${serverUrl}/appuser/${id}`;
    }
    else {
        return {ok: false, status: 404};
    }

    return await getReq(query, signal);
}

async function getUsers(signal = null, name = null) {
    let query = `${serverUrl}/appuser`;

    if(name != null)
        query += `?name=${name}`;

    return await getReq(query, signal);
}

export {getUser, getUsers}