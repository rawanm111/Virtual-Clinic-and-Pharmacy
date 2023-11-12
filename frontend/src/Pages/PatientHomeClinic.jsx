
import React from 'react';
import Typography from '@mui/material/Typography';
import img from '../Components/Logo/patient.png'; // Updated image import
import './PatientHomeClinic.css';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';

const PatientHomeClinic = () => {
  const containerStyle = {
    backgroundColor: 'lightblue',
    position: 'relative',
    height: '50vh',
  };

  const textWrapperStyle = {
    position: 'absolute',
    top: '50%',
    left: '20px',
    color: '#007BFF',
    lineHeight: '1.2',
    fontSize: '40px',
  };

  const imageStyle = {
    position: 'absolute',
    top: '40%',
    left: '900px',
    width: '35%',
  };

  return (
    <div>
      <AppBarComponent />
      <div style={containerStyle} className="content-wrapper">
        <Typography variant="h6" style={textWrapperStyle}>
          Welcome to MetaCare, where your health<br />
          takes center stage. Partner with us to schedule <br />
          appointments, access records, and take control <br />
          of your well-being. Together, we're on the path<br />
          to better health and a brighter future.
        </Typography>
        <img src={img} alt="Homepage Logo" style={imageStyle} className="custom-image" />
      </div>
    </div>
  );
};

export default PatientHomeClinic;
