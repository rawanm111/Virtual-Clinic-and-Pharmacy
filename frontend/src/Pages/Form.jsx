import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useParams } from 'react-router-dom';


export default function Form() {
  const {id} = useParams();

  const [formData, setFormData] = useState({
    emailOrPhone: '', // Change "name" to "emailOrPhone" to collect email or phone
    relation: 'Wife', // Set a default value
  });

  const handleSubmit = () => {
    axios
    .post(`http://localhost:3000/patients/api/addFamilyMember/${id}`, formData)
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
            label="Email or Mobile Number "
            variant="outlined"
            name="emailOrPhone" // Update the name to "emailOrPhone"
            value={formData.emailOrPhone}
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
            name="relation" // Update the name to "relation"
            value={formData.relation}
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
