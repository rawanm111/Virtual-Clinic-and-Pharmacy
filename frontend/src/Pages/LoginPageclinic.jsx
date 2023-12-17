// // import React, { useState } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import img from '../Components/Logo/img.png';
// // import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// const containerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   height: '100vh',
// };

// const rightContentStyle = {
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   marginLeft: '10px',
// };

// const textfieldStyle = {
//   marginBottom: '10px',
// };

// const buttonContainerStyle = {
//   marginTop: '10px',
// };

// const image = {
//   width: '70%',
//   marginLeft: '100px',
//   marginTop: '-10px',
// }

// // function LoginPage() {
// //   const navigate = useNavigate();

// //   const handlePatientRegistration = () => {
// //     navigate('/patientreg');
// //   };

// //   const handleLogin = () => {
// //     navigate('/admin-home');
// //   };

// //   const handleDoctorRegistration = () => {
// //     navigate('/docreg');
// //   };


// function LoginPage() {
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');


//   const handleDoctorRegistration = () => {
//     navigate('/docreg');
//   };

//   const handlePatientRegistration = () => {
//     navigate('/patientreg');
//   };

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };
//   const errorTextStyle = {
//     color: 'red',
//   };
//   const handleForgotPassword = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/sendOtp', { username: username });
//       console.log(response.data); // Handle the response as needed
//     } catch (error) {
//       console.error("Error sending OTP", error);
//     }
//   };


//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/login', {
//         username,
//         password,
//       });
  
//       const data = response.data;
  
//       if (data.success) {
//         const userId = data.userId;
  
//         switch (data.role) {
//           case 'admin':
//             navigate('/admin-home');
//             break;
//           case 'doctor':
//             // Check employment contract status
//             const contractStatusResponse = await axios.get(`http://localhost:3000/employmentContract/status/${userId}`);
//             const contractStatus = contractStatusResponse.data.status;
  
//             if (contractStatus === 'Inactive') {
//               navigate(`/EmploymentContract/${userId}`);
//             } else {
//               navigate(`/doc-home/${userId}`);
//             }
//             break;
//           case 'patient':
//             navigate(`/clinic-patient-home/${userId}`);
//             break;
//           default:
//             setError('User role is not recognized.');
//             break;
//         }
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       console.error('Login error', error);
//       if (error.response) {
//         if (error.response && error.response.status === 406) {
//           // Set the flag to show forgot password link for 406 status
//           setShowForgotPassword(true);
//         }
//         setError(error.response.data.message);
//       } else {
//         setError('An error occurred during login. Please try again.');
//       }
//     }
//   };
  
  

//   return (
//     <div > 
//          <IconButton color="default" onClick={() => navigate(-1)}>
//             <ArrowBackIcon />
//           </IconButton> 
//     <div style={containerStyle}>
//       <div className="image">
//         <img
//           src={img}
//           alt=""
//         />
        
//       </div>
      
//       <div style={rightContentStyle}>
//         <div style={textfieldStyle}>
//           <TextField
//             label="Username"
//             variant="standard"
//             fullWidth
//             value={username}
//             onChange={handleUsernameChange}
//           />
//         </div>
//         <div style={textfieldStyle}>
//           <TextField
//             label="Password"
//             variant="standard"
//             fullWidth
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//           {error && (
//           <div style={errorTextStyle}>
//             {error}
//             {showForgotPassword && ( // Only show the link if showForgotPassword is true
//                 <Link to={`/Otp/${username}`} onClick={handleForgotPassword} style={{ color: 'red', marginLeft: '30px' }}>
//                   Forgot Password?
//                 </Link>
//               )}
//           </div>
//         )}
//         </div>
//         <div style={buttonContainerStyle}>
//           <Button variant="contained" onClick={handleLogin}>
//             LOGIN
//           </Button>
//           </div>
//           <div style={buttonContainerStyle}>
//           <Button variant="outlined" onClick={handleDoctorRegistration}>
//             REGISTER AS DOCTOR
//           </Button>
//           </div>
//           <div style={buttonContainerStyle}>
//           <Button variant="outlined" onClick={handlePatientRegistration}>
//             REGISTER AS PATIENT
//           </Button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// // export default LoginPage;








// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// // import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// // import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function SignInSide() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link href="#" variant="body2">
//                     {"Don't have an account? Sign Up"}
//                   </Link>
//                 </Grid>
//               </Grid>
//               <Copyright sx={{ mt: 5 }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }






