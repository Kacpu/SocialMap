import {serverUrl} from "./requestsParams";
import {addReq, deleteReq, getReq, updateReq} from "./baseRequetsts";

async function getCategory(id, signal = null,) {
    const query = `${serverUrl}/category/${id}`;
    return await getReq(query, signal);
}

async function getCategories(signal = null, name = null) {
    let query = `${serverUrl}/category`;
    if(name != null)
        query += `?name=${name}`;

    return await getReq(query, signal);
}

async function addCategory(category) {
    const query = `${serverUrl}/category`;
    return await addReq(query,category);
}

async function updateCategory(id, category) {
    const query = `${serverUrl}/category/${id}`;
    return await updateReq(query, category);
}

async function deleteCategory(id) {
    const query = `${serverUrl}/category/${id}`;
    return await deleteReq(query);
}

export {getCategory, getCategories, addCategory, updateCategory, deleteCategory}