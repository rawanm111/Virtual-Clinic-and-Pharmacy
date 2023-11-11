import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default function NewHealthRecord() {
  const [formData, setFormData] = useState({
    patientname: '',
    diagnosis: '',
    date: '',
  });

  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/health-recs', formData)
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
          Health Record Form
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Patient Name"
            variant="outlined"
            name="patientname"
            value={formData.patientname}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Diagnosis"
            variant="outlined"
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Date"
            variant="outlined"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>
       
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Health Record
        </Button>
      </Container>
    </Box>
  );
}