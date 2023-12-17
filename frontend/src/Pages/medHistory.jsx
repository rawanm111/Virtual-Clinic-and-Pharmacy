import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Radio, RadioGroup, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Modal from '@mui/material/Modal';
import { TextField} from '@mui/material';
import WalletModal from './walletModal';
import Notif from "./notifModal";
export default function MedHistoryPatient() {
  const [medicalHistory, setMedicalHistory] = useState([]);
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

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
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
  };const handleSubmit = (event) => {
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '16px',
    overflow: 'auto',
  };
  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };
  useEffect(() => {
    axios
      .get('http://localhost:3000/MedicalHistory') // Adjust the URL as needed
      .then((response) => {
        setMedicalHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching health records:', error);
      });
  }, []);
  const fetchMedicalHistory = () => {
    axios
      .get('http://localhost:3000/MedicalHistorys') // Adjust the URL as needed
      .then((response) => {
        setMedicalHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching health records:', error);
      });
  };


  const handleAddMedicalHistory = () => {
    // Implement the logic to add a new medical history entry
    // You might redirect to a form or modal for adding data
    navigate('/NewMedicalHistory');
  };

  const handleRemoveMedicalHistory = (patientId) => {
    // Implement the logic to remove a medical history entry
    axios
      .delete(`http://localhost:3000/MedicalHistorys/${patientId}`)
      .then(() => {
        // Update the state after successful deletion
        fetchMedicalHistory();
      })
      .catch((error) => {
        console.error('Error deleting health record:', error);
      });
  };
  const navigate = useNavigate();
  const { id } = useParams();
 
  const [isOpen, setIsOpen] = useState(false);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [histories, setHistories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState('');

  
  const closePaymentDialog = () => {
    setIsOpen(false);
  };




  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [alertType, setAlertType] = useState(null);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertType1, setAlertType1] = useState(null);
  const [isAlertOpen1, setAlertOpen1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteAlertType, setDeleteAlertType] = useState(null);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);


  const handleUploadFile = () => {
    if (selectedFile) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post(`http://localhost:3000/medHistory/upload/${id}`, formData)
        .then((response) => {
          console.log('File uploaded successfully');
          fetchMedicalHistories(); // Trigger refetch after upload
          setAlertType('success');
        setAlertOpen(true);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          setAlertType('error');
          setAlertOpen(true);
        })
        .finally(() => {
          setIsLoading(false); // Set loading back to false after upload completion (either success or failure)
        });
    } else {
      console.error('No file selected');
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertType(null);
  };

  const handleAlertClose1 = () => {
    setAlertOpen1(false);
    setAlertType1(null);
  };

  const handleDownloadFile = (documentName, contentType, data) => {
    const blobData = base64toBlob(data, contentType);
    const blobUrl = URL.createObjectURL(blobData);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = documentName;
    a.click();
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


  const handleDeleteFile = (documentId) => {
    setIsLoading(true);
    axios.delete(`http://localhost:3000/medHistory/delete/${id}/${documentId}`)
      .then((response) => {
        console.log('File deleted successfully');
        fetchMedicalHistories();
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
        setDeleteAlertType('error');
        setDeleteAlertOpen(true);
      })
      .finally(() => {
          setIsLoading(false); // Set loading back to false after upload completion (either success or failure)
        });
  };
  

  const base64toBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const fetchMedicalHistories = () => {
    axios.get(`http://localhost:3000/medHistory/patient/${id}`)
      .then((response) => {
        setHistories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medical histories:', error);
      });
  };

  useEffect(() => {
    fetchMedicalHistories();
  }, [id]);

  return (
    <div style={{ backgroundColor: "white" }}>
  <title>MetaCare </title>
  {isLoading && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999, // Ensure it's above other elements
          }}
        >
          <CircularProgress />
        </div>
      )}
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
              File uploaded successfully
            </Alert>
          )}
          {alertType === 'error' && (
            <Alert severity="error" onClose={handleAlertClose}>
             Failed to upload file
            </Alert>
          )}
        </div>
      </Modal>
      
      <Modal
        open={isDeleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        aria-labelledby="delete-alert-title"
        aria-describedby="delete-alert-description"
      >
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
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
          {deleteAlertType === 'error' && (
            <Alert severity="error" onClose={() => setDeleteAlertOpen(false)}>
              Failed to delete file
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
              <li className="nav-item active" style={{marginRight:"10px"} }>
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
              My Medical History
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a href="index.html">
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
<div style={{margin:"20px"}}>
    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileSelect} />
        <Button variant="contained" color="primary" onClick={handleUploadFile}>
          Upload
        </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={modalStyle}>
          <h2 id="modal-modal-title">Medical History File</h2>
          <p id="modal-modal-description">
            {fileData}
            <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </p>
        </div>
      </Modal>
      </div>
      {histories.map((history) => (
        <div style={{display:"flex",}}>
      {history.documents && history.documents.map((document) => (     

    <Card sx={{ width:"300px",m:"20px",height:"200px"}}>
      <CardContent>
        <div style= {{width:"100%",
              display:"flex",
              justifyContent:"flex-end",
              alignItems:"flex-end" }}>
        <Button onClick={() => {
                handleDeleteFile(document._id);
              }}
              style= {{color:"red", 
              display:"flex",
              justifyContent:"flex-end",
              alignItems:"flex-end" }}
              >DELETE</Button>
              </div>
        <Typography key={document._id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {document.filename}
        </Typography>
        
        <Typography variant="h5" component="div">
          
        </Typography>
        
        
      </CardContent>
      <CardActions>
      <div style= {{width:"100%",
              display:"flex",
              justifyContent:"center",
              alignItems:"center" ,}}>
        <Button size="small" onClick={() => {
        handleDownloadFile(document.filename, document.contentType, document.data);
        }}
        style={{
        color:"green",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"6px",
        borderRadius:"15px",
        border:"1px solid green",}}
        >Download Content</Button>
         </div>               
      </CardActions>
    </Card>
    ))}
    </div>
       ))}
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
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
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