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

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const PageContainer = styled('div')({
  backgroundColor: 'lightblue',
  //minHeight: '100vh',
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

  console.log('Health Package component is rendering.');
  
  const [healthPackages, setHealthPackages] = useState([]);
  const [allHealthPackages, setAllHealthPackages] = useState([]);
  const [selectedHealthPackage, setSelectedHealthPackage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState('');


  const [selectedPackageId, setSelectedPackageId] = useState('');

  const handleSelectPackage = (event, packageId) => {
    setSelectedPackageId(event.target.checked ? packageId : '');
  };


  useEffect(() => {
    axios
      .get('http://localhost:3000/health-packages')
      .then((response) => {
        // Map over each package and ensure it has an 'id' field set to the unique '_id'
        const packagesWithId = response.data.map((pkg) => ({
          ...pkg,
          id: pkg._id,  // Ensuring each package has an 'id' field for the DataGrid
        }));
        setHealthPackages(packagesWithId);
      })
      .catch((error) => {
        console.error('Error fetching health packages:', error);
      });
  }, []);


  



  




  



  const [packageType, setPackageType] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');

  const handlePackageTypeChange = (event) => {
    setPackageType(event.target.value);
  };

  // const handleStartDateChange = (event) => {
  //   setStartDate(event.target.value);
  // };

  // const handleEndDateChange = (event) => {
  //   setEndDate(event.target.value);
  // };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Submit logic goes here. For example, you could send a POST request to your server.
//     console.log(`Package: ${packageType}, Start: ${startDate}, End: ${endDate}`);
//   };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

  // Function to format date in dd/mm/yyyy
  const formatDate = (date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() returns 0-11
    let year = date.getFullYear();

    // Ensuring two digits for day and month
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  };

  // Get the current date
  const currentDate = new Date();

  // Set startDate to the current date
  const startDate = formatDate(currentDate);

  // Set endDate to one year from the current date
  currentDate.setFullYear(currentDate.getFullYear() + 1);
  const endDate = formatDate(currentDate);

  // Construct the payload from the state values
  const packageData = {
    patient: id,
    package: packageType,
    status: 'Subscribed',
    startdate: startDate,
    enddate: endDate,
     // Hardcoded for now
    // Add other necessary fields as per your PatientPackages model
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

  const handleCardPayment = () => {
    // Logic for handling payment with card
    console.log('Card payment initiated');
    // You can add your payment processing logic here
  };
  
  const handleWalletPayment = () => {
    // Logic for handling payment with wallet
    console.log('Wallet payment initiated');
    // You can add your payment processing logic here
  };
  



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
            value={packageType}
            label="Package Type"
            onChange={handlePackageTypeChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="platinum">Platinum</MenuItem>
          </Select>
        </FormControl>


     

        <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>


      <Button
  variant="contained"
  color="secondary"
  onClick={handleCardPayment}
  //sx={{ mt: 2, mr: 1 }}
>
  Pay with Card
</Button>

{/* Payment with Wallet Button */}
<Button
  variant="contained"
  color="success"
  onClick={handleWalletPayment}
  //sx={{ mt: 2 }}
>
  Pay with Wallet
</Button>
      </form>




    </div>
  );
}

export default HealthPackagesView;
