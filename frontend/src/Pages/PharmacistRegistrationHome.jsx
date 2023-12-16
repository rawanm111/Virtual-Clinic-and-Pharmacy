import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Snackbar from '@mui/material/Snackbar';
import MenuItem from '@mui/material/MenuItem';
import MuiAlert from '@mui/material/Alert';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PharmacistRegistrationHome = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
    
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
    nationalIdFile: '',
    pharmacyDegreeFile: '',
    workingLicenseFile : '',

  });

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'username':
      case 'fullName':
      case 'dateOfBirth':
 
      case 'affiliation':
      case 'educationalBackground':

        return value && value.trim() !== '' ? '' : `${fieldName} is required.`;
      case 'password':
        return validatePassword(value)
          ? ''
          : 'Password must contain at least one uppercase letter, one number, and be at least 4 characters long.';
  // Inside the validateField function
case 'hourlyRate':
  return !isNaN(value) && value.trim() !== '' ? '' : 'Hourly Rate must be a valid number.';

      case 'confirmPassword':
        return formData.password === value ? '' : 'Password and Confirm Password do not match.';
  
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Invalid email format.';
  
      case 'nationalIdFile':
      case 'pharmacyDegreeFile':
      case 'workingLicenseFile':
        return value ? '' : `${fieldName} is required.`;
  
      default:
        return '';
    }
  };
  const [nationalIdFile, setNationalIdFile] = useState(null);
  const [pharmacyDegreeFile, setPharmacyDegreeFile] = useState(null);
  const [workingLicenseFile, setWorkingLicenseFile] = useState(null);

  // File name states
  const [nationalIdFileName, setNationalIdFileName] = useState('');
  const [pharmacyDegreeFileName, setPharmacyDegreeFileName] = useState('');
  const [workingLicenseFileName, setWorkingLicenseFileName] = useState('');
  const [confirmPasswordFileName, setConfirmPasswordFileName] = useState('');
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };
 
  // const handleSubmit = async () => {
  //   if (!validatePassword(formData.password)) {
  //     alert("Password must contain at least one uppercase letter, one number, and be at least 4 characters long.");
  //     return;
  //   }
  //   if (formData.password !== formData.confirmPassword) {
  //     alert("Password and Confirm Password do not match.");
  //     return;
  //   }

  //   if (!formData.username.trim()) {
  //     alert("Please enter a username.");
  //     return;
  //   }
  //   if (!formData.password.trim()) {
  //     alert("Please enter a password.");
  //     return;
  //   }
  //   if (!formData.confirmPassword.trim()) {
  //     alert("Please confirm your password.");
  //     return;
  //   }
  //   if (!formData.fullName.trim()) {
  //     alert("Please enter a fullname.");
  //     return;
  //   }
  //   if (!formData.email.trim()) {
  //     alert("Please enter an email.");
  //     return;
  //   }
  //   if (!formData.dateOfBirth.trim()) {
  //     alert("Please enter a dateofbirth.");
  //     return;
  //   }
  //   if (!formData.hourlyRate.trim()) {
  //     alert("Please enter an hourlyrate.");
  //     return;
  //   }
  //   if (!formData.affiliation.trim()) {
  //     alert("Please enter an affiliation.");
  //     return;
  //   }
  //   if (!formData.educationalBackground.trim()) {
  //     alert("Please enter an educational background.");
  //     return;
  //   }
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(formData.email)) {
  //     alert("Invalid email format.");
  //     return;
  //   }
  //   try {
  //     const formDataToSend = new FormData();

  //     for (const key in formData) {
  //       formDataToSend.append(key, formData[key]);
  //     }

  //     formDataToSend.append('nationalIdFile', nationalIdFile);
  //     formDataToSend.append('pharmacyDegreeFile', pharmacyDegreeFile);
  //     formDataToSend.append('workingLicenseFile', workingLicenseFile);

  //     const response = await axios.post('http://localhost:3000/api/pharmcistReq', formDataToSend);

  //     console.log('Response:', response.data);
  //     // setNotification({
  //     //   message: 'Registration successful!',
  //     //   severity: 'success',
  //     // });
  //     alert("Successful registration. You can now login.");
  //     // Delay navigation for a few seconds (adjust as needed)
  //     setTimeout(() => {
  //       // setNotification(null); 
  //       // Clear the notification
  //       navigate('/pharm'); // Navigate after showing the notification
  //     }, 1800);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };



const handleSubmit = async () => {
  // Validate each field before submitting
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
    // If there are errors, don't submit the form
    return;
  }


try {
  const formDataToSend = new FormData();

  for (const key in formData) {
    formDataToSend.append(key, formData[key]);
  }
  const hasValidHourlyRate = !isNaN(formData.hourlyRate);

  if (!hasValidHourlyRate) {
    setErrors((prevErrors) => ({ ...prevErrors, hourlyRate: 'Hourly Rate must be a valid number.' }));
    return;
  }
  
  formDataToSend.append('nationalIdFile', nationalIdFile);
  formDataToSend.append('pharmacyDegreeFile', pharmacyDegreeFile);
  formDataToSend.append('workingLicenseFile', workingLicenseFile);
  const response = await axios.post('http://localhost:3000/api/pharmcistReq', formDataToSend);

  console.log('Response:', response.data);

  // setErrors({}); // Clear errors after successful submission

  alert("Successful registration. You can now login.");
  // Delay navigation for a few seconds (adjust as needed)
  setTimeout(() => {
    setNotification(null); 
    // Clear the notification
    navigate('/pharm'); // Navigate after showing the notification
  }, 1500);

} catch (error) {
  console.error('Error:', error);
  // Handle error and display appropriate message or notification
}
};

  const [notification, setNotification] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  
    // Reset scroll position
    window.scrollTo(0, 0);
  };
  
  const handleFileChange = (event, fileSetter, fileNameSetter) => {
    const file = event.target.files[0];
    fileSetter(file);
    fileNameSetter(file.name);
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
          Pharmacist Registration
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
              name="password"
              type="password"
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
              label="Educational Background*"
              variant="outlined"
              name="educationalBackground"
              value={formData.educationalBackground}
              onChange={handleInputChange}
              helperText={errors.educationalBackground}
              error={Boolean(errors.educationalBackground)}
              onBlur={() => validateField('educationalBackground')} 
            />
      </Box>

      {/* Box for Hourly Rate, Affiliation, and Speciality */}
      <Box style={{ padding: '20px', marginBottom: '20px',backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '70%' }}>
        <h2>Professional Information</h2>
        <TextField
              fullWidth
              margin="normal"
              label="Hourly Rate*"
              variant="outlined"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleInputChange}
              helperText={errors.hourlyRate}
              error={Boolean(errors.hourlyRate)}
              onBlur={() => validateField('hourlyRate')} 
            />
       
            <TextField
              fullWidth
              margin="normal"
              label="Affiliation (hospital)*"
              variant="outlined"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleInputChange}
              helperText={errors.affiliation}
              error={Boolean(errors.affiliation)}
              onBlur={() => validateField('affiliation')} 
            />
      </Box>
      <Box style={{ padding: '20px', marginBottom: '20px',backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '70%' }}>
        <h2>Needed Documents</h2>
       
        <TextField
              fullWidth
              margin="normal"
              label="National ID*"
              variant="outlined"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <CloudUploadIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => document.getElementById('nationalIdFileInput').click()}
                  />
                ),
              }}
              value={nationalIdFileName} // Display the file name
            />
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: 'none' }}
              id="nationalIdFileInput"
              onChange={(e) => handleFileChange(e, setNationalIdFile, setNationalIdFileName)}
            />
       
            <TextField
              fullWidth
              margin="normal"
              label="Pharmacy Degree*"
              variant="outlined"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <CloudUploadIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => document.getElementById('pharmacyDegreeFileInput').click()}
                  />
                ),
              }}
              value={pharmacyDegreeFileName} // Display the file name
            />
            <input
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              id="pharmacyDegreeFileInput"
              onChange={(e) => handleFileChange(e, setPharmacyDegreeFile, setPharmacyDegreeFileName)}
            />
       
            <TextField
              fullWidth
              margin="normal"
              label="Working License*"
              variant="outlined"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <CloudUploadIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => document.getElementById('workingLicenseFileInput').click()}
                  />
                ),
              }}
              value={workingLicenseFileName} // Display the file name
            />
            <input
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              id="workingLicenseFileInput"
              onChange={(e) => handleFileChange(e, setWorkingLicenseFile, setWorkingLicenseFileName)}
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



export default PharmacistRegistrationHome;






