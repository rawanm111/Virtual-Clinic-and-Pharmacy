import React from 'react';
import './LoginPagepharmacy.css';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // Import TextField



function LoginPage() {
  return (
    <div className="container">
      <div className="image-container">
        <img
          src={img} // Use the imported variable 'img' as the source
          alt="" // Add an alt attribute for accessibility
          className="adjustable-image"
        />
      </div>
      
      <div className="textfield-container">
        <TextField 
          label="Username" 
          variant="standard" 
          fullWidth // This will make the text field take the full width of its container
        />
      </div>

      <div className="textfield-container-1">
        <TextField 
          label="Password" 
          variant="standard" 
          fullWidth // This will make the text field take the full width of its container
        />
      </div>
      <h1 class="title-text">DON'T HAVE AN ACCOUNT?</h1>;

      <div className="button-container">
        <Button variant="contained">LOGIN</Button>
      </div>
      <div className="button-container-1">
        <Button variant="outlined">REGISTER AS PATIENT</Button>
      </div>
      <div className="button-container-2">
        <Button variant="outlined">REGISTER AS PHARMACIST</Button>
      </div> 
      


      </div>
  );
}

export default LoginPage;