import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
 import Grid from '@mui/material/Grid';
  // import img from '../Components/Logo/img.png';
  import img from "../images/img.png";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link as MuiLink } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import zIndex from '@mui/material/styles/zIndex';

const theme = createTheme();

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const rightContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
};
const leftColumnStyle = {
  marginLeft: '-33px',
  marginTop: '-649px',
  width: '45%',  // Adjusted width for the image column'
  alignItems: 'leftmost',
};

const rightColumnStyle = {
  // backgroundColor: '#f0f8ff',
  marginLeft: '900px',
  marginTop: '200px',
  flexDirection: 'column',
  alignItems: 'rightmost',
  width: '30%',  // Adjusted width for the form column
};

const elkbeer = {
  marginLeft: '40px',
  marginTop: '-50px',
  backgroundColor: '#f0f8ff',
height:'  140%',
  width: '90%',  // Adjusted width for the form column
  // zIndex:+1,
};
const textfieldStyle = {
  width: '100%',
  marginBottom: '15px',
};

const buttonContainerStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const LoginPage = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sendOtp', { username: username });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error('Error sending OTP', error);
    }
  };

  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);

  const handleSignUpLinkClick = () => {
    setSignUpDialogOpen(true);
  };

  const handleSignUpDialogClose = () => {
    setSignUpDialogOpen(false);
  };

  const handleDoctorRegistration = () => {
    navigate('/docreg');
  };

  const handlePatientRegistration = () => {
    navigate('/patientreg');
  };


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
  
      const data = response.data;
  
      if (data.success) {
        const userId = data.userId;
  
        switch (data.role) {
          case 'admin':
            navigate('/admin-home');
            break;
          case 'doctor':
            // Check employment contract status
            const contractStatusResponse = await axios.get(`http://localhost:3000/employmentContract/status/${userId}`);
            const contractStatus = contractStatusResponse.data.status;
  
            if (contractStatus === 'Inactive') {
              navigate(`/EmploymentContract/${userId}`);
            } else {
              navigate(`/doc-home/${userId}`);
            }
            break;
          case 'patient':
            navigate(`/clinic-patient-home/${userId}`);
            break;
          default:
            setError('User role is not recognized.');
            break;
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Login error', error);
      if (error.response) {
        // if (error.response && error.response.status === 406) {
        //   // Set the flag to show forgot password link for 406 status
        //   setShowForgotPassword(true);
        // }
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login. Please try again.');
      }
    }
  };
  
  
function SignUpDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Choose Registration Type</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {/* Choose the type of registration: */}
        </Typography>
        <Button onClick={handleDoctorRegistration }>Register as Doctor</Button>
        <Button onClick={handlePatientRegistration}>Register as Patient</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}


