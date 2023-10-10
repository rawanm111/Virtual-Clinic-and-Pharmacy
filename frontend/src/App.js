// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppBarComponent from './Components/Appbar/AppbarAdmin';
import AdminMedsPage from './Pages/AdminMedsPage'
import PatientMedsPage from './Pages/PatientMedsPage'
import PharmacistMedsPage from './Pages/PharmacistMedsPage'
import React from 'react';
import AddMed from './Components/addMed';
function App() {
 
  return (
     <Router>
     
      <PharmacistMedsPage />
      </Router>
  );
}

export default App;
