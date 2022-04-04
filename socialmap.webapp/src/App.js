import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import CustomFooter from "./components/Footer";
import {Routes, Route} from "react-router-dom";
import './index.css';
import PrivatePage from "./Pages/PrivatePage";
import ApiTest from "./Pages/ApiTest";
import { MsalProvider } from "@azure/msal-react";
import PrivateRoute from "./auth/PrivateRoute";

function App({ pca }) {
    return (
        <MsalProvider instance={pca}>
            <React.Fragment>
                <Routes>
                    <Route element={<NavBar />}>
                        <Route path='/' element={<Map />} />
                        <Route
                            path="/private"
                            element={
                                <PrivateRoute>
                                    <PrivatePage />
                                </PrivateRoute>
                            }
                        />
                        <Route path='/apitest' element={<ApiTest />} />
                    </Route>
                </Routes>
                <CustomFooter/>
            </React.Fragment>
        </MsalProvider>
    );
}

export default App;
