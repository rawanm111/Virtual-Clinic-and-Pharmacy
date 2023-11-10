import React, { useState } from 'react';
import axios from 'axios';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 

const PharmacistRegistrationHome = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
  });
  const [nationalIdFile, setNationalIdFile] = useState(null);
  const [pharmacyDegreeFile, setPharmacyDegreeFile] = useState(null);
  const [workingLicenseFile, setWorkingLicenseFile] = useState(null);

  const navigate = useNavigate();
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };
  

  // const handleSubmit = async () => {
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
  //     navigate('/pharm');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  const handleSubmit = async () => {
    
    if (!validatePassword(formData.password)) {
      alert("Password must contain at least one uppercase letter, one number, and be at least 4 characters long.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
  
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
  
      formDataToSend.append('nationalIdFile', nationalIdFile);
      formDataToSend.append('pharmacyDegreeFile', pharmacyDegreeFile);
      formDataToSend.append('workingLicenseFile', workingLicenseFile);
  
      const response = await axios.post('http://localhost:3000/api/pharmcistReq', formDataToSend);
  
      console.log('Response:', response.data);
      navigate('/pharm');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event, fileSetter) => {
    fileSetter(event.target.files[0]);
  };

  return (
    <Box>
       <Container maxWidth="md" className="text-field-container">
        <h1 >Pharmacist Registration</h1>
        {/* <img src={img} alt="Pharmacist Image" className="adjustable-image" /> */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Date Of Birth"
              variant="outlined"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Hourly Rate"
              variant="outlined"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Affiliation(hospital)"
              variant="outlined"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Educational Background"
              variant="outlined"
              name="educationalBackground"
              value={formData.educationalBackground}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="National ID"
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
            />
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              style={{ display: 'none' }}
              id="nationalIdFileInput"
              onChange={(e) => handleFileChange(e, setNationalIdFile)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Pharmacy Degree"
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
            />
            <input
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              id="pharmacyDegreeFileInput"
              onChange={(e) => handleFileChange(e, setPharmacyDegreeFile)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Working License"
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
            />
            <input
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              id="workingLicenseFileInput"
              onChange={(e) => handleFileChange(e, setWorkingLicenseFile)}
            />
          </Grid>
        </Grid>
        <div className="button-container">
          <Button variant="contained" onClick={handleSubmit}>
            Register
          </Button>
          <Button variant="contained">Cancel</Button>
        </div>
       
      </Container>
    </Box>
  );
};

export default PharmacistRegistrationHome;
