import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
import L1 from "../images/doc-2.jpg";
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';
import WalletModal from './walletModal'
import AddIcon from '@mui/icons-material/Add';
import Notif from "./notifModal";
import { TextField, Button, Container, Typography} from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
 


export default function FamilyMember() {
  const [patients, setPatients] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const navigate = useNavigate();
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
const [passwords, setPasswords] = useState({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const [success, setSuccess] = useState(false); 
const handleChange = (prop) => (event) => {
  setPasswords({ ...passwords, [prop]: event.target.value });
  setSuccess(false); 
};
const handleOpenChangePassword = () => {
  setChangePasswordOpen(true);  
};
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return regex.test(password);
};
const handleCloseChangePassword = () => {
  setChangePasswordOpen(false);
};
const updatePassword = async (newPassword) => {
  try {
    // Replace '/api/reset-password' with your actual API endpoint
    const response = await axios.put('http://localhost:3000/changepassword', { id, newPassword });
    console.log(response.data);
    setAlertType1('success');
    setAlertOpen1(true);
  } catch (error) {
    console.error('Error updating password:', error);
    setAlertType1('error');
    setAlertOpen1(true);
  }
};


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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [familyMembers, setFamilyMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getFamilyMembersForUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patients/family_members/user/${id}`);
        const responseData = response.data;
        setFamilyMembers(responseData);
      } catch (error) {
        console.error('Error fetching family member data:', error);
      }
    };

    getFamilyMembersForUser();
  }, [id]);

  // Log the state whenever it changes
  useEffect(() => {
    console.log('Family Members State:', familyMembers);
  }, [familyMembers]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
 
  const [alertType, setAlertType] = useState(null);
  const [isAlertOpen, setAlertOpen] = useState(false);

  
  const [alertType1, setAlertType1] = useState(null);
  const [isAlertOpen1, setAlertOpen1] = useState(false);

  useEffect(() => {
    const temp = familyMembers
      .map((row) => ({
        id: row._id,
        fullName: row.patient.fullName,
        relation: row.relation,
      }))
      .filter(
        (row) =>
          row &&
          row.fullName &&
          row.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
    // Move setFilteredRows inside useEffect
    setFilteredRows(temp);
  }, [familyMembers, searchQuery]);
  
  const columns = [
    { field: 'fullName', headerName: 'Name', flex: 1 },
    { field: 'relation', headerName: 'Relation to Patient', flex: 1 },
  ];


  const [formData, setFormData] = useState({
    emailOrPhone: '', // Change "name" to "emailOrPhone" to collect email or phone
    relation: 'Wife', // Set a default value
  });

  const handleSubmit = () => {
    axios
    .post(`http://localhost:3000/patients/api/addFamilyMember/${id}`, formData)
    .then((response) => {
        console.log('Response:', response.data);
        handleClose();
        setAlertType('success');
        setAlertOpen(true);
      })
      .catch((error) => {
        console.log(formData)
        console.error('Error:', error);
        handleClose();
        setAlertType('error');
        setAlertOpen(true);
      });
  };


  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertType(null);
  };

  const handleAlertClose1 = () => {
    setAlertOpen1(false);
    setAlertType1(null);
  };
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };




  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/p/${id}`)
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            name: item.username,
  
            fullName: item.fullName,
            email: item.email,
            dateOfBirth: item.dateOfBirth,
            gender: item.gender,
            mobileNumber: item.mobileNumber,
          }));
          setPatients(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/apps/upcoming-appointments/${id}`)
      .then((response) => {
        if (response.data) {
          setAppointments(response.data);
        } else {
          console.error('No data received for appointments from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  }, [id]);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);

    if (Array.isArray(patients)) {
      const filteredPatients = patients.filter((patient) => {
        return patient && patient.fullName && patient.fullName.toLowerCase().includes(value);
      });

      setFilteredRows(filteredPatients);
      console.log(filteredPatients);
    }
  };



  useEffect(() => {
    if (isAlertOpen) {
      const timer = setTimeout(() => {
        handleAlertClose();
      }, 5000); // Adjust the time as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isAlertOpen, handleAlertClose]);


  useEffect(() => {
    if (isAlertOpen1) {
      const timer = setTimeout(() => {
        handleAlertClose1();
      }, 5000); // Adjust the time as needed (in milliseconds)

      return () => clearTimeout(timer);
    }
  }, [isAlertOpen1, handleAlertClose1]);




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
            padding: '5px',
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
              Family member added successfully
            </Alert>
          )}
          {alertType === 'error' && (
            <Alert severity="error" onClose={handleAlertClose}>
             Invalid Email or Phone number
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
             Password changed successfully
            </Alert>
          )}
          {alertType1 === 'error' && (
            <Alert severity="error" onClose={handleAlertClose1}>
             Failed to change password
            </Alert>
          )}
        </div>
      </Modal>
<nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
        <div className="container"  >
          <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
            <div className="col-lg-2 pr-4 align-items-center">
              <a className="navbar-brand">
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
        
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/clinic-patient-home/${id}`)}>
                  Home
                </a>
              </li>
              <li
                className="nav-item  active dropdown"
                onMouseEnter={() => setShowPersonalDropdown(true)}
                onMouseLeave={() => setShowPersonalDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowPersonalDropdown}
                >
                  Personal
                </a>
                <div
                  className={`dropdown-menu ${
                    showPersonalDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="personalDropdown"
                >
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/my-fam/${id}`)}>
                    My Family
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/MedHistory/${id}`)}>
                    My Medical History
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Prescription/${id}`)}>
                    My Prescriptions
                  </a>
                 
                </div>
              </li>
              {/* New dropdown for Doctors */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowDoctorsDropdown(true)}
                onMouseLeave={() => setShowDoctorsDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={showDoctorsDropdown}
                >
                  Doctors
                </a>
                <div
                  className={`dropdown-menu ${
                    showDoctorsDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/doctorsTable/${id}`)}>
                    Doctors List
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatient/${id}`)}>
                    My Appointments
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatientt/${id}`)}>
                    Book Appointment
                  </a>
                </div>
              </li>
              {/* New dropdown for Health Packages */}
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowHealthPackagesDropdown(true)}
                onMouseLeave={() => setShowHealthPackagesDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowHealthPackagesDropdown}
                  
                >
                  Pricings
                </a>
                <div
                  className={`dropdown-menu ${
                    showHealthPackagesDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-VIEW/${id}`)}>
                    Health Packages
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-sub/${id}`)}>
                    Subscribed Packages
                  </a>
                 
                </div>
              </li>
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"550px"}}
>
  <a style={{cursor:"pointer" } }
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
    <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={handleOpenChangePassword}>
      Change Password
    </a>
    <a className="dropdown-item" style={{cursor:"pointer" } }
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
              My Family
            </h1>
            <p className="breadcrumbs">
              <span style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Personal <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
