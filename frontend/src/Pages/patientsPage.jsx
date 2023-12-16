import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';

// import S12 from '../css/style.css';
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




 export default function() {
  const [patients, setPatients] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);



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
    }
  };




  const handleUpcomingTrips = () => {
    const url = `http://localhost:3000/apps/upcoming-appointments/${id}`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        const matchingPatients = [];
        for (const patient of patients) {
          for (const trip of data) {
            console.log(patient.id);

            if(trip.patient == null){
              break;
            }
            else
            if (trip.patient._id === patient.id) {
              matchingPatients.push(patient);
              break;
            }
          }
        }
        setFilteredRows(matchingPatients);
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  };

    return (

      <div style={{ backgroundColor: "white" }}>
  <title>MetaCare </title>
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
              <li className="nav-item" style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  
                onClick={() => navigate(`/doc-home/${id}`)}
                >
                  Home
                </a>
              </li>
              <li className="nav-item active" style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  
                onClick={() => navigate(`/patients/${id}`)}
                >
                  My Patients
                </a>
              </li>
              
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a   className="nav-link pl-0"  
                onClick={() => navigate(`/appPageDoc/${id}`)}
                >
                  My Appointments
                </a>
              </li>
              
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"720px"}}
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
                    
                  onClick={() => navigate(`/changepassTwo/${id}`)}
                  >
      Change Password
    </a>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                    
                  onClick={() => navigate(`/doc-profile/${id}`)}
                  >
      My Profile
    </a>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                    
                  onClick={() => navigate(`/clinic`)}
                  >
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
    {/* END nav */}

    
    <section
      className="hero-wrap hero-wrap-2"
      style={{ backgroundImage: 'url("images/bg_1.jpg")',
       width: "100%",
      height: "300px",
      position: "inherit",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top center',
      position: "relative" }}
      data-stellar-background-ratio="0.5"
    >
      <div className="overlay" style={{position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "#2f89fc"}}/>
      <div className="container" style={{maxWidth: "1230px"}}>
        <div className="row no-gutters slider-text align-items-center justify-content-center"
        style={{height: "300px"}}
        >
          <div className="col-md-9 text-center" >
            <h1 className="mb-2 bread" style={{
              marginBottom:'0.5rem',
            lineHeight: "1.5",
  fontWeight: "900",
        color: "#fff"
  }}>Patients</h1>
 
            <p className="breadcrumbs" style={{
              textTransform: "uppercase",
              fontSize: '13px',
              letterSpacing: "1px"
            }}
            >
              <span className="mr-2">
                <a  >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{" "}
              <span>
                Patients <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

  

<Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
          margin:"10px"
        }}
      >
        
       <input
      type="text"
      placeholder="Search..."
      value={filterValue}
      onChange={handleFilterChange}
      style={{
      width: '300px',
      borderRadius: '8px', 
      padding: '8px', 
      border: '1px solid #ccc', 
      }}
    />
        <Button variant="contained" onClick={handleUpcomingTrips} 
        style={{
          margin:"2px",
          backgroundColor:"#5ea0fd"
        }}>
          Show Upcoming Appointments
        </Button>
      </Box>

    <section className="ftco-section" style={{ padding: "2em 0", position: "relative" }}>
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
              <span className="position mb-2" style={{ textTransform: "uppercase", color: "#b3b3b3", display: "block", letterSpacing: "1px" }}>{ patient.role}</span>
              <div className="faded">
                <p style={{ fontSize: "20px", textTransform: "uppercase" }}>{ patient.name}</p>

                <ul className="ftco-social text-center">
                  <li>
                    <a>
                      <p>Email: { patient.email}</p>
                      <p>Date of Birth: {patient.dateOfBirth}</p>
                      <p>Mobile Number: {patient.mobileNumber}</p>
                      <p>Gender: {patient.gender}</p>




                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



    

</div>
)}
