const serverUrl = "https://localhost:5001"

export const callApiWithToken = async(accessToken, resource) => {
    return fetch(`${serverUrl}/${resource}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}

export const callApi = async(resource) => {
    return fetch(`${serverUrl}/${resource}`)
        .then(response => response.json())
        .catch(error => console.log(error));
}