import React from "react";
import './App.css';
import Map from "./components/Map/Map";
import NavBar from "./components/NavBar/NavBar";
import CustomFooter from "./components/Footer/Footer";
import {Routes, Route} from "react-router-dom";
import './index.css';
import PrivatePage from "./Pages/AuthPages/PrivatePage";
import ApiTest from "./Pages/ApiTest";
import ContactUs from "./Pages/MainPages/ContactUs";
import AddPoint from "./Pages/PointPages/AddPoint";
import ModeratorPanel from "./Pages/ModeratorPages/ModeratorPanel";
import {Box, useColorModeValue} from '@chakra-ui/react';
import Login from "./Pages/AuthPages/Login";
import Signup from "./Pages/AuthPages/Signup";
import PasswordReset from "./Pages/AuthPages/PasswordReset";
import PrivateRoute from "./auth/PrivateRoute";
import ProfilePage from "./Pages/MainPages/ProfilePage";
import AddCategoryModerator from "./Pages/ModeratorPages/AddCategoryModerator";
import EditCategoryModerator from "./Pages/ModeratorPages/EditCategoryModerator";
import EditPoint from "./Pages/PointPages/EditPoint";
import ScrollToTop from "./tools/ScrollToTop";
import About from "./Pages/MainPages/About";
import PoiDetails from "./Pages/PointPages/PoiDetails";
import ModRoute from "./auth/ModRoute";

//Wczenisej bylo Route z Navbarem. Musialem to zmienic by footer ladnie sie kleil konca strony
function App() {
    return (
        <React.Fragment>
            <div className="BodyDiv">
                <NavBar/>
                <Box className="MainContent" bgColor={useColorModeValue('gray.700', 'gray.800')}>
                    <ScrollToTop>
                        <Routes>
                            <Route path='/'
                                   element={<Map diplayMarkers={true} showSearch={true} mapCenter={[52.22983, 21.01173]}
                                                 zoom={12} diplayCenterMarker={false} draggable={false}/>}/>
                            <Route path='/signup' element={<Signup/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/reset' element={<PasswordReset/>}/>
                            <Route path='/point/:id'
                                   element={
                                       <PrivateRoute>
                                           <PoiDetails/>
                                       </PrivateRoute>
                                   }/>
                            <Route path='/moderatorpanel'
                                   element={
                                       <ModRoute>
                                           <ModeratorPanel/>
                                       </ModRoute>
                                   }/>
                            <Route path='/moderatorpanel/addcategory'
                                   element={
                                       <ModRoute>
                                           <AddCategoryModerator/>
                                       </ModRoute>
                                   }/>
                            <Route path='/moderatorpanel/editcategory'
                                   element={
                                       <ModRoute>
                                           <EditCategoryModerator/>
                                       </ModRoute>
                                   }/>
                            <Route path='/addpoint'
                                   element={
                                       <PrivateRoute>
                                           <AddPoint/>
                                       </PrivateRoute>
                                   }/>
                            <Route path='/editpoint'
                                   element={
                                       <PrivateRoute>
                                           <EditPoint/>
                                       </PrivateRoute>
                                   }/>
                            <Route path='/about' element={<About/>}/>
                            <Route path='/contact' element={<ContactUs/>}/>
                            <Route path='/profile'
                                   element={
                                       <PrivateRoute>
                                           <ProfilePage/>
                                       </PrivateRoute>
                                   }
                            />
                        </Routes>
                    </ScrollToTop>
                </Box>
                <CustomFooter className="Footer"/>
            </div>
        </React.Fragment>
    );
}

export default App;
