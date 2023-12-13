import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';
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
import WalletModal from './walletModal'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Radio, RadioGroup, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Modal from '@mui/material/Modal';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default function HealthPackagesView() {
  const [healthPackages, setHealthPackages] = useState([]);
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
  const handleSubmitt = (event) => {
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
      alert('Password successfully updated');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password');
    }
  };
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

  
  const handleCardPayment = async () => {
    try {  
     
      const packageId = selectedPackageId;
      const items = [selectedPackageId]; 
      console.log(packageId);
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
    closePaymentDialog();

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
  


  // const handleWallet = async () => {
  //   try {
      
  //       // Make a request to your backend to process wallet payment
        
  //       const response = await axios.get(`http://localhost:3000/wallet/${id}`, {
          
  //       });
  //       // const prev= response.data.balance - 200;
  //       console.log(response.data)

  //       if (response.data.balance < 200) {
  //         console.error("Insufficient balance");
          
  //       }
  //       else{
  //         {handleSubmitPayment()}
  //       if (response && response.status === 200) {
  //         console.log('Wallet payment successful!');
  //         // Optionally, you can handle any additional logic after a successful wallet payment
          
  //         // Update the user's wallet balance (assuming you have a state for wallet balance)
  //         // setWalletBalance(prev);
  //         // console.log(walletBalance)
          
  //         const response1 = await axios.put(`http://localhost:3000/wallet/${id}/update-balance`, {
            
  //           patientId: id,
  //           balance: response.data.balance - 200,
  //         });

          
  //       } else {
  //         console.error('Wallet payment failed:', response && response.data);
  //         // Handle wallet payment failure (e.g., show error message to the user)
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error processing wallet payment:', error);
  //     // Handle error (e.g., show error message to the user)
  //   }
  // };
  



  return (
    <div>
      <AppBarComponent />
      <PageContainer>
        <HeaderContainer>
          <Typography variant="h4" component="div" sx={{ color: '#000080' }}>
            Health Packages
          </Typography>
        </HeaderContainer>


        
        <CardsContainer>

          {healthPackages.map((healthPackage) => (
            <CardWrapper key={healthPackage._id} variant="outlined">
              <CardContent>
                <NameTypography variant="h5" component="div">
                  {healthPackage.name}
                </NameTypography>
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
                 
                </div>
              </CardContent>
            </CardWrapper>
          ))}
        </CardsContainer>
      </PageContainer>

    <br/>    <br/>    <br/>
    <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="package-type-label">Package Type</InputLabel>
          <Select
            labelId="package-type-label"
            id="package-type-select"
            value={selectedHealthPackage} // Updated state
            label="Package Type"
            onChange={handleSelectPackage}
            sx={{ mb: 2 }}
          >
            {healthPackages.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg}>
                {pkg.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
                value={member.patient._id}
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