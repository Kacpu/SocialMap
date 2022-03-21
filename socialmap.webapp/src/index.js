import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Auth0Provider
        domain="socialmap.eu.auth0.com"
        clientId="f0LA0DiMMfMgKLJaBuhLunkBZ7n2x6rJ"
        redirectUri={window.location.origin}
    >
        <ChakraProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ChakraProvider>
    </Auth0Provider>,
    document.getElementById("root")
);
