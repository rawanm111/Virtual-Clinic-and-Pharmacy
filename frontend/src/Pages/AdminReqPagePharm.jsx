import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
      .get('http://localhost:3000/api/pharmcistReq')
      .then((response) => {
        setAdminRequests(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Admin Requests:', error);
      });
  }, []);

  const handleRejectRequest = (requestId) => {
    setAdminRequests(adminRequests.filter((req) => req._id !== requestId));

    axios
      .delete(`http://localhost:3000/api/pharmcistReq/delete/${requestId}`)
      .then((response) => {
        console.log('Request rejected and removed successfully');
      })
      .catch((error) => {
        console.error('Error rejecting request:', error);
      });
  };

  const handleAcceptRequest = (requestId, adminRequest) => {
    const requestData = {
      fullName: adminRequest.fullName,
      username: adminRequest.username,
      email: adminRequest.email,
      password: adminRequest.password,
      dateOfBirth: adminRequest.dateOfBirth,
      hourlyRate: adminRequest.hourlyRate,
      affiliation: adminRequest.affiliation,
      educationalBackground: adminRequest.educationalBackground,
    };
    axios
      .post('http://localhost:3000/pharmacists/', requestData)
      .then((response) => {
        console.log('Request accepted successfully');
        axios
          .delete(`http://localhost:3000/api/pharmcistReq/delete/${requestId}`)
          .then((response) => {
            setAdminRequests(adminRequests.filter((req) => req._id !== requestId));
          })
          .catch((error) => {
            console.error('Error removing request:', error);
          });
      })
      .catch((error) => {
        console.error('Error accepting request:', error);
      });
  };

  const handleDownloadFile = (fileInfo, fileName) => {
    if (fileInfo && fileInfo.buffer && fileInfo.buffer.length > 0) {
      const fileExtension = fileName.split('.').pop().toLowerCase();
    
      // Map file extensions to content types
      const contentTypeMap = {
        pdf: 'application/pdf',
        png: 'image/png',
        // Add more mappings as needed
      };
    
      const contentType = contentTypeMap[fileExtension] || 'application/octet-stream';
    
      console.log('File Extension:', fileExtension);
      console.log('Content Type:', contentType);
    
      const blobData = base64toBlob(fileInfo.buffer, contentType);
      if (blobData) {
        const blobUrl = URL.createObjectURL(blobData);
    
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        a.click();
      } else {
        console.error('Invalid base64 data for file:', fileName);
        // Handle the error, e.g., show a message to the user
      }
    } else {
      console.error('No or invalid file data for file:', fileName);
      // Handle the error, e.g., show a message to the user
    }
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
       <nav className="navbar py-4 navbar-expand-lg ftco_navbar navbar-light bg-light flex-row">
            <div className="container"
              >
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
                    <a  className="nav-link pl-0"  onClick={() => navigate(`/admin-home`)} style={{cursor:"pointer" } }>
                      Home
                    </a>
                  </li>
                  <li
                    className="nav-item dropdown active"
                    onMouseEnter={() => setShowPersonalDropdown(true)}
                    onMouseLeave={() => setShowPersonalDropdown(false)}
                  >
                    <a
                      className="nav-link dropdown-toggle active"
                      
                      id="doctorsDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded={setShowPersonalDropdown}
                      style={{cursor:"pointer" } }
                    >
                      Users
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
                      onClick={() => navigate(`/userManagement`)}
                      style={{cursor:"pointer" } }>
                        User Management
                      </a>
                      <a className="dropdown-item" 
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                       onClick={() => navigate(`/doctor-requests`)} 
                       style={{cursor:"pointer" } }>
                        Doctor Requests
                      </a>
                      <a className="dropdown-item" 
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                       onClick={() => navigate(`/pharmacist-requests`)}
                       style={{cursor:"pointer" } }>
                        Pharmacist Requests
                      </a>
                     
                    </div>
                  </li>
                  {/* New dropdown for Doctors */}
                  <li className="nav-item " style={{marginRight:"10px"} }>
                    <a  className="nav-link pl-0"  onClick={() => navigate(`/admin-meds`)} style={{cursor:"pointer" } }>
                    Pharmacy Store
                    </a>
                  </li>
                  {/* New dropdown for Health Packages */}
                  <li className="nav-item " style={{marginRight:"10px"} }>
                    <a  className="nav-link pl-0"  onClick={() => navigate(`/health-packages`)} style={{cursor:"pointer" } }>
                      Health Packages
                    </a>
                  </li>
               
                  
        
    <li
      className="nav-item dropdown "
      onMouseEnter={() => setShowProfileDropdown(true)}
      onMouseLeave={() => setShowProfileDropdown(false)}
      style={{marginLeft:"590px"}}
    >
      <a
        className="nav-link dropdown-toggle"
        style={{cursor:"pointer" } }
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
        style={{cursor:"pointer" } }
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/clinic`)}>
          Logout
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
              Pharmacist Registration Requests
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Users <i className="ion-ios-arrow-forward" />
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
          onClick={() => handleAcceptRequest(adminRequests[currentRequestIndex]._id, adminRequests[currentRequestIndex])}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="btn btn-primary px-4 py-3"
          style={{ borderRadius: '8px' , width:'40%'}}
          onClick={() => handleRejectRequest(adminRequests[currentRequestIndex]._id)}
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
              style={{ borderRadius: '20px'  , marginTop:'200px'}}
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
                <h3 className="mb-4">Dr. {adminRequests[currentRequestIndex].fullName}</h3>
                <p>Email: {adminRequests[currentRequestIndex].email}</p>
                <p>Date of Birth: {adminRequests[currentRequestIndex].dateOfBirth}</p>
                <p>Hourly Rate: {adminRequests[currentRequestIndex].hourlyRate}</p>
                <p>Hospital: {adminRequests[currentRequestIndex].affiliation}</p>
                <p>Educational Background: {adminRequests[currentRequestIndex].educationalBackground}</p>
                <p>Speciality: {adminRequests[currentRequestIndex].speciality}</p>
        
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
              style={{ borderRadius: '20px' , marginTop:'200px' }}
              onClick={handleForward}
              disabled={currentRequestIndex === adminRequests.length - 1}
            >
              <ArrowForwardIcon />
            </Button>
           </div>
          
            <div className="col-12 text-center mt-3">
            <Button
  variant="contained"
  color="primary"
  className="btn btn-primary px-4 py-3"
  style={{ marginRight: '10px', borderRadius: '8px', width: '26%' }}
  onClick={() =>
    handleDownloadFile(
      adminRequests[currentRequestIndex].nationalIdFile[0],
      `${adminRequests[currentRequestIndex].fullName}_NationalID.png`
    )
  }
>
  Download National ID
</Button>
<Button
  variant="contained"
  color="primary"
  className="btn btn-primary px-4 py-3"
  style={{ marginRight: '10px', borderRadius: '8px', width: '26%' }}
  onClick={() =>
    handleDownloadFile(
      adminRequests[currentRequestIndex].pharmacyDegreeFile[0],
      `${adminRequests[currentRequestIndex].fullName}_MedicalLicense.pdf`
    )
  }
>
  Download Pharmacy Degree
</Button>
<Button
  variant="contained"
  color="primary"
  className="btn btn-primary px-4 py-3"
  style={{ borderRadius: '8px', width: '26%' }}
  onClick={() =>
    handleDownloadFile(
      adminRequests[currentRequestIndex].workingLicenseFile[0],
      `${adminRequests[currentRequestIndex].fullName}_MedicalDegree.pdf`
    )
  }
>
  Download Working License
</Button>

    </div>
        
      </div>
    </div>
    </div>
    </div>
    )}

export default AdminRequests;
