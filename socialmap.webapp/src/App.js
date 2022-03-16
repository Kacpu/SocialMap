import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import CustomFooter from "./components/Footer";

import 'antd/dist/antd.css';
import './index.css';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

/*
Header - Naglowek (navbar, itp)
Content - Zawartosc (mapa, itp)
Footer - Stopka (autorzy)
*/

function App() {
  return (
    <div>
      {/* <Layout className="layout">
        <Header> 
          <NavBar />
        </Header>
        <Content> */}
        <NavBar/>
        <Map />
        {/* </Content>
        <Footer style={{ textAlign: 'center' }}>
          <CustomFooter></CustomFooter>  
        </Footer>
      </Layout> */}
    </div>
  );
}

export default App;
