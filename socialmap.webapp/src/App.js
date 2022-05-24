import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import CustomFooter from "./components/Footer";
import {Routes, Route} from "react-router-dom";
import './index.css';
import PrivatePage from "./Pages/PrivatePage";
import ApiTest from "./Pages/ApiTest";
import ContactUs from "./Pages/ContactUs";
import AddPoint from "./Pages/PointPages/AddPoint";
import ModeratorPanel from "./Pages/ModeratorPanel";
import {Box, useColorModeValue} from '@chakra-ui/react';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PasswordReset from "./Pages/PasswordReset";
import PrivateRoute from "./auth/PrivateRoute";
import ProfilePage from "./Pages/ProfilePage";
import AddCategoryModerator from "./Pages/AddCategoryModerator";
import EditCategoryModerator from "./Pages/EditCategoryModerator";
import EditPoint from "./Pages/PointPages/EditPoint";
import ScrollToTop from "./tools/ScrollToTop";
import About from "./Pages/About";

//Wczenisej bylo Route z Navbarem. Musialem to zmienic by footer ladnie sie kleil konca strony
function App() {
    return (
        <React.Fragment>
            <div className="BodyDiv">
                <NavBar/>
                <Box className="MainContent" bgColor={useColorModeValue('gray.700', 'gray.800')}>
                    <ScrollToTop>
                    <Routes>
                        <Route path='/' element={<Map diplayMarkers={true} showSearch={true} mapCenter={[52.22983, 21.01173]} zoom={12} diplayCenterMarker={false} draggable={false}/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/reset' element={<PasswordReset/>}/>
                        <Route path='/moderatorpanel' element={<ModeratorPanel/>}/>
                        <Route path='/moderatorpanel/addcategory' element={<AddCategoryModerator />} />
                        <Route path='/moderatorpanel/editcategory' element={<EditCategoryModerator />} />
                        <Route path='/addpoint' element={<AddPoint/>}/>
                        <Route path='/editpoint' element={<EditPoint/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/contact' element={<ContactUs/>}/>
                        <Route path='/private'
                               element={
                                   <PrivateRoute>
                                       <PrivatePage/>
                                   </PrivateRoute>
                               }
                        />
                        <Route path='/profile'
                               element={
                                   <PrivateRoute>
                                       <ProfilePage/>
                                   </PrivateRoute>
                               }
                        />
                        <Route path='/apitest' element={<ApiTest/>}/>
                    </Routes>
                    </ScrollToTop>
                </Box>
                <CustomFooter className="Footer"/>
            </div>
        </React.Fragment>
    );
}

export default App;
