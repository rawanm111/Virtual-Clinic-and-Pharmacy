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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import {Radio, RadioGroup, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const PageContainer = styled('div')({
  backgroundColor: 'lightblue',
  padding: '16px',
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const CardsContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
});

const CardWrapper = styled(Card)(({ theme }) => ({
  marginBottom: '16px',
  border: '1px solid #0070F3',
  backgroundColor: '#f0f8ff',
  marginRight: '16px',
  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.9)',
  borderRadius: '5px',
  marginLeft: '5px',
}));

const NameTypography = styled(Typography)({
  color: '#000080',
  marginBottom: '1rem',
  fontWeight: 'bold',
});

const SubtitleTypography = styled(Typography)({
  color: '#0050C0',
  fontWeight: 'bold',
  marginBottom: '10px',
});

const DataTypography = styled(Typography)({
  color: '#000080',
  marginBottom: '0.5rem',
  marginLeft: '0.5rem',
});

function HealthPackagesView() {
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

  const handleSelectPackage = (event) => {
    const selectedPackage = event.target.value;
    setSelectedHealthPackage(selectedPackage);
    setSelectedPackageId(selectedPackage.id);
    setSelectedPackageName(selectedPackage.name); // Update the selected package name
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
    setIsPaymentDialogOpen(false);
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
      if (!packageType) {
        console.error('No health package selected.');
        return;
      }
  
      // Find the selected health package by its ID
      const selectedPackage = healthPackages.find((Package) => Package.name === packageType);
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
                  <SubtitleTypography variant="subtitle1">
                    Annual Price:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    ${healthPackage.annualPrice}
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Discount on Doctor Session Price:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {healthPackage.discountOnDoctorSessionPrice}%
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Discount on Medicine Orders:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {healthPackage.discountOnMedicineOrders}%
                  </DataTypography>
                </div>
                <div>
                  <SubtitleTypography variant="subtitle1">
                    Discount on Family Member Subscription:
                  </SubtitleTypography>
                  <DataTypography variant="body2">
                    {healthPackage.discountOnFamilyMemberSubscription}%
                  </DataTypography>
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
                value={member._id}
              >
                {member.patient.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div></div>
        

        
     

       

{/* 
      <Button
  variant="contained"
  color="secondary"
  onClick={handleCardPayment}
  //sx={{ mt: 2, mr: 1 }}
>
  Pay with Card
</Button>

<Button
  variant="contained"
  color="success"
  onClick={handleWalletPayment}
  //sx={{ mt: 2 }}
>
  Pay with Wallet
</Button>  */}



<Button onClick={openPaymentDialog} variant='contained'>Choose Payment Options</Button>

<Dialog
        open={isPaymentDialogOpen}
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
              label="Payment by Wallet"
            />
            <FormControlLabel
              value="visa"
              control={<Radio />}
              label="Payment by Visa"
            />
          </RadioGroup>
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
      
      
      
      </form>




    </div>
    
  );
}

export default HealthPackagesView;
