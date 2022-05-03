import Userfront from "@userfront/react";
Userfront.init("xbr78p4n");

const serverUrl = process.env.REACT_APP_SERVER_URL;

const methods = {
    get: "GET",
    post: "POST",
    put: "PUT",
    delete: "DELETE"
}

const headers = {
    Authorization: `Bearer ${Userfront.tokens.accessToken}`,
    'Content-Type': 'application/json'
}

export {serverUrl, methods, headers}