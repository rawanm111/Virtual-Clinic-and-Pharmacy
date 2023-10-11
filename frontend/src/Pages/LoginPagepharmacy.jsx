import React from 'react';
import './LoginPagepharmacy.css';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Import TextField
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handlePatientRegistration = () => {
    navigate('/patientregpharm');
  };

  const handleLogin = () => {
    navigate('/admin-home');
  }; 

  const handlePharmacistRegistration = () => {
    navigate('/pharmreg');
  };

  return (
    <div className="container">
      <div className="image-container">
        <img
          src={img}
          alt=""
          className="adjustable-image"
        />
      </div>
      
      <div className="textfield-container">
        <TextField 
          label="Username" 
          variant="standard" 
          fullWidth
        />
      </div>

      <div className="textfield-container-1">
        <TextField 
          label="Password" 
          variant="standard" 
          fullWidth
        />
      </div>
      <div className="button-container-2">
        <Button variant="contained" onClick={handleLogin}>LOGIN</Button>
        <Button variant="outlined" onClick={handlePatientRegistration}>REGISTER AS PATIENT</Button>
        <Button variant="outlined" onClick={handlePharmacistRegistration}>REGISTER AS PHARMACIST</Button>
      </div> 
    </div>
  );
}

export default LoginPage;
