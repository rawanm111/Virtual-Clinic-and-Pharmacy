import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    gender: 'Male',
    nationalid: '',
    relationtopatient: 'Father', // Set a default value
  });

  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/family_members', formData)
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
          Family Member Form
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Relation to Patient"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            name="relationtopatient"
            value={formData.relationtopatient}
            onChange={handleInputChange}
          >
            <option value="Wife">Wife</option>
            <option value="Husband">Husband</option>
            <option value="Children">Children</option>
          </TextField>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleSubmit}
        >
          Submit Family Member
        </Button>
      </Container>
    </Box>
  );
}