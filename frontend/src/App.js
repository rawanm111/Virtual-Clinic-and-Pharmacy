// import logo from './logo.svg';

import './App.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Paths from './AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
// import ChangePassword from './Pages/changepassword';
// import Otp from './Pages/otp';
// import DoctorsPage from './Pages/doctorsPage';

function App() {
 
  return (
    <div>
      <Paths />
    </div>
  );
}


export default App;
