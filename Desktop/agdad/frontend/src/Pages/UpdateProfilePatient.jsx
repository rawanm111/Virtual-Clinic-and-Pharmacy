import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function UpdatePatient() {
  const { username } = useParams();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emergencyContactFullName: '',
    emergencyContactMobileNumber: '',
    emergencyContactRelationToPatient: '',
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/${username}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patient profile:', error);
      });
  }, [username]);

  const handleSubmit = () => {
    axios
      .put(`http://localhost:3000/patients/${username}`, formData)
      .then((response) => {
        console.log('Updated patient:', response.data);
      })
      .catch((error) => {
        console.error('Error updating patient:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      style={{
        backgroundColor: 'lightblue',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        style={{
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '15px',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Update Patient
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Date of Birth"
            variant="outlined"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Gender"
            variant="outlined"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Emergency Contact Full Name"
            variant="outlined"
            name="emergencyContactFullName"
            value={formData.emergencyContactFullName}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Emergency Contact Mobile Number"
            variant="outlined"
            name="emergencyContactMobileNumber"
            value={formData.emergencyContactMobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Emergency Contact Relation to Patient"
            variant="outlined"
            name="emergencyContactRelationToPatient"
            value={formData.emergencyContactRelationToPatient}
            onChange={handleInputChange}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Container>
    </Box>
  );
}
