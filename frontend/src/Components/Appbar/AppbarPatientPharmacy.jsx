import React from 'react';
import { AppBar, Tabs, Tab, Avatar, Typography, Toolbar , Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
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

function AppBarComponent({ userName}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSignOut = () => {
    // Sign out logic goes here
    navigate('/pharm'); // Redirects to the login page
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

  // Function to handle Avatar click
  const handleAvatarClick = () => {
    navigate(`/patient-profile/${id}`);
  };
 

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar style={toolbarStyle}>
          <Link to={`/patient-profile/${id}`} onClick={handleAvatarClick}>
            <Avatar src={AccountCircle} alt="Zeina Avatar" />
          </Link>
          <Typography variant="h6" component="div" color="primary" style={nameStyle}>
            {/* {userName} will be later on edited depending on the logged-in user */} Zeina Elmofty
          </Typography>
          <Button color="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
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
              to={`/pharm-patient-home/${id}`}
              selected={location.pathname === `/pharm-patient-home/${id}`}
            />
            <Tab
              label="Medications"
              sx={tabStyle}
              component={Link}
              to={`/patient-meds/${id}`}
              selected={location.pathname === `/patient-meds/${id}`}
            />
          </Tabs>
        </div>
      </AppBar>
    </ThemeProvider>
  );
}

export default AppBarComponent;
