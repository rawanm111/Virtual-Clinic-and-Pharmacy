import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';
import { Box, Button, TextField, Popover, Typography } from '@mui/material';

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
import L1 from "../images/user.webp";
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
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [selectedDoctorData, setSelectedDoctorData] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uniqueSpeciality, setUniqueSpeciality] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableDoctorsResult, setAvailableDoctorsResult] = useState([]);
  const [patientHealthPackage, setPatientHealthPackage] = useState([]);
  const { id } = useParams();
  const [allHealthPackages, setAllHealthPackages] = useState([]);
  const patientId = id;
  const navigate = useNavigate();
  
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
  };

  useEffect(() => {
    const intervalId = setInterval(toggleImage, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Fetch doctors data
    axios
      .get('http://localhost:3000/doctors')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            name: item.fullName,
            email: item.email,
            hourly_rate: item.hourlyRate,
            educational_bg: item.educationalBackground,
            affiliation: item.affiliation,
            speciality: item.speciality,
          }));
          setDoctors(transformedData);
          setFilteredDoctors(transformedData);
          const uniqueUses = [...new Set(transformedData.map((item) => item.speciality))];
          setUniqueSpeciality(uniqueUses);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });

    // Fetch patient health package
    axios
      .get(`http://localhost:3000/PatientPackages/${patientId}`)
      .then((response) => {
        setPatientHealthPackage(response.data);
        console.log(response.data,"response.data")
        console.log(patientHealthPackage,"patientHealthPackage")

      })
      .catch((error) => {
        console.error('Error fetching patient health package:', error);
      });
}, [patientId]);

useEffect(() => {
  axios
    .get('http://localhost:3000/health-packages')
    .then((response) => {
      const packagesWithId = response.data.map((pkg) => ({
        ...pkg,
        id: pkg._id,
      }));
      setAllHealthPackages(packagesWithId);
    })
    .catch((error) => {
      console.error('Error fetching health packages:', error);
    });
}, []);

  const popOverStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  };

  const calculateDiscountedPrice = (sessionPrice, patientHealthPackage = [], allHealthPackages = []) => {
    let discount = 0;
    let sessionPriceAfterDiscount = sessionPrice;
    let packName;
  
    if (patientHealthPackage && patientHealthPackage.length > 0) {
      patientHealthPackage.forEach((pack) => {
        packName = pack.package;
        return;
      });
    }
  
    const selectedPackage = allHealthPackages.find((pkg) => pkg.name === packName);
  
    if (selectedPackage) {
      discount = (selectedPackage.discountOnDoctorSessionPrice / 100) * sessionPrice;
      sessionPriceAfterDiscount = sessionPrice - discount;
    }
  
    return sessionPriceAfterDiscount.toFixed(2);
  };
  
  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);
  
    if (Array.isArray(doctors)) {
      const searched = doctors.filter((doctor) => {
        return (
          (doctor && doctor.name && doctor.name.toLowerCase().includes(value)) ||
          (doctor && doctor.speciality && doctor.speciality.toLowerCase().includes(value))
        );
      });
  
      setFilteredDoctors(searched);
    }
  };

  const handleDoctorFilter = () => {
    const filteredRows = doctors.filter(
      (row) =>
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedSpeciality === "" || row.speciality === selectedSpeciality)
    );
    setFilteredDoctors(filteredRows);
  };

  const handleAllSpecialitiesFilter = () => {
    const filteredRows = doctors.filter(
      (row) =>
        row.speciality.toLowerCase().includes(selectedSpeciality.toLowerCase())
    );
    setFilteredDoctors(filteredRows);
  };
  const [packName, setPackName] = useState("");

 
  const handleViewClick = (row) => {
    setSelectedDoctorData(row);
    setPopoverAnchor(row);
  };

  const handleClosePopover = () => {
    setSelectedDoctorData(null);
    setPopoverAnchor(null);
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
                <a href="index.html" className="nav-link pl-0"  onClick={() => navigate(`/clinic-patient-home/${id}`)}>
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
                className="nav-item dropdown active"
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
<WalletModal/>
</li>

            </ul>
          </div>
        </div>
      </nav>
    {/* END nav */}

    
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
              Doctors
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a href="index.html">
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Doctors <i className="ion-ios-arrow-forward" />
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
          justifyContent: 'space-between',
          gap: '26px',
          padding: '10px',
          m:"20px"
        }}

      >
                <div>
         <select
    value={selectedSpeciality}
    onChange={(e) => setSelectedSpeciality(e.target.value)}
        style={{width:"150px",padding:"5px",margin:"5px",
        border: '1px solid #ccc', 
        // borderRadius: '8px',
        padding:"5px"
      }}
  >
    <option value="">All Specialities</option>
    {uniqueSpeciality.map((speciality) => (
      <option key={speciality} value={speciality}>
        {speciality}
      </option>
    ))}
  </select>
  <button onClick={handleAllSpecialitiesFilter} style={{
    width:"50px",
  height:"30px",
  margin:"5px",border: '1px solid #ccc'}}>Filter</button>
  </div>
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

      </Box>


    <section className="ftco-section" style={{ padding: "2em 0", position: "relative" }}>
  <div className="container" style={{ maxWidth: "1230px", margin: "0 auto" }}>
    <div className="row">
      {filteredDoctors.map((doctor, index) => (
        <div key={index} className="col-md-6 col-lg-4" style={{ marginBottom: "40px" }}>
          <div className="staff" style={{ overflow: "hidden", height: "450px" }}>
            <div className="img-wrap d-flex align-items-stretch" style={{ height: "300px" }}>
              <div className="img align-self-stretch" style={{ backgroundImage: `url(${L1})`, width: "100%", display: "block", backgroundPosition: "top center" }} />
            </div>
            <div className="text pt-3 text-center">
              <h3 style={{ fontSize: "32px", fontWeight: "500", marginBottom: "10px" }}>{doctor.name}</h3>
              <span className="position mb-2" style={{ textTransform: "uppercase", color: "#b3b3b3", display: "block", letterSpacing: "1px" }}>{doctor.role}</span>
              <div className="faded">
                <p style={{ fontSize: "20px", textTransform: "uppercase" }}>{doctor.speciality}</p>
                <p style={{color:"green"}}>Discounted Session Price: ${calculateDiscountedPrice(doctor.hourly_rate)}</p>

                <ul className="ftco-social text-center">
                  <li>
                    <a>
                      <p>Email: {doctor.email}</p>
                      <p>Affiliation: {doctor.affiliation}</p>
                      <p>Educational Background: {doctor.educational_bg}</p>
                      <p>Hourly Rate: {doctor.hourly_rate}</p>
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
