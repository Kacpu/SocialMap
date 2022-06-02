import {headers as paramHeaders, methods} from "./requestsParams";
import Userfront from "@userfront/react";

Userfront.init("xbr78p4n");

async function getReq(query, signal = null) {
    let headers = {}

    if(Userfront.tokens.accessToken !== undefined){
        headers = {
            Authorization: paramHeaders.Authorization
        };
    }
    try {
        const response = await fetch(query, {
            method: methods.get,
            headers: headers,
            signal: signal
        });
        return response.ok ? {ok: response.ok, data: await response.json()} : {ok: response.ok, status: response.status};
    } catch(e) {
        console.error(query + " " + e);
        return null;
    }
}

async function addReq(query, addObj, signal = null) {
    try {
        const response = await fetch(query, {
            signal: signal,
            method: methods.post,
            headers: paramHeaders,
            body: JSON.stringify(addObj),
        });
        return response.ok ? {ok: response.ok, data: await response.json()} : {ok: response.ok, status: response.status};
    } catch (e) {
        console.error(query + " " + e);
        return null;
    }
}

async function updateReq(query, updateObj, signal= null) {
    try {
        return await fetch(query, {
            signal: signal,
            method: methods.put,
            headers: paramHeaders,
            body: JSON.stringify(updateObj)
        });
    } catch (e) {
        console.error(query + " " + e);
        return null;
    }
}

async function deleteReq(query, signal = null) {
    try {
        return await fetch(query, {
            method: methods.delete,
            headers: {
                Authorization: paramHeaders.Authorization
            },
            signal: signal
        });
    } catch (e) {
        console.error(query + " " + e);
        return null;
    }
}

export {getReq, addReq, updateReq, deleteReq}