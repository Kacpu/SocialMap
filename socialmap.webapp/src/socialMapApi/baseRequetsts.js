import {headers as paramHeaders, methods} from "./requestsParams";

async function getReq(query) {
    try {
        const response = await fetch(query);
        return response.ok ? await response.json() : null;
    } catch(e) {
        console.error(e);
        return null;
    }
}

async function addReq(query, addObj) {
    try {
        const response = await fetch(query, {
            method: methods.post,
            headers: paramHeaders,
            body: JSON.stringify(addObj)
        });
        return response.ok ? await response.json() : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function updateReq(query, updateObj) {
    try {
        const response = await fetch(query, {
            method: methods.put,
            headers: paramHeaders,
            body: JSON.stringify(updateObj)
        });
        return response.ok ? await response.json() : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function deleteReq(query) {
    try {
        const response = await fetch(query, {
            method: methods.delete,
            headers: {
                Authorization: paramHeaders.Authorization
            }
        });
        return response.status === 204 ? "deleted" : null;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export {getReq, addReq, updateReq, deleteReq}