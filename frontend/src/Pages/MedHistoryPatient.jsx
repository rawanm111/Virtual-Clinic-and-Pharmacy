import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import AppBarComponent from '../Components/Appbar/AppbarPatientClinc';
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



export default function MedHistoryPatient() {
  const [medicalHistory, setMedicalHistory] = useState([]);
   
  const NameTypography = styled(Typography)({
    color: '#000080',
    marginBottom: '1rem',
    fontWeight: 'bold',
  });
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

  const handleUploadFile = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post(`http://localhost:3000/medHistory/upload/${id}`, formData)
        .then((response) => {
          console.log('File uploaded successfully');
          fetchMedicalHistories(); // Trigger refetch after upload
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    } else {
      console.error('No file selected');
    }
  };

  const handleDownloadFile = (documentName, contentType, data) => {
    const blobData = base64toBlob(data, contentType);
    const blobUrl = URL.createObjectURL(blobData);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = documentName;
    a.click();
  };

  const handleDeleteFile = (documentId) => {
    axios.delete(`http://localhost:3000/medHistory/delete/${id}/${documentId}`)
      .then((response) => {
        console.log('File deleted successfully');
        fetchMedicalHistories();
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
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
   <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
        <div className="container"  >
          <div className="row no-gutters d-flex align-items-start align-items-center px-3 px-md-0">
            <div className="col-lg-2 pr-4 align-items-center">
              <a className="navbar-brand" href="index.html">
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
              <li className="nav-item" style={{marginRight:"10px"} }>
                <a href="index.html" className="nav-link pl-0"  onClick={() => navigate(`/clinic-patient-home/${id}`)}>
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
                  href="#"
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
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/my-fam/${id}`)}>
                    My Family
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/MedHistory/${id}`)}>
                    My Medical History
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/Prescription/${id}`)}>
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
                  href="#"
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
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/doctorsTable/${id}`)}>
                    Doctors List
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/appPagePatient/${id}`)}>
                    My Appointments
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#" onClick={() => navigate(`/appPagePatient/${id}`)}>
                    Book Appointment
                  </a>
                </div>
              </li>
              
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowHealthPackagesDropdown(true)}
                onMouseLeave={() => setShowHealthPackagesDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
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
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#" onClick={() => navigate(`/health-packages-VIEW/${id}`)}>
                    Health Packages
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#" onClick={() => navigate(`/health-packages-sub/${id}`)}>
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
    href="#"
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
                  href="#" onClick={() => navigate(`/changepassTwo/${id}`)}>
      Change Password
    </a>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#" onClick={() => navigate(`/clinic`)}>
      Logout
    </a>
  </div>
</li>

{/* Wallet icon without dropdown */}
<li className="nav-item ">
  <a className="nav-link" href="#" onClick={() => navigate(`/wallet`)}>
    <FaWallet style={{ fontSize: '20px', marginRight: '5px' }} />
  
  </a>
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
              {history.documents && history.documents.map((document) => (     
        <Typography key={document._id} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {document.filename}
        </Typography>
        ))}
        <Typography variant="h5" component="div">
          
        </Typography>
        
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
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
)};