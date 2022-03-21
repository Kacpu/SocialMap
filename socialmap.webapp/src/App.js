import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import CustomFooter from "./components/Footer";
import {Routes, Route} from "react-router-dom";
import './index.css';
import PrivatePage from "./components/PrivatePage";

function App() {
    return (
        <React.Fragment>
            <Routes>
                <Route element={<NavBar />}>
                    <Route path='/' element={<Map />} />
                    <Route path='/private' element={<PrivatePage />}/>
                </Route>
            </Routes>
            <CustomFooter/>
        </React.Fragment>
    );
}

export default App;
