import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
import { TextField,  Container, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Notif from "./notifModal";

console.log('Prescription component is rendering.');

  
 export default function() {
  const [currentImage, setCurrentImage] = useState(I2);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const navigate = useNavigate();
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [filledFilter, setFilledFilter] = useState('all'); // 'all', 'filled', or 'notFilled'
  const [doctorFilter, setDoctorFilter] = useState('');
  const [prescriptionData, setPrescriptionData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { id } = useParams();
  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const handleFilledFilterChange = (event) => {
    setFilledFilter(event.target.value);
  };

  const handleDoctorFilterChange = (event) => {
    setDoctorFilter(event.target.value);
  };

  const addToCart = (prescription) => {
   
    // After adding all medications to the cart, navigate to the /cart page
    navigate(`/Cart/${id}`);
  };
  // Filter prescriptions based on selected filters
  const filteredPrescriptions = prescriptionData.filter((prescription) => {
    const dateMatches = !dateFilter || prescription.Date.includes(dateFilter);
    const filledMatches =
      filledFilter === 'all' ||
      (filledFilter === 'filled' && prescription.filled) ||
      (filledFilter === 'notFilled' && !prescription.filled);
      const doctorMatches =
      !doctorFilter || prescription.Doctor.fullName.toLowerCase() === doctorFilter.toLowerCase();
    
    return dateMatches && filledMatches && doctorMatches;
  });
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
const RightSide = styled('div')({
  marginRight:"auto",
   marginLeft: 'auto', 

 });
 const buttonStyles = {
   background: 'white',
   color: '#0070F3', 
   border: '1px solid #0070F3', 
   width:'80%'
 };
const handleSubmit = (event) => {
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
  alert("Password changed successfully");
};
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return regex.test(password);
};
const handleCloseChangePassword = () => {
  setChangePasswordOpen(false);
};
const handleViewDocuments = async (patientId) => {
  try {
    const response = await axios.get(`http://localhost:3000/Prescription/pat/${id}`);
    const patientPrescriptions = response.data;
    setPatientDocuments(patientPrescriptions || []);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
  }
};

const [patientDocuments, setPatientDocuments] = useState([]);
const updatePassword = async (newPassword) => {
  try {
    // Replace '/api/reset-password' with your actual API endpoint
    const response = await axios.put('http://localhost:3000/changepassword', { id, newPassword });
    console.log(response.data);
    alert('Password successfully updated');
  } catch (error) {
    console.error('Error updating password:', error);
    alert('Error updating password');
  }
};
  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/Prescription/pat/${id}`)
      .then((response) => {
        const patientPrescriptions = response.data;
        setPatientDocuments(patientPrescriptions || []);
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
      });
  }, [id]); 
  
  const handleDownload = () => {
    // Combine document data into a string
    const fileContent = patientDocuments.map((document) => {
      const medicinesList = document.medicines.map((medicineData) => {
        return `${medicineData.medicine.name} - Dosage: ${medicineData.dosage}`;
      }).join('\n');
  
      return `
  Date: ${document.Date}
  Status: ${document.filled ? 'Filled' : 'Not Filled'}
  Medicines:
  ${medicinesList}
  -----------------------------------------
  `;
    }).join('\n');
  
    // Create a Blob from the content
    const blob = new Blob([fileContent], { type: 'text/plain' });
  
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'patient_documents.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch prescription data for the specific user
    const fetchPrescriptionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Prescription/pat/${id}`);
        if (response.status === 200) {
          const responseData = response.data.map((row) => ({
            ...row,
            id: row._id,
            DoctorName: row.DocID ? row.DocID.fullName : 'Not Assigned Yet',
          }));
          console.log('Fetched data:', responseData);
          setPrescriptionData(responseData);
          
        } else {
          console.error('Unexpected status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchPrescriptionData function when the component mounts
    fetchPrescriptionData();
  }, [id]);

  useEffect(() => {
    // Fetch doctor data for dropdown
    axios.get('http://localhost:3000/doctors')
      .then((response) => {
        if (response.status === 200) {
          setDoctors(response.data);
          setLoading(false);
        } else {
          console.error('Unexpected status code:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []); // Fetch doctors only once when the component mounts
    return (
<div style={{ backgroundColor: "white" }}>
  <title>MetaCare </title>
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
                className="nav-item dropdown active"
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
              My Prescriptions
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
              My Prescriptions <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section >

    <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'right',
            gap: '16px',
            padding: '20px',
          }}
        >
      <TextField
            
            type="date"
            value={dateFilter}
            onChange={handleDateFilterChange}
            sx={{ width: '38%' }}
          />

          <TextField
            select
            label="Filled/Not Filled"
            value={filledFilter}
            onChange={handleFilledFilterChange}
            sx={{ width: '30%' }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="filled">Filled</MenuItem>
            <MenuItem value="notFilled">Not Filled</MenuItem>
          </TextField>

          <FormControl sx={{ width: '30%' }}>
  <InputLabel>Doctor Filter</InputLabel>
  <Select
    value={doctorFilter}
    onChange={handleDoctorFilterChange}
  >
    <MenuItem value="">All Doctors</MenuItem>
    {doctors.map((doctor) => (
      <MenuItem key={doctor._id} value={doctor.fullName}>
        {doctor.fullName}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        </Box>

  <RightSide>
  <div className="d-flex flex-wrap">
    {filteredPrescriptions.map((document) => (
      <div key={document._id} style={{ borderRadius: '8px', margin: '8px', flex: '1 0 30%', position: 'relative' }}>
       {/* Edit Icon */}
    
        <div className="pricing-entry pb-5 text-center" style={{ borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      
          <div>
          <h3 className="mb-4">Doctor:</h3>
            <p className="mb-4">{document.Doctor.fullName}</p>
            <h3 className="mb-4">Date:</h3>
            <p className="mb-4">{document.Date}</p>
            <h3 className="mb-4">Status:</h3>
            <p className="mb-4">{document.filled ? 'Filled' : 'Not Filled'}</p>
            <h3 className="mb-4">Medicines:</h3>
            <ul>
              {document.medicines.map((medicineData) => (
                <li key={medicineData.medicine._id}>
                  {medicineData.medicine.name} - Dosage: {medicineData.dosage}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <Button
              style={buttonStyles}
              variant="contained"
              color="primary"
             
            >
              Download Prescription
            </Button>
          </div>
          <div>
          <Button
          style={buttonStyles}
          variant="contained"
          color="primary"
          onClick={() => addToCart(document)}
        >
          View Prescription in Cart
        </Button>
          </div>
        </div>
      </div>
    ))}
  </div>
</RightSide>



</section>

    </div>
  );
}
