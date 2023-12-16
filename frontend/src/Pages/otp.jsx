// import React, { useState } from 'react';
// import axios from 'axios';
//  import { Link, useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { Box, Button, TextField, Typography, Container } from '@mui/material';
// import { styled } from '@mui/material/styles';


// const ExoticBackground = styled(Container)({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   minHeight: '100vh',
//   background: 'linear-gradient(45deg, #ADD8E6, #87CEEB)', // Light blue gradient
//   color: 'white',
// });

// const ExoticButton = styled(Button)({
//   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//   border: 0,
//   borderRadius: 500,
//   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//   color: 'white',
//   height: 48,
//   padding: ' 30px',
//   marginTop: '20px',
// });

// const ExoticTextField = styled(TextField)({
//   '& input': {
//     textAlign: 'center',
//     letterSpacing: '0.3rem',
//     fontSize: '1.25rem', // Larger text for better readability
//   },
//   '& label.Mui-focused': {
//     color: '#FF8E53',
//   },
//   '& .MuiOutlinedInput-root': {
//     '&.Mui-focused fieldset': {
//       borderColor: '#FF8E53',
//       borderWidth: '2px', // Thicker border on focus
//     },
//     '&:hover fieldset': {
//       borderColor: '#FE6B8B',
//     },
//     '&.Mui-error fieldset': {
//       borderColor: 'red',
//     },
//   },
//   '& .MuiFormHelperText-root': {
//     textAlign: 'center',
//   },
//   transition: 'transform 0.1s ease-in-out', // Subtle animation
//   '&:focus-within': {
//     transform: 'scale(1.05)', // Slightly enlarge on focus
//   },
// });

// const OTP = () => {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleOtpChange = (event) => {
//     const value = event.target.value;
//     if (value.length <= 6) {
//       setOtp(value);
//       setError('');
//     }
//   };
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (otp.length !== 6) {
//       setError('OTP must be 6 digits');
//       return;
//     }
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
//     <ExoticBackground>
//       <Typography variant="h3" gutterBottom>
//         Welcome {username}
//       </Typography>
//       <Typography variant="h5" gutterBottom>
//         An OTP has been sent to your email
//       </Typography>
//       <Box mt={2} onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 300 }}>
//         <ExoticTextField
//           error={Boolean(error)}
//           id="outlined-basic"
//           label="Enter OTP"
//           variant="outlined"
//           value={otp}
//           onChange={handleOtpChange}
//           helperText={error ? error : `${otp.length}/6`}
//           fullWidth
//           inputProps={{ maxLength: 6 }}
//         />
//         <ExoticButton onClick={handleSubmit}>
//           Submit OTP
//         </ExoticButton>
//       </Box>
//     </ExoticBackground>
//   );
// };

// export default OTP;





import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import rere from '../Components/Logo/rere.png';
import rere from "../images/rere.png";
// import { useParams } from 'react-router-dom';
const OTPContainer = styled(Container)({
  display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'flex-start', // Align items to the start (top left)
  // justifyContent: 'flex-start', // Align content to the start (top left)
  minHeight: '100vh',
  // padding: '10px', // Add padding for spacing
  backgroundColor: 'white',
});
const globalStyles = {
  body: {
    backgroundColor: 'white',
    margin: 0, // Remove default margin to ensure full-width background
    padding: 0, // Remove default padding
  },
}
const OTPCard = styled(Paper)({
  padding: '3rem',
  width: '100%',
  maxWidth: '500px',
  textAlign: 'center',
  position: 'relative',
  
});

const OTPImage = styled('img')({
  width: '90%',
  height: '90%',
  marginBottom: '20px',
  marginTop: '110px',
  marginLeft: '110px',
  position: 'absolute', // Set the image position to absolute
  // bottom: 0, // Align the image to the bottom
  // right: 0, // Align the image to the right
  position: 'absolute', // Set the image position to absolute
  zIndex: 1, // Ensure the image is above other elements
});
const OTPContent = styled('div')({
  position: 'relative', // Set position to relative for child elements
  zIndex: 2, // Ensure the content is above the image
  // marginBottom: '20px',
  marginTop: '60px',
  marginLeft: '-50px',
});
// ... (rest of your code)

// ... (rest of your code)

const OTPTextField = styled(TextField)({
  '& input': {
    textAlign: 'center',
    letterSpacing: '0.3rem',
    fontSize: '1.75rem',
    color: '#001f3f', // Dark blue color
  },
  '& label.Mui-focused': {
    color: '#001f3f', // Dark blue color when focused
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#001f3f', // Dark blue border when focused
      borderWidth: '2px',
    },
    '&:hover fieldset': {
      borderColor: '#001f3f', // Dark blue border on hover
    },
    '&.Mui-error fieldset': {
      borderColor: '#FF0000',
    },
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'center',
  },
});


const OTPButton = styled(Button)({
  // background: '#007bff',
  background: 'linear-gradient(45deg, #2531a0  30%, #084b99 90%)',


  borderRadius: '25px',
  color: 'white',
  height: '56px',
  marginTop: '20px',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

// ... (rest of your code)

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
    // Your OTP verification logic here
    try {
      const response = await axios.post('http://localhost:3000/verifyOtp', {
        username,
        otp,
      });
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
    <div style={globalStyles.body}>
        <IconButton color="default" onClick={() => navigate(-1)} style={{ position: 'absolute', top: 30, left: 20, zIndex: 2 }}>
          <ArrowBackIcon />
        </IconButton>
    <OTPContainer>
      {/* <OTPCard elevation={3}> */}

        <OTPImage src={rere} alt="Your Image Alt Text" />
        <OTPContent>
        <Typography variant="h3" gutterBottom sx={{ marginLeft: 3 }}>
          Welcome {username}
        </Typography>
        <Typography variant="h5" gutterBottom>
          An OTP has been sent to your email
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
          <OTPTextField
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
          <OTPButton onClick={handleSubmit} sx={{ left: '140px' }}>
            Submit OTP
          </OTPButton>
        </Box>
        </OTPContent>
      {/* </OTPCard> */}
    </OTPContainer>
    </div>
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



