import React, {useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {useAccount, useMsal} from "@azure/msal-react";
import {msalInstance} from "../index";
import {socialMapApiScopes} from "../authConfig";
import {callApi, callApiWithToken} from "../api/SocialMapApi";
import {BrowserAuthError, InteractionRequiredAuthError} from "@azure/msal-browser";
import {Navigate, useNavigate} from "react-router-dom";

export default function ApiTest() {
    const [like, setLike] = useState('');
    const [poi, setPoi] = useState('');
    const [comment, setComment] = useState('');

    const {inProgress} = useMsal();
    const account = useAccount();
    const navigate = useNavigate();

    const getAccessToken = async () => {
        const request = {
            scopes: socialMapApiScopes.read,
        };

        if (inProgress === "none") {
            return await msalInstance.acquireTokenSilent(request).catch(async (error) => {
                console.log(error);
                if (inProgress === "none") {
                    return await msalInstance.acquireTokenPopup(request).catch(error => {
                        console.log(error);
                    });
                }
            });
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const token = await getAccessToken();
                const response = await callApiWithToken(token.accessToken, "like/1");
                console.log(response);
                setLike(response);
            } catch (error) {
                setLike('żeś się nie zalogował nieładnie');
                console.error(error);
            }
        })();
    }, []);

    const getPOI = async () => {
        try {
            const response = await callApi("poi/2")
            console.log(response)
            setPoi(response);
        } catch (e) {
            console.error(e);
        }
    };

    const getComment = async () => {
        try {
            const token = await getAccessToken();
            console.log(token);
            const response = await callApiWithToken(token.accessToken, "comment/2");
            console.log(response)
            setComment(response);
        } catch (e) {
            setComment('żeś się nie zalogował nieładnie');
            console.error(e);
        }
    };

    return (
        <div style={{marginLeft: '50px', marginTop: '20px'}}>
            <span>GET Like at render (auth)</span>
            <div>
                {JSON.stringify(like, null, 5)}
            </div>
            <br/>
            <button type={"button"} onClick={getPOI} style={{margin: '10px', background: 'bisque', padding: '5px'}}>
                GET POI (not auth)
            </button>
            <div>
                {JSON.stringify(poi, null, 5)}
            </div>
            <br/>
            <button type={"button"} onClick={getComment} style={{margin: '10px', background: 'bisque', padding: '5px'}}>
                GET Comment (auth)
            </button>
            <div>
                {JSON.stringify(comment, null, 5)}
            </div>
            <br/>
        </div>
    );
}