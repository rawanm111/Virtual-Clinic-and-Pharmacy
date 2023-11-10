import React, { useState } from 'react';
import axios from 'axios';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import './DoctorRegistrationHome.css';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Import the file upload icon

const DoctorRegistrationHome = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    hourlyRate: '',
    affiliation: '',
    educationalBackground: '',
    dateOfBirth: '',
    speciality: '',
  });
  const [nationalIdFile, setNationalIdFile] = useState(null);
  const [medicalLicenseFile, setMedicalLicenseFile] = useState(null);
  const [medicalDegreeFile, setMedicalDegreeFile] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      formDataToSend.append('nationalIdFile', nationalIdFile);
      formDataToSend.append('medicalLicenseFile', medicalLicenseFile);
      formDataToSend.append('medicalDegreeFile', medicalDegreeFile);

      const response = await axios.post('http://localhost:3000/api/drReq', formDataToSend);

      console.log('Response:', response.data);
      navigate('/clinic');
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
              label="Hourly Rate"
              variant="outlined"
              type="number"
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
              label="Date of Birth"
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
              label="Speciality"
              variant="outlined"
              name="speciality"
              value={formData.speciality}
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
                  <CloudUploadIcon style={{ cursor: 'pointer' }} onClick={() => document.getElementById('nationalIdFileInput').click()} />
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
              label="Medical License"
              variant="outlined"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <CloudUploadIcon style={{ cursor: 'pointer' }} onClick={() => document.getElementById('medicalLicenseFileInput').click()} />
                ),
              }}
            />
            <input
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              id="medicalLicenseFileInput"
              onChange={(e) => handleFileChange(e, setMedicalLicenseFile)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              margin="normal"
              label="Medical Degree"
              variant="outlined"
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <CloudUploadIcon style={{ cursor: 'pointer' }} onClick={() => document.getElementById('medicalDegreeFileInput').click()} />
                ),
              }}
            />
            <input
              type="file"
              accept=".pdf"
              style={{ display: 'none' }}
              id="medicalDegreeFileInput"
              onChange={(e) => handleFileChange(e, setMedicalDegreeFile)}
            />
          </Grid>
        </Grid>
        <h1 className="title-text">Doctor Registration</h1>
        <div>
          <img src={img} alt="Doctor Image" className="adjustable-image" />
        </div>
        <div className="button-container">
          <Button variant="contained" onClick={handleSubmit}>
            Register
          </Button>
        </div>
        <div className="button-container-1">
          <Button variant="contained">Cancel</Button>
        </div>
      </Container>
    </Box>
  );
};

export default DoctorRegistrationHome;
