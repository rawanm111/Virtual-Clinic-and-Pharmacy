import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
import WalletModal from './walletModal';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
export default function HealthPackagesView() {
  const [healthPackages, setHealthPackages] = useState([]);
  
  const [selectedHealthPackage, setSelectedHealthPackage] = useState('');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState(0);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyHealthPackages, setFamilyHealthPackages] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState('wallet');
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
  };  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };
  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };
  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
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


  const handleSubmitt= (event) => {
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
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [selectedPackageName, setSelectedPackageName] = useState(''); // New state
  const [isOpen, setIsOpen] = useState(false);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [activePackage, setActivePackage] = useState('My Packages');
  const [filteredPackages, setFilteredPackages] = useState();
  const handlePackageClick = (packageName,id) => {
    setSelectedFamilyMember(id);
    console.log(id);
    setActivePackage(packageName);
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
    
        if (selectedFamilyMember === 0) {
          const individualPackages = await axios.get(`http://localhost:3000/PatientPackages/${id}`);
          const individualData = individualPackages.data.map((row, index) => ({ ...row, id: `individual-${index}` }));
          setFilteredPackages(individualData);
        } else {
          const familyPackages = await axios.get(`http://localhost:3000/PatientPackages/${selectedFamilyMember}`);
          const packagesData = familyPackages.data.map((row, index) => ({ ...row, id: `individual-${index}` }));
          setFilteredPackages(packagesData);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        
      }
    };

    fetchPackages();
  }, [id, selectedFamilyMember]);
  const calculatePackageWidth = () => {
    return `calc(50% - 20px)`; // Adjusted to include margin
  };


  const getPackageStyles = (packageName) => {
    const baseStyles = {
      padding: '35px 30px !important',

      marginBottom: '0',
      color: '#000000',
      fontSize: '22px',
      fontWeight: '600',
      position: 'relative',
      display: 'inline-block',
      border: '1px solid transparent',
      width: `calc(100% / ${familyMembers.length + 1})`,
      cursor: 'pointer',
    };

    if (activePackage === packageName) {
      return {
        ...baseStyles,
        background: '#2f89fc',
        color: 'white',
        borderRadius: '8px ',
      };
    } else {
      return {
        ...baseStyles,
        background: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '8px ', 
      };
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/family_members/user/${id}`)
      .then((response) => {
        if (response.data) {
          setFamilyMembers(response.data);
        } else {
          console.error('No family members data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching family members:', error);
      });
  }, [id]);

  const handleCancel = async (packageName) => {
    try {
      packageName = packageName.replace(' ', '-');
      console.log(packageName);
      let cancelUrl;
      if(selectedFamilyMember==0)
      cancelUrl = `http://localhost:3000/PatientPackages/${id}/cancel-package/${packageName}`;
      else
      cancelUrl = `http://localhost:3000/PatientPackages/${selectedFamilyMember}/cancel-package/${packageName}`;

      await axios.put(cancelUrl);
      console.log('Package status updated');

      const fetchPackages = async () => {
        try {
      
          if (selectedFamilyMember === 0) {
            const individualPackages = await axios.get(`http://localhost:3000/PatientPackages/${id}`);
            const individualData = individualPackages.data.map((row, index) => ({ ...row, id: `individual-${index}` }));
            setFilteredPackages(individualData);
            setAlertType('success');
            setAlertOpen(true);
          } else {
            const familyPackages = await axios.get(`http://localhost:3000/PatientPackages/${selectedFamilyMember}`);
            const packagesData = familyPackages.data.map((row, index) => ({ ...row, id: `individual-${index}` }));
            setFilteredPackages(packagesData);
            setAlertType('success');
            setAlertOpen(true);
          }
        } catch (error) {
          console.error('Error fetching packages:', error);
          setAlertType('error');
          setAlertOpen(true);
        } finally {
          
        }
      };
  
      fetchPackages();
    } catch (error) {
      console.error('Error updating package status:', error);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/family_members/user/${id}`)
      .then((response) => {
        if (response.data) {
          setFamilyMembers(response.data);
        } else {
          console.error('No family members data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching family members:', error);
      });
  }, [id]);  const openPaymentDialog = () => {
    setIsPaymentDialogOpen(true);
  };
  const closePaymentDialog = () => {
    setIsOpen(false);
  };
  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };


  useEffect(() => {
    axios
      .get('http://localhost:3000/health-packages')
      .then((response) => {
        const packagesWithId = response.data.map((pkg) => ({
          ...pkg,
          id: pkg._id,
        }));
        setHealthPackages(packagesWithId);
      })
      .catch((error) => {
        console.error('Error fetching health packages:', error);
      });
  }, []);

  const [packageType, setPackageType] = useState('');

  const handlePackageTypeChange = (event) => {
    setPackageType(event.target.value, () => {
      console.log('Updated Package Type:', packageType);
    });
  };



  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleSubmit = async (event) => {
    // event.preventDefault();

    const formatDate = (date) => {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      day = day < 10 ? '0' + day : day;
      month = month < 10 ? '0' + month : month;

      return `${day}/${month}/${year}`;
    };

    const currentDate = new Date();
    const startDate = formatDate(currentDate);
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    const endDate = formatDate(currentDate);

    const packageData = {
      patient: selectedFamilyMember === 'myself' ? id : selectedFamilyMember,
      package: selectedPackageId,
      status: 'Subscribed',
      startdate: startDate,
      enddate: endDate,
    };

    try {
      const response = await axios.post('http://localhost:3000/PatientPackages', packageData);
      console.log('Package created:', response.data);
    } catch (error) {
      console.error('Error creating package:', error.response ? error.response.data : error.message);
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
             Subscription cancelled successfully
            </Alert>
          )}
          {alertType === 'error' && (
            <Alert severity="error" onClose={handleAlertClose}>
             Failed to cancel Subscription
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
        
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item" style={{marginRight:"10px" } }>
                <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/clinic-patient-home/${id}`)}>
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
                   style={{cursor:"pointer" } }
                >
                  Personal
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
                   onClick={() => navigate(`/my-fam/${id}`)}  style={{cursor:"pointer" } }>
                    My Family
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/MedHistory/${id}`)}  style={{cursor:"pointer" } }>
                    My Medical History
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Prescription/${id}`)}  style={{cursor:"pointer" } }>
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
                  
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={showDoctorsDropdown}
                  style={{cursor:"pointer" } }
                >
                  Doctors
                </a>
                <div
                  className={`dropdown-menu ${
                    showDoctorsDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/doctorsTable/${id}`)}  style={{cursor:"pointer" } }>
                    Doctors List
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/appPagePatient/${id}`)}  style={{cursor:"pointer" } }>
                    My Appointments
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatientt/${id}`)}>

                    Book Appointment
                  </a>
                </div>
              </li>
              
              <li
                className="nav-item dropdown active"
                onMouseEnter={() => setShowHealthPackagesDropdown(true)}
                onMouseLeave={() => setShowHealthPackagesDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                 
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowHealthPackagesDropdown}
                  style={{cursor:"pointer" } }
                >
                  Pricings
                </a>
                <div
                  className={`dropdown-menu ${
                    showHealthPackagesDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="doctorsDropdown"
                >
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-VIEW/${id}`)}  style={{cursor:"pointer" } }>
                    Health Packages
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                 onClick={() => navigate(`/health-packages-sub/${id}`)}  style={{cursor:"pointer" } }>
                    Subscribed Packages
                  </a>
                 
                </div>
              </li>
              {/* Profile dropdown */}
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"640px"}}
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
              Family's Subscribed Health Packages
            </h1>
            <p className="breadcrumbs">
              <span style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Pricings <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>   
    <section
        className="hero-wrap hero-wrap-2"
        data-stellar-background-ratio="0.5"
        style={{ height: 'auto' }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingRight: '100px',
            paddingLeft: '100px',
            marginTop: '20px',
          }}
        >
          <div className="col-md-12 nav-link-wrap">
          <div className='nav nav-pills d-flex text-center' style={{
        fontFamily: '"Work Sans", Arial, sans-serif',
        background: '#fff',
        fontSize: '16px',
        lineHeight: '1.8',
        fontWeight: '400',
        color: 'rgba(0, 0, 0, 0.6)',
      }}>
        <a
          style={getPackageStyles('My Packages')}
          onClick={() => handlePackageClick('My Packages',0)}
        >
          My Packages
        </a>

        {familyMembers.map((member, index) => (
          <a
            key={index}
            style={getPackageStyles(`${member.patient.fullName}'s Packages`)}
            onClick={() => handlePackageClick(`${member.patient.fullName}'s Packages`,member.patient._id) }
          >
            {member.patient.fullName}'s Packages
          </a>
        ))}
      </div>
          </div>
        </div>

        <div className="row" style={{  paddingLeft: '120px' ,paddingRight: '90px' ,width:'100%' }}>
          {filteredPackages && filteredPackages.map((pack) => (
            <div
              className="col-md-6 text-center"
              key={pack.id}
              style={{ width: calculatePackageWidth(), paddingRight: '10px', paddingLeft: '10px' }}
            >
              <div
                className="pricing-entry pb-5 text-center"
                style={{
                  borderRadius: '8px',
                  paddingRight: '20px',
                  paddingLeft: '20px',
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <div>
                  <h3 className="price">{pack.package}</h3>
                  <p>
                    <span className="price">Status:</span>{' '}
                    <span>{pack.status}</span>
                  </p>
                  <p>
                    <span className="price">Start Date:</span>{' '}
                    <span>{pack.startdate}</span>
                  </p>
                  <p>
                    <span className="price">End Date:</span>{' '}
                    <span>{pack.enddate}</span>
                  </p>
                </div>

                <p className="button text-center">
                  <Button
                    variant="contained"
                    color="primary"
                    className="btn btn-primary px-4 py-3"
                    onClick={() => handleCancel(pack.package)}
                  >
                    Cancel Subscription
                  </Button>
                </p>
              </div>
            </div>
          ))}
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
)};