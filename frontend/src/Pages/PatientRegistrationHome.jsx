//import React from 'react';
//import './LoginPagepharmacy.css';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField'; // Import TextField
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import './PatientRegistrationHome.css';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PatientRegistrationHome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    mobileNumber: '',
    emergencyContactFullName: '',
    emergencyContactMobileNumber: '',
    emergencyContactRelationToPatient: '',
  });




  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/patients', formData)
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
        backgroundColor: '#B3E0FF', // Set the background color to light blue
         height: '100vh', // Set the height to 100% of the viewport
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
              label="Gender"
              variant="outlined"
              className="text-field"
              name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            />
  </Grid>
  <Grid item xs={6}>
  <TextField
              fullWidth
              margin="normal"
              label="Mobile Number"
              variant="outlined"
              className="text-field"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              
            />
  </Grid>
  <Grid item xs={6}>
  <TextField
              fullWidth
              margin="normal"
              label="Emergency Contact(Full Name)"
              variant="outlined"
              className="text-field"
              name="emergencyContactFullName"
              value={formData.emergencyContactFullName}
              onChange={handleInputChange}
            />
  </Grid>
  <Grid item xs={6}>
  <TextField
              fullWidth
              margin="normal"
              label="Emergency Contact(Mobile Number)"
              variant="outlined"
              className="text-field"
              name="emergencyContactMobileNumber"
              value={formData.emergencyContactMobileNumber}
              onChange={handleInputChange}
            />
  </Grid>
  <Grid item xs={6}>
  <TextField
              fullWidth
              margin="normal"
              label="Emergency Contact(Relation To Patient)"
              variant="outlined"
              className="text-field"
              name="emergencyContactRelationToPatient"
              value={formData.emergencyContactRelationToPatient}
              onChange={handleInputChange}
            />
  </Grid>





</Grid>
<h1 class="title-text">Patient Registration</h1>;
<div className="button-container">
<Button
              variant="contained"
              onClick={() => navigate('/clinic-patient-home')}
            > Register</Button>
      </div>
      <div className="button-container-1">
        <Button variant="contained">Cancel</Button>
      </div>

      <div className="container">
      <div className="image-container">
        <img
          src={img} // Use the imported variable 'img' as the source
          alt="" // Add an alt attribute for accessibility
          className="adjustable-image"
        />
      </div>
      </div>

</Container>
</Box>
 
    )
   
     
  }

  
  export default PatientRegistrationHome;


