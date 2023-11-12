import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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
  const errorTextStyle = {
    color: 'red',
  };
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sendOtp', { username: username });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error sending OTP", error);
    }
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
          case 'admin':
            navigate('/admin-home');
            break;
          case 'doctor':
            // Check employment contract status
            const contractStatusResponse = await axios.get(`http://localhost:3000/employmentContract/status/${userId}`);
            const contractStatus = contractStatusResponse.data.status;
  
            if (contractStatus === 'Inactive') {
              navigate(`/EmploymentContract/${userId}`);
            } else {
              navigate(`/doc-home/${userId}`);
            }
            break;
          case 'patient':
            navigate(`/clinic-patient-home/${userId}`);
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
        if (error.response && error.response.status === 406) {
          // Set the flag to show forgot password link for 406 status
          setShowForgotPassword(true);
        }
        setError(error.response.data.message);
      } else {
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
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {error && (
          <div style={errorTextStyle}>
            {error}
            {showForgotPassword && ( // Only show the link if showForgotPassword is true
                <Link to={`/Otp/${username}`} onClick={handleForgotPassword} style={{ color: 'red', marginLeft: '30px' }}>
                  Forgot Password?
                </Link>
              )}
          </div>
        )}
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
