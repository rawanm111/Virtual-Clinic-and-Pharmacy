import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPageclinic.css';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function LoginPage() {
  const navigate = useNavigate(); // Initialize the navigate function

  const handlePatientRegistration = () => {
    // Use the navigate function to redirect to /patientreg
    navigate('/patientreg');
  };

  const handleLogin = () => {
    navigate('/admin-home');
  }; 
  const handleDoctorRegistration = () => {
    // Use the navigate function to redirect to /docreg
    navigate('/docreg');
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

      {/* <div className="button-container">
        <Button variant="contained">LOGIN</Button>
      </div> */}
     
      <div className="button-container-2">
        <Button variant="contained" onClick={handleLogin} >LOGIN</Button>
        <Button variant="outlined" onClick={handleDoctorRegistration}>
          REGISTER AS DOCTOR
        </Button>
        <Button variant="outlined" onClick={handlePatientRegistration}>
          REGISTER AS PATIENT
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
