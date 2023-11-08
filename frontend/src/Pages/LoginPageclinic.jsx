import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

// function LoginPage() {
//   const navigate = useNavigate();

//   const handlePatientRegistration = () => {
//     navigate('/patientreg');
//   };

//   const handleLogin = () => {
//     navigate('/admin-home');
//   };

//   const handleDoctorRegistration = () => {
//     navigate('/docreg');
//   };


function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleDoctorRegistration = () => {
    navigate('/docreg');
  };

  const handlePatientRegistration = () => {
    navigate('/patientreg');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });

      const data = response.data;

      if (data.success) {
        // Use the role from the response to determine where to navigate
        switch (data.role) {
          case 'Admin':
            navigate('/admin-home');
            break;
          case 'Doctor':
            navigate('/doc-home/:id');
            break;
          case 'Patient':
            navigate('/clinic-patient-home/:id');
            break;
        
          default:
            // Handle any user types that don't have a specified route
            setError('User role is not recognized.');
            break;
        }
      } else {
        // If the login was not successful, but there was no error thrown
        setError(data.message);
      }
    } catch (error) {
      console.error('Login error', error);
      if (error.response) {
        // If the server responded with a status other than 2xx, get the message from the server's response
        setError(error.response.data.message);
      } else {
        // If the server did not respond or there was a different error, set a generic error message
        setError('An error occurred during login. Please try again.');
      }
    }
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
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div style={textfieldStyle}>
          <TextField
            label="Password"
            variant="standard"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
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
