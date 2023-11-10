import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios'; // Import axios for API calls
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const { username } = useParams();

  const handleChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
  };

  const updatePassword = async (newPassword) => {
    try {
      // Replace '/api/reset-password' with your actual API endpoint
      const response = await axios.put('http://localhost:3000/resetpassword', { username, newPassword });
      console.log(response.data);
      alert('Password successfully updated');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New passwords don't match.");
      return;
    }
    updatePassword(passwords.newPassword);
  };
    // Proceed with the password change process (e.g., API call)
    console.log('Passwords submitted:', passwords);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
         <Typography component="h1" variant="h5" color="primary" sx={{ mt: 4, mb: 4 }}>
          Change Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            autoComplete="new-password"
            value={passwords.newPassword}
            onChange={handleChange('newPassword')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            id="confirmNewPassword"
            autoComplete="new-password"
            value={passwords.confirmNewPassword}
            onChange={handleChange('confirmNewPassword')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
