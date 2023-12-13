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


export default function HealthPackagesView() {
  const [healthPackages, setHealthPackages] = useState([]);
  
  const [selectedHealthPackage, setSelectedHealthPackage] = useState('');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('myself');
  const [familyMembers, setFamilyMembers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState('wallet');

  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [selectedPackageName, setSelectedPackageName] = useState(''); // New state
  const [isOpen, setIsOpen] = useState(false);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);

  const handleSelectPackage = (event) => {
    const selectedPackage = event.target.value;
    setSelectedHealthPackage(selectedPackage);
    setSelectedPackageId(selectedPackage.id);
    setSelectedPackageName(selectedPackage.name); // Update the selected package name
  };
  
  const handleSubscribeButtonClick = (selectedPackageId) => {
    setSelectedPackageId(selectedPackageId); 
    setIsOpen(true);
  };
  const handleConfirmSubscription = () => {
    setIsOpen(false);
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
  

  const handleFamilyMemberChange = (event) => {
    setSelectedFamilyMember(event.target.value);
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
      // Handle successful package creation here, e.g., show a success message
      // or redirect to a different page using navigate('/path')

    } catch (error) {
      console.error('Error creating package:', error.response ? error.response.data : error.message);
      // Handle errors here, e.g., show an error message to the user
    }
  };

  
  const handleCardPayment = async () => {
    try {
      
      // Check if a health package is selected
      if (!selectedHealthPackage) {
        console.error('No health package selected.');
        return;
      }
  
      // Find the selected health package by its ID
      const selectedPackage = healthPackages.find((Package) => Package.name === selectedHealthPackage.name);
      console.log(healthPackages)
      if (!selectedPackage) {
        console.error('Invalid health package selected.');
        return;
      }
  
      // Extract necessary data for payment
      const packageId = selectedPackage.id;
      const items = [selectedPackage]; // Put the selected package in an array
  
      console.log(packageId,"id");
      console.log(items,"items")
      // Check if items is an array
      if (!items || !Array.isArray(items)) {
        console.error('No health package data found.');
        return;
      }

      // Perform the payment logic
      const response = await axios.post('http://localhost:3000/paymentPack', {
        packageId: packageId,
        patientId: id,
        items: items.map((item) => ({
          id: item._id,
          quantity: 1,
        })),
      });
      {handleSubmit()}

      if (response.status === 200) {
        window.location = response.data.url;
        console.log(response.data.url);
      } else {
        console.error('Error:', response.data);
      }
      // Handle the response as needed
      console.log('Card payment initiated:', response.data);
      // rest of the code...
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };
  
  
  const [walletBalance, setWalletBalance] = useState(0); // Add wallet balance state

  const handleWalletPayment = async () => {
    try {

      console.log(selectedHealthPackage)

      healthPackages.map((healthPackage) => (
        healthPackage.name === packageType ? setSelectedHealthPackage(healthPackage) : null
      ));
      const response = await axios.get(`http://localhost:3000/wallet/${id}`);
      const price=selectedHealthPackage.annualPrice;
      console.log(price)
      if (response.data.balance < price ) {
        console.error("Insufficient balance");
      } else {
        handleSubmit();
        
        const updatedBalance = response.data.balance - price;
        setWalletBalance(updatedBalance);
        console.log(walletBalance);
        console.log(selectedHealthPackage.annualPrice)
        const response1 = await axios.put(`http://localhost:3000/wallet/${id}/update-balance`, {
          patientId: id,
          balance: updatedBalance,
        });
        
        if (response1 && response1.status === 200) {
          console.log('Wallet payment successful!');
        } else {
          console.error('Failed to update wallet balance:', response1 && response1.data);
        }
      }
    } catch (error) {
      console.error('Error processing wallet payment:', error);
    }
  };
  

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
                className="nav-item dropdown active"
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
              Health Packages
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a href="index.html">
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

    <section className="ftco-section ftco-departments bg-light">
      <div className="container" style={{ marginTop: '-100px' }}>
        <div className="row">
          {healthPackages.map((pack) => (
            <div className="col-md-4" key={pack.id}>
              <div className="pricing-entry pb-5 text-center">
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
                <p className="button text-center">
                <Button
                variant="contained"
                color="primary"
                className="btn btn-primary px-4 py-3"
                onClick={() => handleSubscribeButtonClick(pack.id)}  
              >
                Subscribe
              </Button>
                  
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
     {/* Family and Payment Modal */}
     <Dialog
        open={isOpen}
        onClose={closePaymentDialog}
      >
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          
          <RadioGroup
            name="paymentOption"
            value={paymentOption}
            onChange={handlePaymentOptionChange}
          >
            <FormControlLabel
              value="wallet"
              control={<Radio />}
              label=" Wallet"
            />
            <FormControlLabel
              value="visa"
              control={<Radio />}
              label=" Visa"
            />
          </RadioGroup>
          <FormControl fullWidth>
          <InputLabel id="family-member-label">
            Subscription for:
          </InputLabel>
          <Select
            labelId="family-member-label"
            id="family-member"
            value={selectedFamilyMember}
            onChange={handleFamilyMemberChange}
          >
            <MenuItem value="myself">Myself</MenuItem>
            {familyMembers.map((member) => (
              <MenuItem
                key={member._id}
                value={member._id}
              >
                {member.patient.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={closePaymentDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => paymentOption === 'visa' ? handleCardPayment() : handleWalletPayment()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      
  </div>
)};