import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AppBarComponent from '../Components/Appbar/AppbarDoctor';
import img from '../Components/Logo/img.png'; // Updated image import

const DoctorHome = () => {

  const textWrapperStyle = {
    position: 'absolute',
    top: '50%',
    left: '100px',
    color: '#007BFF',
    lineHeight: '1.2',
    fontSize: '40px',
  };

  const imageStyle = {
    position: 'absolute',
    top: '50%',
    left: '1100px',
    width: '20%',
  };

  return (
    <div>
      <AppBarComponent />
        <Typography variant="h6" style={textWrapperStyle}>
          Welcome, Doctor ! With MetaCare,<br />
          providing top-quality healthcare is easier than ever.<br />
          Manage appointments, access records, and elevate <br />
          your practice with our user-friendly platform. Together,<br />
          let's shape the future of healthcare<br />
          and make a difference in patients' lives.
        </Typography>

        <img src={img} alt="Homepage Logo" style={imageStyle} />
      </div>
  );
};

export default DoctorHome;
