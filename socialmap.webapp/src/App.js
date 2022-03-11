import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import Bar from "./components/Bar";
import Footer from "./components/Footer";


function App() {
  return (
      <div>
        <Bar />
        <Map />
        <Footer />
      </div>
  );
}

export default App;
