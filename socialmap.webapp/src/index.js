import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
// import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter as Router} from "react-router-dom";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

export const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

// Optional - This will update account state if a user signs in from another tab or window
msalInstance.enableAccountStorageEvents();

msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        const account = event.payload.account;
        msalInstance.setActiveAccount(account);
    }
});

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ChakraProvider>
                <App pca={msalInstance} />
            </ChakraProvider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
