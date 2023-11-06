import React from 'react';
import { AppBar, Tabs, Tab, Avatar, Typography, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { Link, useLocation, useParams } from 'react-router-dom';
import Logo from './Logo.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00008B',
    },
    secondary: {
      main: '#0070F3',
    },
  },
});

function AppBarComponent({ userName }) {
  const location = useLocation();
  const { id } = useParams(); 

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const appBarStyle = {
    backgroundColor: 'white',
    height: '172px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const toolbarStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '20px',
    paddingRight: '20px',
  };

  const tabContainerStyle = {
    marginTop: '60px',
    width: '100%',
  };

  const imgStyle = {
    width: '120px',
    height: 'auto',
    marginTop: '30px',
  };

  const nameStyle = {
    marginLeft: '10px',
  };

  const tabStyle = {
    '&.MuiTab-root': {
      color: theme.palette.primary.main,
    },
    '&.Mui-selected': {
      color: theme.palette.secondary.main,
    },
  };

  const customIndicatorStyle = {
    backgroundColor: theme.palette.secondary.main,
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar style={toolbarStyle}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', marginLeft: '20px' }}>
            <Avatar src={AccountCircle} alt="Zeina Avatar" />
            <Typography variant="h6" component="div" color="primary" style={nameStyle}>
              {/* {userName} will be later on edited depending on logged in user*/} Zeina Elmofty
            </Typography>
          </div>
          <img src={Logo} style={imgStyle} alt="Logo" />
        </Toolbar>
        <div style={tabContainerStyle}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            variant="fullWidth"
            centered={false}
            sx={{ '& .MuiTabs-indicator': customIndicatorStyle }}
          >
            <Tab
              label="Home"
              sx={tabStyle}
              component={Link}
              to={`/admin-home/${id}`} 
              selected={location.pathname === `/admin-home/${id}`}  
            />
            <Tab
              label="Doctor Requests"
              sx={tabStyle}
              component={Link}
              to={`/doctor-requests/${id}`} 
              selected={location.pathname === `/doctor-requests/${id}`}  
            />
            <Tab
              label="Pharmacist Requests"
              sx={tabStyle}
              component={Link}
              to={`/pharmacist-requests/${id}`}  
              selected={location.pathname === `/pharmacist-requests/${id}`} 
            />
            <Tab
              label="User Management"
              sx={tabStyle}
              component={Link}
              to={`/user-management/${id}`} 
              selected={location.pathname === `/user-management/${id}`}  
            />
            <Tab
              label="Health Packages"
              sx={tabStyle}
              component={Link}
              to={`/health-packages/${id}`} 
              selected={location.pathname === `/health-packages/${id}`} 
            />
            <Tab
              label="Medications"
              sx={tabStyle}
              component={Link}
              to={`/admin-meds/${id}`} 
              selected={location.pathname === `/admin-meds/${id}`} 
            />
          </Tabs>
        </div>
      </AppBar>
    </ThemeProvider>
  );
}

export default AppBarComponent;
