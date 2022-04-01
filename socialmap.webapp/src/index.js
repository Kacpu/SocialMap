import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import {Auth0Provider} from "@auth0/auth0-react";
import {BrowserRouter} from "react-router-dom";
import theme from "./theme";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
        audience={audience}
    >
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ChakraProvider>
    </Auth0Provider>,
    document.getElementById("root")
);
