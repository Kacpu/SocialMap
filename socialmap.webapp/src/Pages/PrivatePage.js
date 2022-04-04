import React from 'react';
import { useMsalAuthentication } from "@azure/msal-react";
import {InteractionType} from "@azure/msal-browser";
import {loginRequest} from "../authConfig";

// export function PrivatePage() {
//     const {login, result, error} = useMsalAuthentication(InteractionType.Popup, loginRequest);
//
//     return (
//         <React.Fragment>
//             {result && <p>Anyone can see this paragraph.</p>}
//         </React.Fragment>
//     );
// }

export default function PrivatePage() {
    return <h3>Hello world! I am private ^^</h3>
}