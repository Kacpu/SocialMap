import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import CustomFooter from "./components/Footer";
import './index.css';

function App() {
  return (
    <div>
        <NavBar/>
        <Map />
        <CustomFooter />
    </div>
  );
}

export default App;
