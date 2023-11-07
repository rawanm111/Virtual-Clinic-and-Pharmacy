// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Paths from './AppRoutes';
import ChangePassword from './Pages/changepassword';
import Otp from './Pages/otp';

function App() {
 
  return (
    <div>
      <ChangePassword />
    </div>
  );
}


export default App;
