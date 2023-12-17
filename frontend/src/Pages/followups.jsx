import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardContent from '@mui/material/CardContent';
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
import { useNavigate,useParams } from 'react-router-dom';
import { FaUser, FaWallet } from 'react-icons/fa';
import WalletModal from './walletModal'
import Notif from "./notifdoc";
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { FaMessage} from 'react-icons/fa6';
// Move base64toBlob function here
const base64toBlob = (base64Data, contentType) => {
  try {
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  } catch (error) {
    console.error('Error decoding base64:', error);
    return null; // Return null to indicate an error
  }
};




function AdminRequests() {

  const { id } = useParams();
  const [DoctorProfile, setDoctorProfile] = useState([]);
  const [username, setUsername] = useState();
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [success, setSuccess] = useState(false); 
  const handleChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
    setSuccess(false); 
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };
  const sendNotifA = async () => {
    try {
      const response = await axios.get('http://localhost:3000/apps/notifications/accepted');
      // Process the response as needed
      console.log('Last Appointment:', response.data);
    } catch (error) {
      console.error('Error fetching last appointment:', error);
    }
  };
  
  const sendNotifR = async () => {
    try {
      const response = await axios.get('http://localhost:3000/apps/notifications/rejected');
      // Process the response as needed
      console.log('Last Appointment:', response.data);
    } catch (error) {
      console.error('Error fetching last appointment:', error);
    }
  };
  
  useEffect(() => {
    axios
      .get(`http://localhost:3000/followup/doctor/${id}`)
      .then((response) => {
        setAdminRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Admin Requests:', error);
      });
  }, []);
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
        setAlertType1('success');
        setAlertOpen1(true);
        console.log('Updated doctor:', response.data);
        handleCloseUpdateModal(); // Close the update modal after updating
      })
      .catch((error) => {
        setAlertType1('error');
        setAlertOpen1(true);
        console.error('Error updating doctor:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [alertType, setAlertType] = useState(null);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertType1, setAlertType1] = useState(null);
  const [isAlertOpen1, setAlertOpen1] = useState(false);
  
  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertType(null);
  };
  const handleAlertClose1 = () => {
    setAlertOpen1(false);
    setAlertType1(null);
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
  
  useEffect(() => {
    if (isAlertOpen1) {
      const timer = setTimeout(() => {
        setAlertOpen1(false);  // Use the state updater function
        setAlertType1(null);
      }, 5000); // Adjust the time as needed (in milliseconds)
  
      return () => clearTimeout(timer);
    }
  }, [isAlertOpen1]);
  
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
  const [adminRequests, setAdminRequests] = useState([]);
  const navigate = useNavigate();
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState(I2);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/drReq')
      .then((response) => {
        setAdminRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Admin Requests:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/drReq')
      .then((response) => {
        setAdminRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Admin Requests:', error);
      });
  }, []);


  const handleRejectRequest = (requestId, adminRequest) => {
    const appointmentData = {
      doctor: id, 
      patient:  adminRequest.patient._id,
      date: adminRequest.date, 
      status:"Rejected Followup"
    };
  
  
    // Create the upcoming appointment
    axios
      .post('http://localhost:3000/apps', appointmentData)
      .then((response) => {
        console.log('Appointment created successfully:', response.data);
        // Optionally handle success, such as showing a success message to the admin
      })
      .catch((error) => {
        console.error('Error creating appointment:', error);
        // Optionally handle errors, such as showing an error message to the admin
      });
  
    // Delete the follow-up request
    axios
      .delete(`http://localhost:3000/followup/del/${requestId}`)
      .then((response) => {
        console.log('Request rejected and removed successfully');
        // Optionally handle success, such as showing a success message to the admin
      })
      .catch((error) => {
        console.error('Error rejecting request:', error);
        // Optionally handle errors, such as showing an error message to the admin
      });
      window.location.reload();

  };

  const handleAcceptRequest = (requestId, adminRequest) => {
    const appointmentData = {
      doctor: id, 
      patient:  adminRequest.patient._id,
      date: adminRequest.date, 
      status:"Accepted Followup"
    };
  
    // Create the upcoming appointment
    axios
      .post('http://localhost:3000/apps', appointmentData)
      .then((response) => {
        console.log('Appointment created successfully:', response.data);
        // Optionally handle success, such as showing a success message to the admin
      })
      .catch((error) => {
        console.error('Error creating appointment:', error);
        // Optionally handle errors, such as showing an error message to the admin
      });
  
    // Delete the follow-up request
    axios
      .delete(`http://localhost:3000/followup/del/${requestId}`)
      .then((response) => {
        console.log('Request rejected and removed successfully');
        // Optionally handle success, such as showing a success message to the admin
      })
      .catch((error) => {
        console.error('Error rejecting request:', error);
        // Optionally handle errors, such as showing an error message to the admin
      });
      window.location.reload();
  };

  const handleForward = () => {
    if (currentRequestIndex < adminRequests.length - 1) {
      setCurrentRequestIndex(currentRequestIndex + 1);
    }
  };

  const handleBackward = () => {
    if (currentRequestIndex > 0) {
      setCurrentRequestIndex(currentRequestIndex - 1);
    }
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
      <Modal
        open={isAlertOpen1}
        onClose={handleAlertClose1}
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
          {alertType1 === 'success' && (
            <Alert severity="success" onClose={handleAlertClose1}>
            Your info updated successfully
            </Alert>
          )}
          {alertType1 === 'error' && (
            <Alert severity="error" onClose={handleAlertClose1}>
           Failed to update your Info
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
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a className="nav-link pl-0"  onClick={() => navigate(`/doc-home/${id}`)}>
                  Home
                </a>
              </li>
              <li
                className="nav-item dropdown active"
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
                     <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Prescriptions/${id}`)}>
                     Patients Prescriptions
                     </a>
                     <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/follow-ups/${id}`)}>
                    Follow-up Requests
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
  style={{marginLeft:"550px"}}
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
<li className="nav-item ">
<Notif/>
</li>
<li 
  className="nav-item dropdown "
  onMouseEnter={() => setShowMessagesDropdown(true)}
  onMouseLeave={() => setShowMessagesDropdown(false)}

>
  <a
    className="nav-link dropdown-toggle"
    style={{cursor:"pointer" } } 
    id="profileDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded={showMessagesDropdown}
    
  >
    <FaMessage style={{ fontSize: '20px', marginRight: '5px' }} />
    
  </a>
  <div
    className={`dropdown-menu ${showMessagesDropdown ? 'show' : ''}`}
    aria-labelledby="profileDropdown"
  >
   <a
    className="dropdown-item" style={{cursor:"pointer" } } 
    onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
    onMouseLeave={(e) => e.target.style.backgroundColor = ''}
    onClick={() => navigate(`/messagesDoctoPat/${id}`)}
  >
    Chat with Patient
  </a>
  <a
    className="dropdown-item" style={{cursor:"pointer" } } 
    onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
    onMouseLeave={(e) => e.target.style.backgroundColor = ''}
    onClick={() => navigate(`/messagesDoctoPharm/${id}`)}
  >
    Chat with Pharmacist
  </a>
  </div>
</li>     
            </ul>
          </div>
        </div>
      </nav>
      <section
      className="hero-wrap hero-wrap-2"
      style={{ backgroundImage: `url(${I2})` }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay" />
      <div className="container">
        <div className="row no-gutters slider-text align-items-center justify-content-center">
          <div className="col-md-9  text-center" style={{ fontWeight: 'bold', fontSize: '72px' }}>
            <h1 className="mb-2 bread" style={{ fontWeight: 'bold', fontSize: '72px' }}>
              Follow-up Requests
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Patients <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <div className="col-12 text-center mt-3">
</div>

    <div className="container" style={{marginTop:'40px'}}>
    

    <div className="col-12 text-center mt-3">
        <Button
          variant="contained"
          color="primary"
          className="btn btn-primary px-4 py-3"
          style={{ marginRight: '10px', borderRadius: '8px' , width:'40%'}}
          onClick={() => {
            handleAcceptRequest(adminRequests[currentRequestIndex]._id, adminRequests[currentRequestIndex]);
            sendNotifA();
          }}
          
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="btn btn-primary px-4 py-3"
          style={{ borderRadius: '8px' , width:'40%'}}
          //onClick={() => handleRejectRequest(adminRequests[currentRequestIndex]._id, adminRequests[currentRequestIndex])}
          onClick={() => {
            handleRejectRequest(adminRequests[currentRequestIndex]._id, adminRequests[currentRequestIndex])
            sendNotifR();
          }}
          
        >
          Reject
        </Button>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <div className="row">
          {/* Left Arrow Button */}
          <div className="col-md-1 text-center mt-3">
            <Button
              variant="contained"
              color="primary"
              className="btn btn-primary px-4 py-3"
              style={{ borderRadius: '20px'  , marginTop:'130px'}}
              onClick={handleBackward}
              disabled={currentRequestIndex === 0}
            >
              <ArrowBackIcon />
            </Button>
          </div>

          {adminRequests.length > 0 && (
          <div className="col-md-10 text-center">
            <div
              className="pricing-entry pb-5 text-center"
              style={{
                marginBottom:'5%',
                borderRadius: '8px',
                ":hover": {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <div>
                <img
                  src={I3}
                  alt="Request Image"
                  className="img-fluid mb-4"
                  style={{ borderRadius: '50%', width: '100px', height: '100px' }}
                />
                <h3 className="mb-4">Appointment Request</h3>
                <p>Patient: {adminRequests[currentRequestIndex].patient.fullName}</p>
                <p>Appointment date: {adminRequests[currentRequestIndex].date}</p>
               
              
              </div>
            </div>
          </div>
        )}

          {/* Right Arrow Button */}
          <div className="col-md-1 text-center mt-3">
            <Button
              variant="contained"
              color="primary"
              className="btn btn-primary px-4 py-3"
              style={{ borderRadius: '20px' , marginTop:'130px' }}
              onClick={handleForward}
              disabled={currentRequestIndex === adminRequests.length - 1}
            >
              <ArrowForwardIcon />
            </Button>
           </div>
      </div>
    </div>
    </div>
    </div>
    )}

export default AdminRequests;
