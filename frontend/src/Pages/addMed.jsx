import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';


export default function AddMed() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    sales: '',
    availableQuantity: 0,
    medicalUse: '',
    picture: '',
  });

  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/meds/', formData)
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
          Add Medication
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Sale"
            variant="outlined"
            type="number"
            name="sales"
            value={formData.sales}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Available Quantity"
            variant="outlined"
            type="number"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Medical Use"
            variant="outlined"
            type="String"
            name="medicalUse"
            value={formData.medicalUse}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Picture"
            variant="outlined"
            type="String"
            name="picture"
            value={formData.picture}
            onChange={handleInputChange}
          />
        </div>
        <Button variant="contained" color="primary"  onClick={handleSubmit}>
          Create Medication
        </Button>
      </Container>
    </Box>
  );
}