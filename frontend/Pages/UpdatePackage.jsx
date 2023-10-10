import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function UpdatePackage() {
  const { username} = useParams();

  const [formData, setFormData] = useState({
            username:'',
            email:'',
            fullName:'',
            password:'',
            emergencyfullName:'',
            emergencyContactMobileNumber:'',
            emergencyContactRelationToPatient:'',
            mobileNumber:'',
            gender:'',
            dateOfBirth:'',
  });

  useEffect(() => {
   
    if (id) {
      axios
        .get(`http://localhost:3000/'/patients'/${id}`)
        .then((response) => {
          // Verify the response structure and field names
          const {
            username,
            email,
            fullName,
            password,
            emergencyfullName,
            emergencyContactMobileNumber,
            emergencyContactRelationToPatient,
            mobileNumber,
            gender,
            dateOfBirth,
          } = response.data;

          // Update formData state with fetched data
          setFormData({
            username,
            email,
            fullName,
            password,
            emergencyfullName,
            emergencyContactMobileNumber,
            emergencyContactRelationToPatient,
            mobileNumber,
            gender,
            dateOfBirth,
          });
        })
        .catch((error) => {
          console.error('Error fetching patient profile:', error);
        });
    }
  }, [id]);

  const handleSubmit = () => {
    // Use a PUT request to update the health package
    axios
      .put(`http://localhost:3000/health-packages/${id}`, formData)
      .then((response) => {
        console.log('Updated health package:', response.data);
      })
      .catch((error) => {
        console.error('Error updating health package:', error);
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
          UpdatePatient 
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="username"
            variant="outlined"
            name="username"
            value={Patient.username}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="password"
            variant="outlined"
            name="password"
            value={Patient.password}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="fullName"
            variant="outlined"
            name="fullName"
            value={Patient.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="email"
            variant="outlined"
            name="email"
            value={Patient.email}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="dateOfBirth"
            variant="outlined"
            name="dateOfBirth"
            value={Patient.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="gender"
            variant="outlined"
            name="gender"
            value={Patient.gender}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="mobileNumber"
            variant="outlined"
            name="mobileNumber"
            value={Patient.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="emergencyufullName"
            variant="outlined"
            name="emergencyfullName"
            value={Patient.emergencyfullName}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="emergencyContactMobileNumber"
            variant="outlined"
            name="emergencyContactMobileNumber"
            value={Patient.emergencyContactMobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="emergencyContactRelationToPatient"
            variant="outlined"
            name="emergencyContactRelationToPatient"
            value={Patient.emergencyContactRelationToPatien}
            onChange={handleInputChange}
          />
        </div>
        
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          UpdatePatient
        </Button>
      </Container>
    </Box>
  );
}
