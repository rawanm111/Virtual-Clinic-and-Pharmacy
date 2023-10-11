import homepage from '../Components/Logo/homepage.png';
import Button from '@mui/material/Button';
//import TextField from '@mui/material/TextField'; // Import TextField
import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import './AdminHome.css';
import Box from '@mui/material/Box';
import AppBarComponent from '../Components/Appbar/AppbarAdmin';





const AdminHome = () => {
    return (
        <div>
            <AppBarComponent />

            <div className="content-wrapper">
            <Typography variant="h6" className="custom-text" style={{ fontSize: '40px' }}>
    Welcome to the admin dashboard,<br />
    your central hub for managing<br />
    our healthcare platform
</Typography>

                
                <img src={homepage} alt="Homepage Logo" className="custom-image" />
            </div>
        </div>
    );
}
export default AdminHome;