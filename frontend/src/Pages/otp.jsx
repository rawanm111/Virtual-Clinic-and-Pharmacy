import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Otp = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setOtp(value.replace(/\D/g, '')); // Replace any non-digit characters
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the logic for OTP submission here, like an API call
    console.log('OTP submitted:', otp);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {/* Set the color of Typography to primary to match the button and text field */}
        <Typography component="h1" variant="h5" color="primary" sx={{ mt: 4, mb: 4 }}>
          An OTP has been sent to your email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="otp"
            label="ENTER OTP"
            type="text"
            id="otp"
            autoFocus
            inputProps={{ maxLength: 6 }} // Assuming the OTP is 6 digits
            value={otp}
            onChange={handleChange}
            color="primary" // Ensure the text field uses the primary color
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary" // Ensure the button uses the primary color
            sx={{ mt: 3, mb: 2 }}
          >
            Verify OTP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Otp;
