import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import InputBase from '@mui/material/InputBase';
import { TextField, Button, Container, Typography, Box ,Modal,CircularProgress} from '@mui/material';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import WalletModal from './walletModal'
export default function StoreView() {
  const [medicationData, setMedicationData] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedMedicalUse, setSelectedMedicalUse] = useState('All');
  const [uniqueMedicalUses, setUniqueMedicalUses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const {id,idmed} = useParams();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [currentImage, setCurrentImage] = useState(I2);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
const [passwords, setPasswords] = useState({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const [quantity, setQuantity] = useState(1);


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
const [openAlternativesModal, setOpenAlternativesModal] = useState(false);
const [alternativeMedicines, setAlternativeMedicines] = useState([]);




  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const addToCart = () => {
    const patientId = id.toString();
    const medicationId= idmed;

    // Send a request to your backend to add the medication to the patient's cart
    axios.post('http://localhost:3000/Cart/add', {
      patientId,
      medicationId: idmed ,
      quantity: quantity,
       // You can specify the quantity to add
    })
    .then((response) => {
      console.log('Medication added to cart:', response.data);
      navigate(`/patient-meds/${id}`)
    })
    .catch((error) => {
      console.error('Error adding medication to cart:', error);
    });
  };
  
  useEffect(() => {
    const fetchMedicationData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        const response = await axios.get('http://localhost:3000/meds/');
        const responseData = response.data;

        setMedicationData(responseData);

        const foundMedication = responseData.find((med) => med._id === idmed);

        if (foundMedication) {
          setSelectedMedication(foundMedication);
        } else {
          console.log('Medication not found with id:', idmed);
        }
      } catch (error) {
        console.error('Error fetching medication data:', error);
      } finally {
        // Set loading to false after a minimum delay (e.g., 500 milliseconds)
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchMedicationData();
  }, [idmed]);


useEffect(() => {
  if (openAlternativesModal) {
    axios.get(`http://localhost:3000/meds/getMedAlternatives/${idmed}`)
      .then(response => {
        setAlternativeMedicines(response.data);
      })
      .catch(error => {
        console.error('Error fetching alternative medicines:', error);
      });
  }
}, [openAlternativesModal, selectedMedication]);


const [success, setSuccess] = useState(false); 
const handleChange = (prop) => (event) => {
  setPasswords({ ...passwords, [prop]: event.target.value });
  setSuccess(false); 
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
  setChangePasswordOpen(false);
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
    setAlertType('success');
    setAlertOpen(true);
  } catch (error) {
    console.error('Error updating password:', error);
    setAlertType('error');
    setAlertOpen(true);
  }
};

  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
  };

  useEffect(() => {
    const intervalId = setInterval(toggleImage, 2000);
    return () => clearInterval(intervalId);
  }, []);
 



  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const queryParameters = {
      medicalUse: selectedMedicalUse, 
    };
    
    const fetchMedicationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/meds/', {
          params: queryParameters,
        });
        const responseData = response.data;
        console.log('Fetched data:', responseData);
        setMedicationData(responseData);

        // Extract unique medical uses from fetched data
        const uniqueUses = [...new Set(responseData.map((item) => item.medicalUse))];
        setUniqueMedicalUses(uniqueUses);
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    };

    fetchMedicationData();
  }, [selectedMedicalUse]);

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
                <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/pharm-patient-home/${id}`)}>
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
                  style={{cursor:"pointer" } }
                  id="doctorsDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={setShowPersonalDropdown}
                >
                  Store
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
                  onClick={() => navigate(`/patient-meds/${id}`)}>
                    Products
                  </a>
                  <a className="dropdown-item" style={{cursor:"pointer" } }
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Order/${id}`)}>
                    My Orders
                  </a>
                  
                </div>
              </li>
              {/* New dropdown for Doctors */}
             
              
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"880px"}}
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
              Medication Product
            </h1>
            <p className="breadcrumbs">
              <span style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Store <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
   
    <div className="site-section">
      <div className="container">
      {loading && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <CircularProgress />
            </div>
          )}
      {selectedMedication && (
        <div className="row">
          <div className="col-md-5 mr-auto">
          <div className="border text-center" style={{ height: '70vh' }}>
  <img
    src={selectedMedication.picture}
    alt="Image"
    className="img-fluid p-5"
    style={{ height: '100%' }}
  />
</div>

          </div>
          <div className="col-md-6">
          <p style={{
  color: '#007bff',
  fontWeight: '900',
  fontSize: '50px',
}}>
  <span className="price">
    {selectedMedication.name}
  </span>
</p>
            <p>
            {selectedMedication.description}
            </p>
            <p>

              <strong className="text-primary h4">${selectedMedication.price}</strong>
            </p>
            <div className="mb-3">
  <div className="input-group" style={{ maxWidth: '150px' }}>
  <div className="mb-3">
        <div className="input-group" style={{ maxWidth: '150px' }}>
          <div className="input-group-prepend">
            <button
              className="btn btn-outline-primary js-btn-minus"
              type="button"
              style={{ fontSize: '12px' }}
              onClick={handleDecrease}
            >
              −
            </button>
          </div>
          <input
            type="text"
            className="form-control text-center"
            value={quantity}
            readOnly
            style={{ fontSize: '14px' }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary js-btn-plus"
              type="button"
              style={{ fontSize: '12px' }}
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div>
      </div>
  </div>
</div>
<p>
              <a className="buy-now btn btn-sm height-auto px-4 py-3 btn-primary" onClick={() => addToCart()}>
                Add To Cart
              </a>
              <a className="view-alternatives btn btn-sm height-auto px-4 py-3 btn-secondary ml-2" onClick={() => setOpenAlternativesModal(true)}>
                View Alternatives
              </a>
            </p>

            <div className="mt-5">
              
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                >
               <table className="table custom-table">
  <thead>
    <tr>
      <th colSpan="2" style={{ borderBottom: '2px solid #ddd', borderTop: '2px solid #ddd', paddingRight: '10px' }}>Medication Specifications</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style={{ borderBottom: '1px solid #ddd', paddingRight: '10px', width: '40%' }} scope="row">Active ingredients</th>
      <td style={{ borderBottom: '1px solid #ddd', paddingLeft: '10px', width: '40%' }}>{selectedMedication.activeIngredient}</td>
    </tr>
    <tr>
      <th className="narrow-cell" style={{ borderBottom: '1px solid #ddd', paddingRight: '10px', width: '40%' }} scope="row">Medical Use</th>
      <td style={{ borderBottom: '1px solid #ddd', paddingLeft: '10px', width: '40%' }}>{selectedMedication.medicalUse}</td>
    </tr>
  </tbody>
</table>


                </div>
                <div
                  className="tab-pane fade"
                  id="pills-profile"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                >
                
                </div>
              </div>
            </div>
          </div>
        </div> 
        
       )}
      </div> 
    </div>
    {/* Change Password pop-up */}
    <Modal
      open={openAlternativesModal}
      onClose={() => setOpenAlternativesModal(false)}
      aria-labelledby="alternatives-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="alternatives-modal-title" variant="h6" component="h2">
          Medicine Alternatives
        </Typography>
        <ul>
          {alternativeMedicines.length > 0 ? (
            alternativeMedicines.map((medicine, index) => (
              <li key={index}>{medicine.name}</li>
            ))
          ) : (
            <li>No alternative medicines available</li>
          )}
        </ul>
      </Box>
    </Modal>

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

