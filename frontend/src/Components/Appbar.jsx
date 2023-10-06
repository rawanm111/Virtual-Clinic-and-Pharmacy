import React from 'react';
import { AppBar, Tabs, Tab, Avatar, Typography, Toolbar, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

function AppBarComponent({ userName }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Avatar src={AccountCircle} alt="User Avatar" />
        <Typography variant="h6" component="div">
          {/* {userName} will be later on edited depending on logged in user*/} Zeina Elmofty
        </Typography>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Doctor Requests" />
          <Tab label="Pharmacist Requests" />
          <Tab label="User Management" />
          <Tab label="Health Packages" />
          <Tab label="Medications" />
        </Tabs>
        <IconButton color="inherit">
          <img src="your-image-url.png" alt="Your Image" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarComponent;