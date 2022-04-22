import React, {useEffect, useState} from 'react';
import {useAuth0} from "@auth0/auth0-react";
import Userfront from "@userfront/react";

export default function ApiTest() {
    const [like, setLike] = useState('');
    const [poi, setPoi] = useState('');
    const [comment, setComment] = useState('');
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const {getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`${serverUrl}/like/1`, {
                    headers: {
                        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
                    },
                });
                const responseData = await response.json();
                console.log(responseData)
                setLike(responseData);
            } catch (e) {
                setLike('żeś się nie zalogował nieładnie');
                console.error(e);
            }
        })();
    }, [getAccessTokenSilently, serverUrl]);


    const getPOI = async () => {
        try {
            const response = await fetch(`${serverUrl}/poi/2`);
            const responseData = await response.json();
            console.log(responseData)
            setPoi(responseData);
        } catch (e) {
            console.error(e);
        }
    };

    const getComment = async () => {
        try {
            //const token = await getAccessTokenSilently();

            const response = await fetch(`${serverUrl}/comment/2`, {
                    headers: {
                        Authorization: `Bearer ${Userfront.tokens.accessToken}`,
                    },
                });

            const responseData = await response.json();
            console.log(responseData)
            setComment(responseData);
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
            <button type={"button"} onClick={getPOI} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                GET POI (not auth)
            </button>
            <div>
                {JSON.stringify(poi, null, 5)}
            </div>
            <br/>
            <button type={"button"} onClick={getComment} style={{margin: '10px', background: 'rosybrown', padding: '5px'}}>
                GET Comment (auth)
            </button>
            <div>
                {JSON.stringify(comment, null, 5)}
            </div>
            <br/>
        </div>
    );
}