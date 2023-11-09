import React, { useState } from 'react';
import axios from 'axios';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

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
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePatientRegistration = () => {
    navigate('/patientregpharm');
  };

  const handlePharmacistRegistration = () => {
    navigate('/pharmreg');
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
        const userId = data.userId;
        switch (data.role) {
          case 'Admin':
            navigate('/admin-home');
            break;

          case 'Patient':
            navigate(`/pharm-patient-home/${userId}`);
            break;
          case 'Pharmacist':
            navigate(`/pharm-home/${userId}`);
            break;
          default:
            
            setError('User role is not recognized.');
            break;
        }
      } else {
       
        setError(data.message);
      }
    } catch (error) {
      console.error('Login error', error);
      if (error.response) {
        
        setError(error.response.data.message);
      } else {
        
        setError('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div style={containerStyle}>
      <div className="image-container">
        <img src={img} alt="" className="adjustable-image" />
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
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>

        <div style={buttonContainerStyle}>
          <Button variant="contained" onClick={handleLogin}>
            LOGIN
          </Button>
        </div>
        <div style={buttonContainerStyle}>
          <Button variant="outlined" onClick={handlePatientRegistration}>
            REGISTER AS PATIENT
          </Button>
          <Button variant="outlined" onClick={handlePharmacistRegistration}>
            REGISTER AS PHARMACIST
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
