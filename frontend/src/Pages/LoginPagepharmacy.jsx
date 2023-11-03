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
    // State hooks for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
     // Update the username state on change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Update the password state on change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

    const handleLogin = async (event) => {
      console.log("try 0");

      event.preventDefault(); // Prevent default form submission behavior
  
      try {
        // Send a POST request to your backend
        console.log("try 1");
        const response = await axios.post('http://localhost:3000/login', {
          username,
          password
        });
        console.log("try 2");

        // Check the response from the backend
        if (response.data.success) {
          // Navigate to the admin home page if authentication is successful
          console.log("try 3");
          navigate('/admin-home');
        } else {
          // Handle failed authentication here
          console.log("try 4");

          alert(response.data.message);
        }
      } catch (error) {
        // Handle errors in sending the request or receiving the response
        alert('Login failed: ' + error.message);
      }
    };

  const handlePatientRegistration = () => {
    navigate('/patientregpharm');
  };

  // const handleLogin = () => {
  //   navigate('/admin-home');
  // }; 

  const handlePharmacistRegistration = () => {
    navigate('/pharmreg');
  };

  return (
    <form onSubmit={handleLogin} className="container"> {/* Form submission handler added */}
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
      <div className="textfield-container">
        <TextField
          label="Username"
          variant="standard"
          fullWidth
          value={username} // Bind state to component
          onChange={handleUsernameChange} // Bind onChange handler
        />
      </div>

      <div className="textfield-container-1">
        <TextField
          label="Password"
          variant="standard"
          fullWidth
          type="password" // Hide password input
          value={password} // Bind state to component
          onChange={handlePasswordChange} // Bind onChange handler
        />
      </div>
      <div className="button-container-2">
        <Button variant="contained" onClick={handleLogin}>LOGIN</Button>
        <Button variant="outlined" onClick={handlePatientRegistration}>REGISTER AS PATIENT</Button>
        <Button variant="outlined" onClick={handlePharmacistRegistration}>REGISTER AS PHARMACIST</Button>
      </div> 
    </div>
    </form>
  );
}

export default LoginPage;
