import React, { useState } from 'react';
import axios from 'axios';
 import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';


const ExoticBackground = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(45deg, #ADD8E6, #87CEEB)', // Light blue gradient
  color: 'white',
});

const ExoticButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 500,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: ' 30px',
  marginTop: '20px',
});

const ExoticTextField = styled(TextField)({
  '& input': {
    textAlign: 'center',
    letterSpacing: '0.3rem',
    fontSize: '1.25rem', // Larger text for better readability
  },
  '& label.Mui-focused': {
    color: '#FF8E53',
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#FF8E53',
      borderWidth: '2px', // Thicker border on focus
    },
    '&:hover fieldset': {
      borderColor: '#FE6B8B',
    },
    '&.Mui-error fieldset': {
      borderColor: 'red',
    },
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'center',
  },
  transition: 'transform 0.1s ease-in-out', // Subtle animation
  '&:focus-within': {
    transform: 'scale(1.05)', // Slightly enlarge on focus
  },
});

const OTP = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleOtpChange = (event) => {
    const value = event.target.value;
    if (value.length <= 6) {
      setOtp(value);
      setError('');
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/verifyOtp', { username, otp });
      if (response.status === 204) {
        setSuccess(response.data.message);
        setError('');
        
      }
      navigate(`/changepass/${username}`);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        setSuccess('');
      } else {
        setError('Failed to verify OTP. Please try again.');
        setSuccess('');
      }
    }
  };

  return (
    <ExoticBackground>
      <Typography variant="h3" gutterBottom>
        Welcome {username}
      </Typography>
      <Typography variant="h5" gutterBottom>
        An OTP has been sent to your email
      </Typography>
      <Box mt={2} onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 300 }}>
        <ExoticTextField
          error={Boolean(error)}
          id="outlined-basic"
          label="Enter OTP"
          variant="outlined"
          value={otp}
          onChange={handleOtpChange}
          helperText={error ? error : `${otp.length}/6`}
          fullWidth
          inputProps={{ maxLength: 6 }}
        />
        <ExoticButton onClick={handleSubmit}>
          Submit OTP
        </ExoticButton>
      </Box>
    </ExoticBackground>
  );
};

export default OTP;



























































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, TextField, Button, Box } from '@mui/material';
// import { useParams, Link, useNavigate } from 'react-router-dom';


// const Otp = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState('');
//   //const [username, setUsername] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const handleChange = (event) => {
//     const value = event.target.value;
//     setOtp(value.replace(/\D/g, '')); // Replace any non-digit characters
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/verifyOtp', { username, otp });
//       if (response.status === 204) {
//         setSuccess(response.data.message);
        
//         setError('');
        
//       }
//       navigate(`/changepass/${username}`);
      
//     } catch (error) {
//       if (error.response) {
//         setError(error.response.data.message);
//         setSuccess('');
//       } else {
//         setError('Failed to verify OTP. Please try again.');
//         setSuccess('');
//       }
//     }
//   };

//   return (
//     <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: '100%',
//         }}
//       >
//         {/* Set the color of Typography to primary to match the button and text field */}
//         <Typography component="h1" variant="h5" color="primary" sx={{ mt: 4, mb: 4 }}>
//           An OTP has been sent to the email linked to your username
//         </Typography>
//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="otp"
//             label="ENTER OTP"
//             type="text"
//             id="otp"
//             autoFocus
//             inputProps={{ maxLength: 6 }} // Assuming the OTP is 6 digits
//             value={otp}
//             onChange={handleChange}
//             color="primary" // Ensure the text field uses the primary color
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary" // Ensure the button uses the primary color
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Verify OTP
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Otp;



