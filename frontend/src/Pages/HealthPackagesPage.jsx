import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FaUser, FaWallet } from 'react-icons/fa';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import {Radio, RadioGroup, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import WalletModal from './walletModal'

export default function HealthPackages() {
  const [healthPackages, setHealthPackages] = useState([]);
  
  const [selectedHealthPackage, setSelectedHealthPackage] = useState('');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('myself');
  const [familyMembers, setFamilyMembers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [pack, setPack] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    annualPrice: 0,
    discountOnDoctorSessionPrice: 0,
    discountOnMedicineOrders: 0,
    discountOnFamilyMemberSubscription: 0,
  });
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [selectedPackageName, setSelectedPackageName] = useState(''); // New state
  const [isOpen, setIsOpen] = useState(false);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [isAddPackageDialogOpen, setIsAddPackageDialogOpen] = useState(false);
  const handleAddPackageClick2 = () => {
    setIsAddPackageDialogOpen(true);
  };

  const [formData2, setFormData2] = useState({
    name: '',
    description: '',
    annualPrice: 0,
    discountOnDoctorSessionPrice: 0,
    discountOnMedicineOrders: 0,
    discountOnFamilyMemberSubscription: 0,
  });

  const handleSubmit2 = () => {
    axios
      .post('http://localhost:3000/health-packages', formData)
      .then((response) => {
        console.log('Response:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleUpdatePackage = (id, name, description, annualPrice, discountOnDoctorSessionPrice, discountOnMedicineOrders, discountOnFamilyMemberSubscription) => {
    setPack(id);
    setFormData({
      name,
      description,
      annualPrice,
      discountOnDoctorSessionPrice,
      discountOnMedicineOrders,
      discountOnFamilyMemberSubscription,
    });

    // Open the modal
    setIsModalOpen(true);
  };

  // Step 5: Handle state reset after modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      description: '',
      annualPrice: 0,
      discountOnDoctorSessionPrice: 0,
      discountOnMedicineOrders: 0,
      discountOnFamilyMemberSubscription: 0,
    });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/health-packages')
      .then((response) => {
        setHealthPackages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching health packages:', error);
      });
  }, []);

  const handleAddPackageClick = () => {
    navigate('/new-package');
  };

  const handleDeletePackage = (id) => {
    axios
      .delete(`http://localhost:3000/health-packages/${id}`)
      .then((response) => {
        console.log('Deleted health package:', response.data);
        setHealthPackages((prevPackages) =>
          prevPackages.filter((healthPackage) => healthPackage._id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting health package:', error);
      });
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
  const handleAddPackage = () => {
    // Use a POST request to add the new health package
    axios
      .post('http://localhost:3000/health-packages', formData)
      .then((response) => {
        console.log('Added health package:', response.data);
        // Close the pop-up and reset form data
        setIsAddPackageDialogOpen(false);
        setFormData({
          name: '',
          description: '',
          annualPrice: 0,
          discountOnDoctorSessionPrice: 0,
          discountOnMedicineOrders: 0,
          discountOnFamilyMemberSubscription: 0,
        });
        
        navigate("/health-packages");
      })
      .catch((error) => {
        console.error('Error adding health package:', error);
      });
  };
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = () => {
    // Use a PUT request to update the health package
    axios
      .put(`http://localhost:3000/health-packages/${pack}`, formData)
      .then((response) => {
        console.log('Updated health package:', response.data);
  
        // Close the modal after successful update
        handleCloseModal();
  
        // Refetch the data to update the state
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
      })
      .catch((error) => {
        console.error('Error updating health package:', error);
      });
  };
  
  
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
                <a  className="nav-link pl-0"  onClick={() => navigate(`/admin-home`)} style={{cursor:"pointer" } }>
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
                   onClick={() => navigate(`/doctor-requests}`)} 
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
              <li className="nav-item active" style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/health-packages`)} style={{cursor:"pointer" } }>
                  Health Packages
                </a>
              </li>
              <li className="nav-item  " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/sales`)} style={{cursor:"pointer" } }>
                  Sales Report
                </a>
              </li>
           
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"500px"}}
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
              Health Packages
            </h1>
            <p className="breadcrumbs">
              <span style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Health Packages<i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <Button
        variant="contained"
        color="primary"
        className="btn btn-primary px-4 py-3"
        style={{ margin: '70px' , width:"90%"}}
        onClick={handleAddPackageClick2}
      >
        Add New Health Package
      </Button>
    <section className="ftco-section ftco-departments bg-light">
      <div className="container" style={{ marginTop: '-100px' }}>
        <div className="row">
          {healthPackages.map((pack) => (
            <div className="col-md-4"  style={{marginBottom:'50px'}} key={pack.id}>
              <div className="pricing-entry pb-5 text-center" style={{borderRadius:'8px'}}>
                <div>
                  <h3 className="mb-4">{pack.name}</h3>
                  <p>
                    <span className="price">${pack.annualPrice}</span>{' '}
                    <span className="per">/ year</span>
                  </p>
                </div>
                <div>
                  
                  <p>
                    <span className="price">{pack.discountOnDoctorSessionPrice}%</span>{' '}
                    </p> <p>
                    <span className="per" style={{fontSize:"16px"}}>    Discount on Doctors' Session Price</span>
                  </p>
                </div>
                <div>
                  
                  <p>
                    <span className="price">{pack.discountOnMedicineOrders}%</span>{' '}
                    </p> <p>
                    <span className="per" style={{fontSize:"16px"}}>  Discount on Orders</span>
                  </p>
                </div>
                <div>
                  
                  <p>
                    <span className="price">{pack.discountOnFamilyMemberSubscription}%</span>{' '}
                    </p> <p>
                    <span className="per" style={{fontSize:"16px"}}>  Discount on Family Subscriptions</span>
                  </p>
                </div>
             

                <p></p>
                <p className="button text-center">
                <Button
                variant="contained"
                color="primary"
                className="btn btn-primary px-4 py-3"
                style={{ marginLeft: '10px' }} 
                onClick={() => handleDeletePackage(pack.id)}  
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="btn btn-primary px-4 py-3"
                style={{ marginLeft: '10px' }} 
                onClick={() =>
                  handleUpdatePackage(
                    pack.id,
                    pack.name,
                    pack.description,
                    pack.annualPrice,
                    pack.discountOnDoctorSessionPrice,
                    pack.discountOnMedicineOrders,
                    pack.discountOnFamilyMemberSubscription
                  )
                }  
              >
                Update
              </Button>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Health Package Update</DialogTitle>
        <DialogContent>
          <Container
            maxWidth="sm"
            style={{
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '15px',
            }}
          >
            <Typography variant="h4" gutterBottom align="center">
              Health Package Update
            </Typography>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                label="Annual Price"
                variant="outlined"
                type="number"
                name="annualPrice"
                value={formData.annualPrice}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                label="Discount on Doctor Session Price"
                variant="outlined"
                type="number"
                name="discountOnDoctorSessionPrice"
                value={formData.discountOnDoctorSessionPrice}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                label="Discount on Medicine Orders"
                variant="outlined"
                type="number"
                name="discountOnMedicineOrders"
                value={formData.discountOnMedicineOrders}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <TextField
                fullWidth
                label="Discount on Family Member Subscription"
                variant="outlined"
                type="number"
                name="discountOnFamilyMemberSubscription"
                value={formData.discountOnFamilyMemberSubscription}
                onChange={handleInputChange}
              />
            </div>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Update Health Package
          </Button>
        </DialogActions>
      </Dialog>
      {/* Pop-up for adding a new health package */}
      <Dialog open={isAddPackageDialogOpen} onClose={() => setIsAddPackageDialogOpen(false)}>
  <DialogTitle>Add New Health Package</DialogTitle>
  <DialogContent>
    <Container
      maxWidth="sm"
      style={{
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '15px',
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Add New Health Package
      </Typography>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Annual Price"
          variant="outlined"
          type="number"
          name="annualPrice"
          value={formData.annualPrice}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Discount on Doctor Session Price"
          variant="outlined"
          type="number"
          name="discountOnDoctorSessionPrice"
          value={formData.discountOnDoctorSessionPrice}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Discount on Medicine Orders"
          variant="outlined"
          type="number"
          name="discountOnMedicineOrders"
          value={formData.discountOnMedicineOrders}
          onChange={handleInputChange}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label="Discount on Family Member Subscription"
          variant="outlined"
          type="number"
          name="discountOnFamilyMemberSubscription"
          value={formData.discountOnFamilyMemberSubscription}
          onChange={handleInputChange}
        />
      </div>
    </Container>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsAddPackageDialogOpen(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleAddPackage} color="primary">
      Add Health Package
    </Button>
  </DialogActions>
</Dialog>
  </div>
)};