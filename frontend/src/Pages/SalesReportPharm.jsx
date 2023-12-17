import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem'; 
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import NotifModel from './NotifModel'
import PharmacistWallet from "./walletModalPharmacist";
import { FaMessage } from "react-icons/fa6";

 export default function() {
    const [currentImage, setCurrentImage] = useState(I2);
    const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
    const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
    const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
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
    
    const toggleImage = () => {
      setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
    };
  
    useEffect(() => {
      const intervalId = setInterval(toggleImage, 2000);
      return () => clearInterval(intervalId);
    }, []);
 
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [medicationData, setMedicationData] = useState([]);
  const [uniqueMedicalUses, setUniqueMedicalUses] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchMedicationData(); 
    fetchAllOrders();// Refetch medication data when the date changes
  };
  useEffect(() => {
    fetchMedicationData();
    fetchAllOrders();
  }, [selectedDate]);

  const fetchMedicationData = async () => {
    try {
      const queryParameters = {
        // Include any query parameters needed for your API request
      };

      const response = await axios.get('http://localhost:3000/meds/', {
        params: queryParameters,
      });

      const responseData = response.data;
      console.log('Fetched data:', responseData);
      setMedicationData(responseData);

      // Extract unique medical uses from fetched data
      const uniqueUses = [...new Set(responseData.map((item) => item.name))];
      setUniqueMedicalUses(uniqueUses);
    } catch (error) {
      console.error('Error fetching medication data:', error);
    }
  };
  const fetchAllOrders = async () => {
    try {
      // Adjust the API endpoint and parameters based on your server implementation
      const response = await axios.get('http://localhost:3000/Order/orders', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1, // Months are zero-based in JavaScript
        },
      });

      const orders = response.data;
      console.log('Fetched orders:', orders);
      setAllOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  

  const generateTableColumns = () => {
    const flexValue = 1 / (uniqueMedicalUses.length + 2);
    const columns = [];
  
    // Push the 'Date' column
    columns.push({ field: 'date', headerName: 'Date', flex: flexValue });
  
    if (!selectedMedication) {
      // Include columns for all medications
      uniqueMedicalUses.forEach((medicalUse) => {
        columns.push({
          field: medicalUse,
          headerName: medicalUse,
          flex: flexValue,
        });
      });
    }
  
    // If there is a selected medication, include its column
    if (selectedMedication) {
      columns.push({
        field: selectedMedication,
        headerName: selectedMedication,
        flex: flexValue,
      });
    }
  
    // Push the 'Total Money' column
    columns.push({ field: 'totalMoney', headerName: 'Total Money', flex: flexValue });
  
    return columns;
  };
  
  
  
  const generateTableRows = () => {
    // Assuming selectedDate is a JavaScript Date object
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();
  
    const rows = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const row = { id: i, day: i };
  
      // Add the date for each row
      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        i
      );
      row.date = currentDate.toLocaleDateString(); // Format the date as needed
  
      // Add medication data for each day
      uniqueMedicalUses.forEach((medicalUse) => {
        // Find all non-canceled orders for the specified date and medication name
        const ordersForDateAndMedication = allOrders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          const isSameDate =
            orderDate.getFullYear() === currentDate.getFullYear() &&
            orderDate.getMonth() === currentDate.getMonth() &&
            orderDate.getDate() === currentDate.getDate();
  
          const isMedicationInOrder = order.items.some(
            (item) => item.name === medicalUse
          );
  
          // Exclude orders with status "canceled"
          return (
            isSameDate &&
            isMedicationInOrder &&
            order.status !== 'canceled' &&
            (!selectedMedication || medicalUse === selectedMedication)
          );
        });
  
        // Accumulate quantities from all matching non-canceled orders
        const totalQuantity = ordersForDateAndMedication.reduce(
          (sum, order) => {
            const matchingItem = order.items.find(
              (item) => item.name === medicalUse
            );
            return sum + (matchingItem ? matchingItem.quantity : 0);
          },
          0
        );
  
        row[medicalUse] = totalQuantity;

        // Calculate the total value for the medication
        const price = medicationData.find((item) => item.name === medicalUse)?.price || 0;
        const totalValue = totalQuantity * price;
  
        // Display the quantity and total value in the desired format
        row[medicalUse] = `${totalQuantity} X $${price} `;
      });
  
      const totalMoney = uniqueMedicalUses.reduce((sum, medicalUse) => {
        const quantity = row[medicalUse]?.split(' X ')[0] || 0; // Extract quantity from the displayed string
        const price = medicationData.find((item) => item.name === medicalUse)?.price || 0;
        const totalValue = quantity * price;
        return sum + totalValue;
      }, 0);

      row.totalMoney = `$${totalMoney}`;
      rows.push(row);
    }
  
    const filteredRows = rows.filter((row) => {
        const rowDate = new Date(row.date);
        return (
          (!selectedStartDate || rowDate >= selectedStartDate) &&
          (!selectedEndDate || rowDate <= selectedEndDate)
        );
      });
    
      return filteredRows;
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
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a className="nav-link pl-0"  onClick={() => navigate(`/pharm-home/${id}`)} style={{cursor:"pointer" } } >
                  Home
                </a>
              </li>
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/pharm-meds/${id}`)} style={{cursor:"pointer" } } >
                  Store
                </a>
              </li>
              <li className="nav-item active " style={{marginRight:"10px"} }>
                <a className="nav-link pl-0"  onClick={() => navigate(`/salespharm`)} style={{cursor:"pointer" } } >
                  Sales report 
                </a>
              </li>
              
             
              
              {/* Profile dropdown */}
              
    
<li 
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"730px"}}
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
<PharmacistWallet/>

</li>
<li className="nav-item ">
<NotifModel/>



</li>
<li 
  className="nav-item dropdown active"
  onMouseEnter={() => setShowMessagesDropdown(true)}
  onMouseLeave={() => setShowMessagesDropdown(false)}
  
>
  <a
    className="nav-link dropdown-toggle"
    style={{cursor:"pointer" } } 
    id="profileDropdown"
    role="button"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded={showMessagesDropdown}
    
  >
    <FaMessage style={{ fontSize: '20px', marginRight: '5px' }} />
    
  </a>
  <div
    className={`dropdown-menu ${showMessagesDropdown ? 'show' : ''}`}
    aria-labelledby="profileDropdown"
  >
   <a
    className="dropdown-item" style={{cursor:"pointer" } } 
    onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
    onMouseLeave={(e) => e.target.style.backgroundColor = ''}
    onClick={() => navigate(`/messagesPharmtoDoc/${id}`)}
  >
    Chat with Doctor
  </a>
  <a
    className="dropdown-item" style={{cursor:"pointer" } } 
    onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
    onMouseLeave={(e) => e.target.style.backgroundColor = ''}
    onClick={() => navigate(`/messagesPharmtoPat/${id}`)}
  >
    Chat with Patient
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
            Sales Report
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
              Sales Report <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

  {/* Medication TextField on the left */}
  <TextField 
    select
    label="Medication"
    value={selectedMedication}
    onChange={(e) => setSelectedMedication(e.target.value)}
    style={{ margin: '8px', minWidth:'200px'}}
  >
    <MenuItem value="">All Medications</MenuItem>
    {uniqueMedicalUses.map((medicalUse) => (
      <MenuItem key={medicalUse} value={medicalUse}>
        {medicalUse}
      </MenuItem>
    ))}
  </TextField>

  {/* Date Filter in the middle */}
  <Box mt={3} mb={3} style={{ textAlign: 'center', border: '2px solid #007bff', borderRadius: '5px' }}>
    <DatePicker
      style={{ border: 'none', textAlign: 'center' }}
      selected={selectedDate}
      onChange={handleDateChange}
      showMonthYearPicker
      dateFormat="MMMM yyyy"
    />
  </Box>
  <Box mt={3} mb={3} style={{ textAlign: 'center', border: '2px solid #007bff', borderRadius: '5px' }}>
  {/* Start and End Date Pickers on the right */}
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <DatePicker
      selected={selectedStartDate}
      onChange={(date) => setSelectedStartDate(date)}
      selectsStart
      startDate={selectedStartDate}
      endDate={selectedEndDate}
      isClearable
      placeholderText="Start Date"
      style={{ margin: '8px' }}
    />
    <DatePicker
      selected={selectedEndDate}
      onChange={(date) => setSelectedEndDate(date)}
      selectsEnd
      startDate={selectedStartDate}
      endDate={selectedEndDate}
      isClearable
      placeholderText="End Date"
      style={{ margin: '8px' }}
    />
  </div>
  </Box>

</Container>

        


      
     <div style={{  border: '2px solid #007bff',height:'500px', borderRadius: '5px', display:"flex" ,margin: '30px'}}>
        <DataGrid
          rows={generateTableRows()}
          columns={generateTableColumns()}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 30]}
        />
      </div>
     

    
      </div>
    )};