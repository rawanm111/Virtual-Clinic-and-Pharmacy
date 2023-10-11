import patient from '../Components/Logo/patient.png';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField'; // Import TextField
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import './PatientHomeClinic.css';
import Box from '@mui/material/Box';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';



const PatientHomeClinic = () => {
    return(
        <div>
        <AppBarComponent />

        <div className="content-wrapper">
        <Typography variant="h6" className="custom-text" style={{ fontSize: '40px' }}>
        Welcome to MetaCare, where your health<br />
        takes center stage. Partner with us to schedule <br />
        appointments, access records,and take control <br />
        of your well-being. Together, we're on the path<br />
        to better health and a brighter future.
        

</Typography>

            
            <img src={patient} alt="Homepage Logo" className="custom-image" />
        </div>
    </div>



    )

}
export default PatientHomeClinic;



