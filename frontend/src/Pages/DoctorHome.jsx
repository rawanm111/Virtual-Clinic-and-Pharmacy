import React, { useEffect ,useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/system';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import S1 from '../css/open-iconic-bootstrap.min.css';
import S2 from '../css/animate.css';
import S3 from '../css/owl.carousel.min.css';
import S4 from '../css/owl.theme.default.min.css';
import S5 from '../css/magnific-popup.css';
import S6 from '../css/aos.css';
import S7 from '../css/ionicons.min.css';
import S8 from '../css/bootstrap-datepicker.css';
import S9 from '../css/jquery.timepicker.css';
import S10 from '../css/flaticon.css';
import S11 from '../css/icomoon.css';
import S12 from '../css/style.css';
import I1 from "../images/about.jpg";
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';
import WalletModal from './walletModal'

 export default function() {
  const [currentImage, setCurrentImage] = useState(I2);

  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [DoctorProfile, setDoctorProfile] = useState([]);
  const [username, setUsername] = useState();
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

const [alertType, setAlertType] = useState(null);
const [isAlertOpen, setAlertOpen] = useState(false);

const handleAlertClose = () => {
  setAlertOpen(false);
  setAlertType(null);
};

useEffect(() => {
  if (isAlertOpen) {
    const timer = setTimeout(() => {
      setAlertOpen(false);  // Use the state updater function
      setAlertType(null);
    }, 5000); // Adjust the time as needed (in milliseconds)

    return () => clearTimeout(timer);
  }
}, [isAlertOpen]);

  const [success, setSuccess] = useState(false); 
  const handleChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
    setSuccess(false); 
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };

  const updatePassword = async (newPassword) => {
    try {
      // Replace '/api/reset-password' with your actual API endpoint
      const response = await axios.put('http://localhost:3000/changepassword', { id, newPassword });
      console.log(response.data);
      setAlertType('success');
    setAlertOpen(true);
    } catch (error) {
      console.error('Error updating password:', error);
      setAlertType('error');
    setAlertOpen(true);
    }
  };
  const handleSubmit = () => {
    axios
      .put(`http://localhost:3000/doctors/${username}`, formData)
      .then((response) => {
        console.log('Updated doctor:', response.data);
        handleCloseUpdateModal(); // Close the update modal after updating
      })
      .catch((error) => {
        console.error('Error updating doctor:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctors/${username}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctor profile:', error);
      });
  }, [username]);

  const handleOpenUpdateModal = () => {
    setUsername(DoctorProfile.username);
    setUpdateModalOpen(true);
    setProfilePopupOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };
  const handleCloseUpdateModall = () => {
    setProfilePopupOpen(false);
  };
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    hourlyRate: 0,
    affiliation: '',
    educationalBackground: '',
    speciality: '',
    dateOfBirth: '',
  });

  const handleSubmitt = (event) => {
    event.preventDefault();
    
    setSuccess(false);

    
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New passwords don't match.");
      return;
    }

    if (!isValidPassword(passwords.newPassword)) {
      alert("Password must contain at least one capital letter, one number, and be at least 4 characters long.");
      return;
    }

    console.log('Passwords submitted:', passwords);
    
    
    
    setSuccess(true);

   
    updatePassword(passwords.newPassword)
    setChangePasswordOpen(false);

  };
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
  };

  const PopupContainer = styled('div')({
   
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 24,
    p: 4,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   
    borderRadius: 8,  
  });
  const handleProfileClick = () => {
    setProfilePopupOpen(true);
  };

  const handleProfilePopupClose = () => {
    setProfilePopupOpen(false);
  };
  


  useEffect(() => {
    const intervalId = setInterval(toggleImage, 2000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => { 
    axios
      .get(`http://localhost:3000/doctors/get/${id}`)
      .then((response) => {
        setDoctorProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching DoctorProfile:', error);
      });
  }, [id]);


  const DataTypography = styled(Typography)({
    color: '#000000',
    marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px'
  });
  
  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };
    return (
<div style={{ backgroundColor: "white" }}>
  <title>MetaCare </title>
  <Modal
        open={isAlertOpen}
        onClose={handleAlertClose}
        aria-labelledby="alert-title"
        aria-describedby="alert-description"
      >
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            // width: '300px',
            backgroundColor: '#fff',
            padding: '2px',
            borderRadius: '8px',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {alertType === 'success' && (
            <Alert severity="success" onClose={handleAlertClose}>
            Password changed successfully
            </Alert>
          )}
          {alertType === 'error' && (
            <Alert severity="error" onClose={handleAlertClose}>
           Failed to change password
            </Alert>
          )}
        </div>
      </Modal>
   <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
        <div className="container"  >
          <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
            <div className="col-lg-2 pr-4 align-items-center">
              <a className="navbar-brand" >
                Meta<span>Care</span>
              </a>
              
            </div>
          </div>
        </div>
      </nav>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light"
        id="ftco-navbar"
        
      >
        <div className="container d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
        
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" style={{marginRight:"10px"} }>
                <a className="nav-link pl-0"  onClick={() => navigate(`/doc-home/${id}`)}>
                  Home
                </a>
              </li>
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowPersonalDropdown(true)}
                onMouseLeave={() => setShowPersonalDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowPersonalDropdown}
                >
                 My Patients
                </a>
                <div
                  className={`dropdown-menu ${
                    showPersonalDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="personalDropdown"
                >
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/patientsTable/${id}`)}>
                     Patients List 
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/healthRecs/${id}`)}>
                     Patients Health Record
                     </a>
                 
                </div>
              </li>
              
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/appPageDoc/${id}`)}>
                  My Appointments
                </a>
              </li>

              
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"700px"}}
>
  <a
    className="nav-link dropdown-toggle"
    
    id="profileDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded={showProfileDropdown}
    
  >
    <FaUser style={{ fontSize: '20px', marginRight: '5px' }} />
    
  </a>
  <div
    className={`dropdown-menu ${showProfileDropdown ? 'show' : ''}`}
    aria-labelledby="profileDropdown"
  >
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={handleOpenChangePassword}>
      Change Password
    </a>
    
     {/* Change Password pop-up */}
     <Modal
        open={isChangePasswordOpen}
        onClose={handleCloseChangePassword}
        aria-labelledby="change-password-popup"
      >
        <Box
          sx={{
            marginTop: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center'}}>
              Change Password
            </Typography>
            <Box component="form" onSubmit={handleSubmitt} sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
                value={passwords.newPassword}
                onChange={handleChange('newPassword')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmNewPassword"
                label="Confirm New Password"
                type="password"
                id="confirmNewPassword"
                autoComplete="new-password"
                value={passwords.confirmNewPassword}
                onChange={handleChange('confirmNewPassword')}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>


    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={handleProfileClick}>
      My Profile
    </a>
    <Modal open={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
    <Box
          sx={{
            marginTop: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '400px',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center', margin:'5px'}}>
              Update Profile Info
            </Typography>
          <div style={{ marginBottom: '1rem' }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Hourly Rate"
            variant="outlined"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Affiliation"
            variant="outlined"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Educational Background"
            variant="outlined"
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Speciality"
            variant="outlined"
            name="speciality"
            value={formData.speciality}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Date of birth"
            variant="outlined"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
          <div style={{ marginBottom: '1rem',  display: 'flex', justifyContent: 'center'}}>
            <Button  onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </Box> </Box>
      </Modal>

    <Modal
        open={isProfilePopupOpen}
        onClose={handleProfilePopupClose}
        aria-labelledby="profile-popup"
        
      >
        <PopupContainer>
          <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center' }}>
            My Profile
          </Typography>
          <CardContent>
           
            <div>
            <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Full Name:
          </Typography>
              <DataTypography variant="body2"> {DoctorProfile.fullName}</DataTypography>
            </div>
            <div>
            <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
           Username:
          </Typography>
              <DataTypography variant="body2"> {DoctorProfile.username}</DataTypography>
            </div>
            <div>
            <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Email:
          </Typography>
               <DataTypography variant="body2"> {DoctorProfile.email}</DataTypography>  </div>
  <div>
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Date of Birth:
          </Typography>
    <DataTypography variant="body2">
       {DoctorProfile.dateOfBirth}
    </DataTypography>
  </div>
  <div> 
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
           Hourly Rate:
          </Typography>
     <DataTypography variant="body2"> {DoctorProfile.hourlyRate}</DataTypography>  </div>
  <div>  
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Speciality:
          </Typography>
    <DataTypography variant="body2"> {DoctorProfile.speciality}</DataTypography>  </div>
  <div>  
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Educational Background:
          </Typography>
    <DataTypography variant="body2"> {DoctorProfile.educationalBackground}</DataTypography>  </div>
    <div>  
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Affiliation:
          </Typography>
    <DataTypography variant="body2"> {DoctorProfile.affiliation}</DataTypography>  </div>
  
             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            
             <Button onClick={handleOpenUpdateModal}>Update my info</Button>
             <Button onClick={handleCloseUpdateModall}>Cancel</Button>
            </div>
          </CardContent>
        </PopupContainer>
      </Modal>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/clinic`)}>
      Logout
    </a>
  </div>
</li>

{/* Wallet icon without dropdown */}
<li className="nav-item ">
<WalletModal/>
</li>

            </ul>
          </div>
        </div>
      </nav>

      
  <section >
    <div
      className="slider-item"
      style={{ backgroundImage: `url(${currentImage})`, height: '560px' }}
      >
      <div className="overlay" />
      <div className="container">
        <div
          className="row no-gutters slider-text align-items-center justify-content-start"
          data-scrollax-parent="true"
          style={{height: "200px"}}
        >
          <div style={{ fontWeight: "900"}}>
            <h1 className="mb-4" style={{ fontWeight: "900" , color: "black", marginTop: "100px"}}>
              We Care
            </h1>
            <h1 className="mb-4" style={{ fontWeight: "900", fontSize: "60px" , color: "#2f89fc", marginTop: "-55px"}}>
             About our Doctors
            </h1>
            <h3 className="subheading" style={{  fontSize: "20px" }} >
              Everyday We you bring hope to your Patients 
            </h3>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div
  style={{
    marginTop:"-30px",
    paddingLeft: '120px', 
    paddingRight: '120px', 
  }}
>
<section style={{
    display: 'block',
    width: '100%',
    position: 'relative',
    MozTransition: 'all 0.3s ease',
    OTransition: 'all 0.3s ease',
    WebkitTransition: 'all 0.3s ease',
    MSTransition: 'all 0.3s ease',
    transition: 'all 0.3s ease',
  }}>
  <div className="container">
    <div className="row no-gutters" style={{ background: '#2f89fc' }}>
      {/* First column */}
      <div className="col-md-3 p-4 " style={{
        padding: '0 0 5em 0',
        }}>
        <div className="media block-6 d-block text-center">
          <div
            className="icon d-flex justify-content-center align-items-center"
            style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
            }}
          >
            <span className="flaticon-doctor" style={{ fontSize: '50px', color: '#fff' }} />
          </div>
          <div className="media-body p-2 mt-3">
            <h3 style={{ fontWeight: '500', fontSize: '22px', color: '#fff' }}>Qualitfied Doctors</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              We appreciate our doctor's at MetaCare.
            </p>
          </div>
        </div>
      </div>

      {/* Second column */}
      <div className="col-md-3 p-4 " style={{
        padding: '0 0 5em 0',
        background: '#0c75fb',
        }}>
        <div className="media block-6 d-block text-center" >
          <div
            className="icon d-flex justify-content-center align-items-center"
            style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
             
            }}
          >
            <span className="flaticon-ambulance" style={{ fontSize: '50px', color: '#fff' }} />
          </div>
          <div className="media-body p-2 mt-3">
            <h3 style={{ fontWeight: '500', fontSize: '22px', color: '#fff' }}>Emergency Care</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              You can respond to any emercency through our website at any time of the day.
            </p>
          </div>
        </div>
      </div>

      {/* Third column */}
      <div className="col-md-3 d-flex p-4 " style={{ background: '#2f89fc' }}>
        <div className="media block-6 d-block text-center">
          <div className="icon d-flex justify-content-center align-items-center" style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
             
            }}>
            <span className="flaticon-stethoscope" style={{ fontSize: '50px', color: '#fff' }} />
          </div>
          <div className="media-body p-2 mt-3">
            <h3 className="heading" style={{ fontWeight: '500', fontSize: '22px', color: '#fff' }}>Instant Booking</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            You can have your patients book an appointment right away through our Web-App.
            </p>
          </div>
        </div>
      </div>

      {/* Fourth column */}
      <div className="col-md-3 d-flex  p-4 " style={{
        padding: '0 0 5em 0',
        background: '#0c75fb',
        }}>
        <div className="media block-6 d-block text-center">
          <div className="icon d-flex justify-content-center align-items-center" style={{
              lineHeight: '1.3',
              position: 'relative',
              width: '80px',
              height: '80px',
              background: '#61a6fd',
              margin: '0 auto',
              WebkitBorderRadius: '50%',
              MozBorderRadius: '50%',
              MsBorderRadius: '50%',
              borderRadius: '50%',
             
            }}>
            <span className="flaticon-24-hours"  style={{ fontSize: '50px', color: '#fff' }}/>
          </div>
          <div className="media-body p-2 mt-3">
            <h3 className="heading" style={{ fontWeight: '500', fontSize: '20px', color: '#fff' }}>24 Hours Service</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              We grant you a platfrom in which you could provide a 24 hour service.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


  </div>
  <section >
    <div className="container">
      <div className="row no-gutters" style={{marginLeft:"15px"}}>
        <div
          className="col-md-5 p-md-5 img img-2 mt-5 mt-md-0"
          style={{ backgroundImage: `url(${I1})`, backgroundSize: 'cover'  }}
        ></div>
        <div className="col-md-7 wrap-about py-4 py-md-5 ">
          <div className=" mb-5">
            <div className="pl-md-5 ml-md-5">
              <span 
              style={{
                fontWeight: '400',
                fontSize: '13px',
                display: 'block',
                marginBottom: '0',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'black',
                position: 'relative'
              }} >About MetaCare</span>
              <h2 className="mb-4" style={{ fontSize: 24 , fontWeight:"900",color: 'black', }}>
                Medical specialty concerned with the care of acutely ill
                hospitalized patients
              </h2>
            </div>
          </div>
          <div className="pl-md-5 ml-md-5 mb-5" style={{ fontSize: 13 }}>
            <p>
            MetaCare is a leading healthcare provider dedicated to the specialized and compassionate care of acutely ill hospitalized patients. Our team of highly qualified medical professionals is committed to delivering exceptional medical services with a focus on patient well-being and recovery.
            </p>
            <div className="row mt-5 pt-2">
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-first-aid-kit" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Primary Care</h3>
                    <p>
                    Your partner in comprehensive and personalized healthcare, ensuring your well-being at every stage of life.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-dropper" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Lab Test</h3>
                    <p>
                    Accurate diagnostics and swift results, ensuring precise insights for your health.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-experiment-results" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Symptom Check</h3>
                    <p>
                    Your first step to understanding and addressing your health concerns, ensuring prompt and accurate guidance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="services-2 d-flex">
                  <div className="icon mt-2 mr-3 d-flex justify-content-center align-items-center">
                    <span className="flaticon-heart-rate" />
                  </div>
                  <div className="text">
                    <h3 style={{ color: 'black', }}>Heart Rate</h3>
                    <p>
                    Keeping a close watch on your cardiovascular health for a proactive approach to well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
)}