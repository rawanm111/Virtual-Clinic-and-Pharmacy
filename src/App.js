import logoSvg from './logo.svg';
import './App.css';
//import LoginPagepharmacy from './Pages/LoginPagepharmacy';
//import PatientRegistrationHome from './Pages/PatientRegistrationHome';
//import StartPage from './Pages/StartPage';
//import PharmacistRegistrationHome from './Pages/PharmacistRegistrationHome';
import DoctorRegistrationHome from './Pages/DoctorRegistrationHome';
//import AdminHome from './Pages/AdminHome';
//import AdminHome from './Pages/AdminHome';
//import DoctorHome from './Pages/DoctorHome';
//import PatientHomeClinic from './Pages/PatientHomeClinic';
//import PatientHomePharmacy from './Pages/PatientHomePharmacy';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { useState } from 'react';
import axios from 'axios';



function App() {
  return (
    <Router>
      < DoctorRegistrationHome/>
    </Router>
    
  );


}

export default App