<div>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'right', 
      gap: '16px',
      padding: '20px',
    }}
  >
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearchInputChange}
      style={{
      width: '300px',
      borderRadius: '8px', 
      padding: '8px', 
      border: '1px solid #ccc', 
      }}
    />
  </Box>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
  >
    <Box sx={{ ...style, width: 400 }}>
      <h3
        id="parent-modal-title"
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        Family Member Form
      </h3>
      <p id="parent-modal-description">
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Email or Mobile Number "
            variant="outlined"
            name="emailOrPhone" 
            value={formData.emailOrPhone}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Relation to Patient"
            variant="outlined"
            select
            SelectProps={{ native: true }}
            name="relation" // Update the name to "relation"
            value={formData.relation}
            onChange={handleInputChange}
          >
            <option value="Wife">Wife</option>
            <option value="Husband">Husband</option>
            <option value="Children">Children</option>
          </TextField>
        </div>
      </p>
      <Button
        variant="contained"
        color="primary"
        startIcon={<PersonAddIcon />}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  </Modal>
</div>;

<section className="ftco-section" style={{ padding: "1em 0", position: "relative" }}>
<div className="container" style={{ maxWidth: "1230px", margin: "0 auto" }}>
<div className="row">
  {filteredRows.map((patient, index) => (
    <div key={index} className="col-md-6 col-lg-4" style={{ marginBottom: "40px" }}>
      <div className="staff" style={{ overflow: "hidden", height: "450px" }}>
        <div className="img-wrap d-flex align-items-stretch" style={{ height: "300px" }}>
          <div className="img align-self-stretch" style={{ backgroundImage: `url(${L1})`, width: "100%", display: "block", backgroundPosition: "top center" }} />
        </div>
        <div className="text pt-3 text-center">
          <h3 style={{ fontSize: "32px", fontWeight: "500", marginBottom: "10px" }}>{ patient.fullName}</h3>
          <span className="position mb-2" style={{ textTransform: "uppercase", color: "#b3b3b3", display: "block", letterSpacing: "1px" }}>{ patient.relation}</span>
          <div className="faded">
            <p style={{ fontSize: "20px", textTransform: "uppercase" }}>{ patient.name}</p>

            <ul className="ftco-social text-center">
              <li>
                <a>
                  




                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ))}
   <div key={'add'} style={{display:'flex', 
       flexDirection:'column',
       backgroundColor:'rgba(42, 114, 207, 0.8)', 
       justifyContent:'center', 
        borderRadius:'20px',
        transition: 'background-color 0.3s', // Add transition for smooth effect
        cursor: 'pointer', // Set cursor to pointer on hover
        border:'2px solid #2a72cf'

        }}
        className="col-md-6 col-lg-4"
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#2a72cf';
          
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(42, 114, 207, 0.8)';
        }}
        onClick={handleOpen}        >
        <AddIcon style={{ fontSize: '20rem' , color:'white',width:"100%" }}/>
        <h1 style={{textAlign:'center', color:'white' ,padding:"20px"}}>Add Family Member</h1>
        </div>
</div>
</div>
</section>

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




</div>
)}