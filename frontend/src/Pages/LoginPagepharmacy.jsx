import React, { useState } from 'react';
import axios from 'axios'; // Import axios
//import React from 'react';
import './LoginPagepharmacy.css';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Import TextField
import { useNavigate } from 'react-router-dom';


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
      password
    });

    const data = response.data;
    const error2 = response.status;
    
    if (data) {
      navigate('/admin-home');
    }
  
  } catch (error) {
    console.error('Wrong password', error);
    //window.location.reload();
    setError('Forgot password?'); // Set the error state
  }
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
          value={username}
          onChange={handleUsernameChange}
        />
      </div>

      <div className="textfield-container-1">
        <TextField 
          label="Password" 
          variant="standard" 
          fullWidth
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {/* Display error message if error is set */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
      
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