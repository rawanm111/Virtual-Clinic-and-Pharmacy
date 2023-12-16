//import React from 'react';
//import './LoginPagepharmacy.css';
// import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField'; // Import TextField
import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import './PatientRegistrationHome.css';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PatientRegistrationHome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emergencyContactFullName: '',
    emergencyContactMobileNumber: '',
    emergencyContactRelationToPatient: '',
  });
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    mobileNumber: '',
    emergencyContactFullName: '',
    emergencyContactMobileNumber: '',
    emergencyContactRelationToPatient: '',
  });

  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedGender, setSelectedGender] = useState('');
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'username':
      case 'fullName':
      case 'dateOfBirth':
      case 'mobileNumber':
      case 'emergencyContactFullName':
      case 'emergencyContactMobileNumber':
      case 'emergencyContactRelationToPatient':
        return value && value.trim() !== '' ? '' : `${fieldName} is required.`;
      case 'password':
        return validatePassword(value)
          ? ''
          : 'Password must contain at least one uppercase letter, one number, and be at least 4 characters long.';
  
      case 'confirmPassword':
        return formData.password === value ? '' : 'Password and Confirm Password do not match.';
  
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Invalid email format.';
        case 'gender':
          // Skip validation for gender
          return '';
  
      default:
        return '';
    }
  };
  const handleSubmit = () => {
    // if (!validatePassword(formData.password)) {
    //   alert("Password must contain at least one uppercase letter, one number, and be at least 4 characters long.");
    //   return;

    // }

    // if (formData.password !== formData.confirmPassword) {
    //   alert("Password and Confirm Password do not match.");
    //   return;
    // }

    // if (!formData.username.trim()) {
    //   alert("Please enter a username.");
    //   return;
    // }
    // if (!formData.password.trim()) {
    //   alert("Please enter a password.");
    //   return;
    // }
    // if (!formData.confirmPassword.trim()) {
    //   alert("Please confirm your password.");
    //   return;
    // }
    // if (!formData.fullName.trim()) {
    //   alert("Please enter a fullname.");
    //   return;
    // }
    // if (!formData.email.trim()) {
    //   alert("Please enter an email.");
    //   return;
    // }
    // // if (!formData.gender.trim()) {
    // //   alert("Please pick a gender.");
    // //   return;
    // // }
    // if (!formData.mobileNumber.trim()) {
    //   alert("Please enter a mobileNumber.");
    //   return;
    // }
    // if (!formData.emergencyContactFullName.trim()) {
    //   alert("Please enter an emergencyContactFullName.");
    //   return;
    // }
    // if (!formData.emergencyContactMobileNumber.trim()) {
    //   alert("Please enter an emergencyContactMobileNumber background.");
    //   return;
    // }
    // if (!formData.emergencyContactRelationToPatient.trim()) {
    //   alert("Please enter a specialtiy.");
    //   return;
    // }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   alert("Invalid email format.");
    //   return;
    // }
    let hasErrors = false;
  
    for (const key in formData) {
      const error = validateField(key, formData[key]);
      setErrors((prevErrors) => ({ ...prevErrors, [key]: error }));
  
      if (error) {
        hasErrors = true;
      }
    }
  
    // Check if there are any errors
    if (hasErrors) {
      // alert("bad");
      // If there are errors, don't submit the form
      return;
    }
    // if (!validatePassword(formData.password)) {
    //   alert("Password must contain at least one uppercase letter, one number, and be at least 4 characters long.");
    //   return;
    // }
    // if (formData.password !== formData.confirmPassword) {
    //   alert("Password and Confirm Password do not match.");
    //   return;
    // }

    // if (!formData.username.trim()) {
    //   alert("Please enter a username.");
    //   return;
    // }
    // if (!formData.password.trim()) {
    //   alert("Please enter a password.");
    //   return;
    // }
    // if (!formData.confirmPassword.trim()) {
    //   alert("Please confirm your password.");
    //   return;
    // }

    // // if (!selectedGender) {
    // //   alert("Please select a gender.");
    // //   return;
    // // }

    
    // if (!formData.fullName.trim()) {
    //   alert("Please enter a fullname.");
    //   return;
    // }
    // if (!formData.email.trim()) {
    //   alert("Please enter an email.");
    //   return;
    // }
    // // if (!formData.gender.trim()) {
    // //   alert("Please pick a gender.");
    // //   return;
    // // }
    // if (!formData.mobileNumber.trim()) {
    //   alert("Please enter a mobileNumber.");
    //   return;
    // }
    // if (!formData.emergencyContactFullName.trim()) {
    //   alert("Please enter an emergencyContactFullName.");
    //   return;
    // }
    // if (!formData.emergencyContactMobileNumber.trim()) {
    //   alert("Please enter an emergencyContactMobileNumber background.");
    //   return;
    // }
    // if (!formData.emergencyContactRelationToPatient.trim()) {
    //   alert("Please enter a specialtiy.");
    //   return;
    // }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(formData.email)) {
    //   alert("Invalid email format.");
    //   return;
    // }
    axios
      .post('http://localhost:3000/patients', formDataToSend)
      .then((response) => {
        console.log('Response:', response.data);
        alert("Successful registration. You can now login.");
    
        setTimeout(() => {
          setNotification(null); 
          // Clear the notification
          navigate('/clinic'); // Navigate after showing the notification
        }, 1500);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const formDataToSend = { ...formData, gender: selectedGender || '' };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name); // Validate the field when its value changes
  };
  
  

  return (
    <div style={{ backgroundColor: 'whitesmoke'}}>
    <Container style={{paddingleft: '20px', paddingTop: '20px', backgroundColor: 'whitesmoke', width: '100%',marginLeft: '270px' }}>
      {/* <Box style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '60%', margin: '0 auto' }}> */}
      <IconButton color="default" onClick={() => navigate(-1)} style={{ position: 'absolute', top: 20, left: 20, zIndex: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        {/* Box for "Doctor Registration" title */}
        <Box style={{ padding: '20px', textAlign: 'center', marginBottom: '20px' , borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',backgroundColor: 'white', width: '70%'}}>
        <div style={{ position: 'relative', top: -21, left: -20, right: 0, height: '12px', width: '1177px', backgroundColor: '#2196F3' ,width: '105%'}}></div>
  
          <h1 className="title-text" color="black">
            Patient Registration
          </h1>
        </Box>
  
        {/* Box for Account Information */}
        <Box style={{ padding: '20px', marginBottom: '20px',backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '70%' }}>
          <h2>Account Information</h2>
          <TextField
                fullWidth
                margin="normal"
                label="Username*"
                variant="outlined"
                className="text-field"
                name="username"
              value={formData.username}
              onChange={handleInputChange}
              helperText={errors.username}
        error={Boolean(errors.username)}
        onBlur={() => validateField('username')} 
              />
    <TextField
                fullWidth
                margin="normal"
                label="Password*"
                variant="outlined"
                className="text-field"
                name="password"
                type = "password"
              value={formData.password}
              onChange={handleInputChange}
              helperText={errors.password}
        error={Boolean(errors.password)}
        onBlur={() => validateField('password')} 
              />
  
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password*"
            variant="outlined"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            helperText={errors.confirmPassword}
            error={Boolean(errors.confirmPassword)}
            onBlur={() => validateField('confirmPassword')}
          />
        </Box>
  
        {/* Box for Personal Information */}
        <Box style={{ padding: '20px', marginBottom: '20px',backgroundColor: 'white' , borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '70%'}}>
          <h2>Personal Information</h2>
          <TextField
                fullWidth
                margin="normal"
                label="Full Name*"
                variant="outlined"
                className="text-field"
                name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              helperText={errors.fullName}
              error={Boolean(errors.fullName)}
              onBlur={() => validateField('fullName')}
              />
  
    <TextField
                fullWidth
                margin="normal"
                label="Email*"
                variant="outlined"
                className="text-field"
                name="email"
              value={formData.email}
              onChange={handleInputChange}
              helperText={errors.email}
        error={Boolean(errors.email)}
        onBlur={() => validateField('email')}
              />
   
    <TextField
                fullWidth
                margin="normal"
                label="Date Of Birth*"
                variant="outlined"
                className="text-field"
                name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              helperText={errors.dateOfBirth}
        error={Boolean(errors.dateOfBirth)}
        onBlur={() => validateField('dateOfBirth')}
              />
  
  <TextField
  fullWidth
  margin="normal"
  label="Gender*"
  variant="outlined"
  className="text-field"
  name="gender"
  value={selectedGender}
  onChange={handleGenderChange}
  select
>
  <MenuItem value="female">Female</MenuItem>
  <MenuItem value="male">Male</MenuItem>
</TextField>

  
    <TextField
                fullWidth
                margin="normal"
                label="Mobile Number*"
                variant="outlined"
                className="text-field"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                helperText={errors.mobileNumber}
                error={Boolean(errors.mobileNumber)}
                onBlur={() => validateField('mobileNumber')}
              />
  
        </Box>
  
        {/* Box for Hourly Rate, Affiliation, and Speciality */}
        <Box style={{ padding: '20px', marginBottom: '20px',backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '70%' }}>
          <h2>Emergencey Contact Information</h2>
          <TextField
                fullWidth
                margin="normal"
                label="Emergency Contact(Full Name)*"
                variant="outlined"
                className="text-field"
                name="emergencyContactFullName"
                value={formData.emergencyContactFullName}
                onChange={handleInputChange}
                helperText={errors.emergencyContactFullName}
                error={Boolean(errors.emergencyContactFullName)}
                onBlur={() => validateField('emergencyContactFullName')}
              />
  
    <TextField
                fullWidth
                margin="normal"
                label="Emergency Contact(Mobile Number)*"
                variant="outlined"
                className="text-field"
                name="emergencyContactMobileNumber"
                value={formData.emergencyContactMobileNumber}
                onChange={handleInputChange}
                helperText={errors.emergencyContactMobileNumber}
                error={Boolean(errors.emergencyContactMobileNumber)}
                onBlur={() => validateField('emergencyContactMobileNumber')}
              />
  
    <TextField
                fullWidth
                margin="normal"
                label="Emergency Contact(Relation To Patient)*"
                variant="outlined"
                className="text-field"
                name="emergencyContactRelationToPatient"
                value={formData.emergencyContactRelationToPatient}
                onChange={handleInputChange}
                helperText={errors.emergencyContactRelationToPatient}
                error={Boolean(errors.emergencyContactRelationToPatient)}
                onBlur={() => validateField('emergencyContactRelationToPatient')}
              />
        </Box>
  
        
        {/* Register Button */}
        <Box style={{ padding: '20px', textAlign: 'center', borderRadius: '8px', marginLeft: '-348px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <Button variant="contained" onClick={handleSubmit}>
            Register
          </Button>
        </Box>
      {/* </Box> */}
    </Container>
    </div>
  );
  };

  export default PatientRegistrationHome;


