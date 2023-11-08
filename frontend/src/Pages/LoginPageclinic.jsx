import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const rightContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  marginLeft: '10px',
};

const textfieldStyle = {
  marginBottom: '10px',
};

const buttonContainerStyle = {
  marginTop: '10px',
};

function LoginPage() {
  const navigate = useNavigate();

  const handlePatientRegistration = () => {
    navigate('/patientreg');
  };

  const handleLogin = () => {
    navigate('/admin-home');
  };

  const handleDoctorRegistration = () => {
    navigate('/docreg');
  };

  return (
    <div style={containerStyle}>
      <div className="image-container">
        <img
          src={img}
          alt=""
          className="adjustable-image"
        />
      </div>
      <div style={rightContentStyle}>
        <div style={textfieldStyle}>
          <TextField
            label="Username"
            variant="standard"
            fullWidth
          />
        </div>
        <div style={textfieldStyle}>
          <TextField
            label="Password"
            variant="standard"
            fullWidth
          />
        </div>
        <div style={buttonContainerStyle}>
          <Button variant="contained" onClick={handleLogin}>
            LOGIN
          </Button>
          </div>
          <div style={buttonContainerStyle}>
          <Button variant="outlined" onClick={handleDoctorRegistration}>
            REGISTER AS DOCTOR
          </Button>
          <Button variant="outlined" onClick={handlePatientRegistration}>
            REGISTER AS PATIENT
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
