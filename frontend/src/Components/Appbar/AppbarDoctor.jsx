import React from 'react';
import { AppBar, Tabs, Tab, Avatar, Typography, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AccountCircle } from '@mui/icons-material';
import { Link, useLocation, useNavigate , useParams} from 'react-router-dom';
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
  const [value, setValue] = React.useState(0);
  const { id } = useParams(); 
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

  const handleAvatarClick = () => {
    navigate(`/doc-profile/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar style={toolbarStyle}>
          <Link to={`/doc-profile/${id}`} onClick={handleAvatarClick}>
            <Avatar src={AccountCircle} alt="Zeina Avatar" />
          </Link>
          <Typography variant="h6" component="div" color="primary" style={nameStyle}>
            {/* {userName} will be later on edited depending on the logged-in user */} Zeina Elmofty
          </Typography>
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
              to={`/doc-home/${id}`}
              selected={location.pathname === `/doc-home/${id}`}
            />
            <Tab
              label="Appointments"
              sx={tabStyle}
              component={Link}
              to={`/appPageDoc/${id}`}
              selected={location.pathname === `/appPageDoc/${id}`}
            />
            <Tab
              label="Patients"
              sx={tabStyle}
              component={Link}
              to={`/patientsTable/${id}`}
              selected={location.pathname === `/patientsTable/${id}`}
            />
            <Tab
              label="Health Records"
              sx={tabStyle}
              component={Link}
              to={`/health-recs/${id}`}
              selected={location.pathname === `/health-recs/${id}`}
            />
            <Tab
              label="Medical History"
              sx={tabStyle}
              component={Link}
              to={`/MedicalHistory`}
              selected={location.pathname === `/MedicalHistory`}
            />
          
          </Tabs>
        </div>
      </AppBar>
    </ThemeProvider>
  );
}

export default AppBarComponent;
