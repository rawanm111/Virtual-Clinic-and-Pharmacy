import React, { useState } from 'react';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';
import './DoctorRegistrationHome.css';

const DoctorRegistrationHome = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
  });

  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/doctors', formData)
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      component="div"
      sx={{
        backgroundColor: '#B3E0FF',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="md" className="text-field-container">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              className="text-field"
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
              className="text-field"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Date Of Birth"
              variant="outlined"
              className="text-field"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              variant="outlined"
              className="text-field"
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
              className="text-field"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Hourly Rate"
              variant="outlined"
              className="text-field"
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
              className="text-field"
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
              className="text-field"
              name="educationalBackground"
              value={formData.educationalBackground}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Specialty"
              variant="outlined"
              className="text-field"
              name="specialty"
              value={formData.specialty}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <h1 className="title-text">Doctor Registration</h1>
        <div className="button-container">
          <Button variant="contained" onClick={handleSubmit}>
            Register
          </Button>
        </div>
        <div className="button-container-1">
          <Button variant="contained">Cancel</Button>
        </div>
        <div className="container">
          <div className="image-container">
            <img
              src={img}
              alt="Doctor Image"
              className="adjustable-image"
            />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default DoctorRegistrationHome;
