import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField'; // Import TextField
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import './DoctorHome.css';
import Box from '@mui/material/Box';
import AppBarComponent from '../Components/Appbar/AppbarDoctor';



const DoctorHome = () => {
    return(
        <div>
        <AppBarComponent />

        <div className="content-wrapper">
        <Typography variant="h6" className="custom-text" style={{ fontSize: '40px' }}>
        Welcome, Dr.Zeina ! With MetaCare,<br />
        providing top-quality healthcare is easier than ever.<br />
        Manage appointments, access records, and elevate <br />
        your practice with our user-friendly platform. Together,<br />
        let's shape the future of healthcare<br />
        and make a difference in patients' lives.

</Typography>

            
            <img src={img} alt="Homepage Logo" className="custom-image" />
        </div>
    </div>



    )

}
export default DoctorHome;
