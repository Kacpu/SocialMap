import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom";
import theme from "./theme";

ReactDOM.render(
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ChakraProvider>,
    document.getElementById("root")
);