return (
  <div>
    <ThemeProvider theme={theme}>


        <CssBaseline />
        <IconButton color="default" onClick={() => navigate(-1)} style={{ position: 'absolute', top: 20, left: 20, zIndex: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        {/* <Box sx={{ alignItems: 'center', height: '90%' , width: '90%'}}> */}
          {/* Left column for the image */}
        
          {/* Right column for the form */}
         <div>
      
          <Box sx={{ ...rightColumnStyle,position: 'relative', zIndex: 1  }}>
          {/* <Box sx={{ ...elkbeer, position: 'absolute', top: 0, left: 0 , zIndex: 0}}>
       
            </Box> */}
            {/* <IconButton color="default" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton> */}
            <Avatar sx={{ m: 2, bgcolor: '#2073d8' }}>
  <LockOutlinedIcon />
</Avatar>

            <Typography component="h1" variant="h5" sx={{ zIndex: 2 }}>
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                sx={textfieldStyle}
                value={username}
                onChange={handleUsernameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                sx={textfieldStyle}
                value={password}
                onChange={handlePasswordChange}
              />
              {error && (
                <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                  {error}
                  {/* {(
                <p>wrong password</p>
                  )} */}
                </Typography>
              )}
              {/* <FormControlLabel
                control={<Checkbox value="\mber" color="primary" />}
                label="Remember me"
                sx={{ mb: 1 }}
              /> */}
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleLogin}
                sx={{ mt: 1, mb: 2, backgroundColor: '#007bff',marginTop: 7}}
              >
                Sign In
              </Button>
              {/* <Button variant="outlined" onClick={handleDoctorRegistration} sx={buttonContainerStyle}>
                Register as Doctor
              </Button>
              <Button variant="outlined" onClick={handlePatientRegistration} sx={buttonContainerStyle}>
                Register as Patient
              </Button> */}
              <Grid container>
                <Grid item xs>
                  {/* <MuiLink href="#" variant="body2">
                    Forgot password?
                  </MuiLink> */}

<MuiLink
  to={`/Otp/${username}`}
  onClick={(event) => {
    // event.preventDefault(); // Prevent the default link behavior
    handleForgotPassword();
    navigate(`/otp/${username}`); // Navigate to the OTP page
    
  }}
  sx={{ color: '#007bff' }}
>
  Forgot Password?
</MuiLink>
                </Grid>
                <Grid item >
                <MuiLink href="#" variant="body2" onClick={handleSignUpLinkClick}  sx={{ zIndex: 5 ,   color: '#007bff'} }  >
      {"Don't have an account? Sign Up"}
    </MuiLink>
                </Grid>
              </Grid>
              <Box sx={{ position: 'absolute', top: -200, left: -30, width: '145%', height: '205%', backgroundColor: '#f8f9fa', zIndex: -1 }}>
              {/* Add content for the baby blue box if needed */}
            </Box>

          </Box>
          </Box>
 
       
          
 

      <Box sx={{ ...leftColumnStyle, zIndex: -3 ,position: 'relative' }}>
              <img src={img} alt="Logo" style={{  width: '140%', height: '100%', objectFit: 'cover' }}   />
            </Box>
            </div>
           
    </ThemeProvider>
    <SignUpDialog open={signUpDialogOpen} handleClose={handleSignUpDialogClose} />
  </div>
);
};





export default LoginPage;

{/* 
//   return (
//     <div>
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box sx={containerStyle}>
//           <Box sx={rightContentStyle}>
//             <IconButton color="default" onClick={() => navigate(-1)}>
//               <ArrowBackIcon />
//             </IconButton>
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
//               <TextField */}
{/* //                 margin="normal"
//                 required
//                 fullWidth
//                 id="username"
//                 label="Username"
//                 name="username"
//                 autoComplete="username"
//                 autoFocus
//                 sx={textfieldStyle}
//                 value={username}
//                 onChange={handleUsernameChange}
//               />
//               <TextField */}
{/* //                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 sx={textfieldStyle}
//                 value={password}
//                 onChange={handlePasswordChange}
//               />
//               {error && ( */}
{/* //                 <Typography variant="body2" color="error" sx={{ mb: 2 }}>
//                   {error} */}
                   {/* {( */}
{/* //                     <MuiLink to={`/Otp/${username}`} onClick={handleForgotPassword} sx={{ display: 'block', mt: 1, color: 'red' }}>
//                       Forgot Password?
//                     </MuiLink>
//                   )}
//                 </Typography> */}
{/* //               )}
//               <FormControlLabel */}
{/* //                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//                 sx={{ mb: 1 }}
//               />
//               <Button */}
{/* //                 type="button"
//                 fullWidth
//                 variant="contained"
//                 onClick={handleLogin}
//                 sx={{ mt: 1, mb: 2 }}
//               >
//                 Sign In
//               </Button> */}
//               {/* <Button variant="outlined" onClick={handleDoctorRegistration} sx={buttonContainerStyle}>
//                 Register as Doctor
//               </Button>
//               <Button variant="outlined" onClick={handlePatientRegistration} sx={buttonContainerStyle}>
//                 Register as Patient
//               </Button> */}
{/* //               <Grid container>
//                 <Grid item xs> */}
//                   {/* <MuiLink href="#" variant="body2">
//                     Forgot password?
//                   </MuiLink> */}

{/* // <MuiLink */}
  {/* to={`/Otp/${username}`}
   onClick={(event) => { */}
{/* //     // event.preventDefault(); // Prevent the default link behavior
//     navigate(`/Otp/${username}`); // Navigate to the OTP page
//   }}
  
// >
//   Forgot Password?
// </MuiLink> */}
{/* //                 </Grid> */}
{/* //                 <Grid item>
//                 <MuiLink href="#" variant="body2" onClick={handleSignUpLinkClick}>
//       {"Don't have an account? Sign Up"}
//     </MuiLink>
//                 </Grid>
//               </Grid> */}
            
  
{/* //             </Box> */}
{/* //           </Box> */}
{/* //         </Box> */}
{/* //       </Container> */}
{/* //     </ThemeProvider> */}
{/* //     <SignUpDialog open={signUpDialogOpen} handleClose={handleSignUpDialogClose} />
//     </div> */}
{/* //   );
// }; */}




/////////////////

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
