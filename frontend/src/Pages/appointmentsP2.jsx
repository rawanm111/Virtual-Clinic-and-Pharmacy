import React, { useEffect ,useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
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
import Notif from "./notifModal";
import { FaMessage} from 'react-icons/fa6';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import WalletModal from './walletModal'
import Modal from '@mui/material/Modal';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
 export default function() {
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [availableApps, setAvailableApps] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);
  const currentDate = new Date();
  const { id } = useParams();
  const [checkAvailabilityDate, setCheckAvailabilityDate] = useState('');
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentOption, setPaymentOption] = useState('wallet');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedFamilyMember, setSelectedFamilyMember] = useState('myself');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [patientHealthPackage, setPatientHealthPackage] = useState([]);
  const [allHealthPackages, setAllHealthPackages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [rate, setRate] = useState(0);
  const [packName, setPackName] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [currentImage, setCurrentImage] = useState(I2);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [healthPackages, setHealthPackages] = useState([]);
  const [newAppointmentDateTime, setNewAppointmentDateTime] = useState('');
  const [followUpDateTime, setFollowUpDateTime] = useState('');
  const [followUpPatientName, setFollowUpPatientName] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const navigate = useNavigate();
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

  const patientId = id;

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
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/apps/patient/${id}`)
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            status: item.status,
            date: new Date(item.date),
            healthPackage: item.healthPackage,
          }));
          setApps(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching apps:', error);
      });
  }, [id]);

  //i want to get the health package of the patient using axios

  useEffect(() => {
    axios
      .get(`http://localhost:3000/PatientPackages/${patientId}`)
      .then((response) => {
        setPatientHealthPackage(response.data);
        console.log(response.data, 'response.data');
        console.log(patientHealthPackage, 'patientHealthPackage');
      })
      .catch((error) => {

        console.error('Error fetching patient health package:', error);
      });
  }, [patientId]);



  useEffect(() => {
    axios
      .get(`http://localhost:3000/health-packages`)
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctors`)
      .then((response) => {
        if (response.data) {
          setDocs(response.data);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/apps/available-appointments`)
      .then((response) => {
        if (response.data) {
          const availableData = response.data.map((item) => ({
            id: item._id,
            DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
            date: new Date(item.date),
          })).filter((item) => item.date >= currentDate);

          setAvailableApps(availableData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching available appointments:', error);
      });
  }, []);
  
  const calculateDiscountedPrice = (appointment) => {
    // console.log(appointment, 'appointment');
    const sessionPrice = docs.find((doc) => doc.fullName === appointment.DoctorName)?.hourlyRate || 0;
    const healthPackage = allHealthPackages.find(
      (pkg) => pkg.Name === patientHealthPackage.package
      
    );
    if (healthPackage) {
      const discountPercentage = healthPackage.discountOnDoctorSessionPrice || 0;
      const discount = Math.floor((discountPercentage / 100) * sessionPrice);
       console.log(discount, "discount");
       console.log(sessionPrice, "price");
      setDiscountedPrice(sessionPrice-discount);
      return sessionPrice - discount;
    }
    setDiscountedPrice(sessionPrice);
    return sessionPrice;
  };
  const availableColumns = [
    { field: 'DoctorName', headerName: 'Doctor Name', width: 250 },
    { field: 'date', headerName: 'Date', width: 600 },
    {
      field: 'discountedPrice',
      headerName: 'Discounted Price',
      width: 200,
      renderCell: (params) => {
        const discountedPrice = calculateDiscountedPrice(params.row);
        return (
          <span>
            
            {discountedPrice.toFixed(2)}
          </span>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        
        return (
          <span>
           
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: '180px' }}
              onClick={() => handleBookAppointment(params.row.id, discountedPrice)}
            >
              Book 
            </Button>
          </span>
        );
      },
    },
  ];


  

  const handleStatusFilterChange = (event) => {
    setSelectedStatusFilter(event.target.value);
  };

  const handleFilterChange = () => {
    const filteredApps = apps.filter((app) => {
      const isDateInRange =
        (!dateFilterStart || app.date >= dateFilterStart) &&
        (!dateFilterEnd || app.date <= dateFilterEnd);

      const isStatusMatch =
        selectedStatusFilter === 'All' || app.status === selectedStatusFilter;

      return isDateInRange && isStatusMatch;
    });
    setFilteredRows(filteredApps);
  };



  const handleFilterChangeOne = () => {
    const checkDate = checkAvailabilityDate ? new Date(checkAvailabilityDate) : null;
  
    // Filter availableApps based on both date and doctor's specialty
    const filteredAvailableApps = availableApps.filter((app) => {
      const appDate = new Date(app.date);
  
      // Check if the date matches (if checkDate is provided)
      const isDateMatch = !checkDate || (
        appDate.getFullYear() === checkDate.getFullYear() &&
        appDate.getMonth() === checkDate.getMonth() &&
        appDate.getDate() === checkDate.getDate() &&
        appDate.getHours() === checkDate.getHours() &&
        appDate.getMinutes() === checkDate.getMinutes()
      );
  
      // Check if the doctor's specialty matches
      const doctorSpecialty = docs.find((doc) => doc.fullName === app.DoctorName)?.speciality;
      const isSpecialtyMatch = selectedSpecialty === 'All' || doctorSpecialty === selectedSpecialty;
  
      // Return true only if both date and specialty match
      return isDateMatch && isSpecialtyMatch;
    });
  
    setAvailableApps(filteredAvailableApps);
  };
  

  

  const [discountedPrice, setDiscountedPrice] = useState(0);
  const handleBookAppointment = async (appointmentId, discountedPrice) => {
    setSelectedAppointmentId(appointmentId);
    setDiscountedPrice(discountedPrice);
    console.log(discountedPrice, "discountedPrice");
    setIsPaymentDialogOpen(true);
  
   
  };

  const closePaymentDialog = () => {
    setIsPaymentDialogOpen(false);
  };

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const handleFamilyMemberChange = (event) => {
    setSelectedFamilyMember(event.target.value);
  };

  const handleSubmitPayment = async () => {
    if (selectedAppointmentId) {
      closePaymentDialog();
      let updatedAppointment;

      if (selectedFamilyMember === 'myself') {
        updatedAppointment = {
          patient: id,
          familyMember: null,
          status: 'Upcoming',
        };
      } else {
        const selectedFamilyMemberData = familyMembers.find(
          (member) => member._id === selectedFamilyMember
        );

        updatedAppointment = {
          patient: selectedFamilyMemberData.patient._id,
          familyMember: selectedFamilyMember,
          status: 'Upcoming',
        };
      }

      try {
        await axios.put(
          `http://localhost:3000/apps/${selectedAppointmentId}`,
          updatedAppointment
        );

        const response = await axios.get(
          `http://localhost:3000/apps/available-appointments`
        );

        if (response.data) {
          const availableData = response.data
            .map((item) => ({
              id: item._id,
              DoctorName: item.doctor
                ? item.doctor.fullName
                : 'Doctor Not Found',
              date: new Date(item.date),
            }))
            .filter((item) => item.date >= currentDate);
          console.log(response);
          setAvailableApps(availableData);
        } else {
          console.error(
            'No available appointments data received from the API'
          );
        }

        const appsResponse = await axios.get(
          `http://localhost:3000/apps/patient/${id}`
        );

        if (appsResponse.data) {
          const transformedData = appsResponse.data.map((item) => ({
            id: item._id,
            patientId: id,
            DoctorName: item.doctor
              ? item.doctor.fullName
              : 'Doctor Not Found',
            status: item.status,
            date: new Date(item.date),
          }));
          setApps(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
        try {
          // Make the additional request to http://localhost:3000/apps/lastAppointment
          const response = await axios.post('http://localhost:3000/apps/lastAppointment', {
            id: id,
          });
          // Process the response as needed
          console.log('Last Appointment:', response.data);
        } catch (error) {
          console.error('Error fetching last appointment:', error);
        }
      } catch (error) {
        console.error('Error booking appointment:', error);
      }
    }
  };
  const getAppointment = async () => {
    try {
      const response = await axios.get('http://localhost:3000/apps/available-appointments');
      if (response && response.status === 200) {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          console.log(data);
          console.log('Will handle payment now');
          // Assuming selectedAppointmentId is defined
          handlePayment(data, selectedAppointmentId,discountedPrice);
        } else {
          console.error('No valid data found in the response.');
        }
      } else {
        console.error('Error:', response && response.data);
      }
    } catch (error) {
      console.error('Error fetching available appointments:', error);
    }
  };
  

  const handlePayment = async (cartData, selectedAppointmentId,discountedPrice) => {
    try {
      const items = cartData;
     console.log(items);
     console.log(selectedAppointmentId);
      if (!Array.isArray(items) || items.length === 0) {
        console.error('No valid items found in the cart data.');
        return;
      }
      
      const selectedItem = items.find(item => item._id === selectedAppointmentId);
  
      if (!selectedItem) {
        console.error('Selected appointment not found in the cart data.');
        return;
      }
  
      const doctorId = selectedItem.doctor && selectedItem.doctor._id;
  
      if (!doctorId) {
        console.error('Doctor ID is not available for the selected appointment.');
        return;
      }
  
      console.log('Selected Appointment ID:', selectedAppointmentId);
      console.log('Doctor ID:', doctorId);
      console.log('Patient ID:', apps);
      console.log('app:', selectedAppointmentId);
      //find appointment in apps using selectedAppointmentId
      const appointment = apps.find((app) => app.id === selectedItem._id);
      console.log(appointment, "appointment");
  
  
      console.log('Discounted Price:', discountedPrice);
       
      try {
        const response = await axios.post('http://localhost:3000/payment', {
          appId: selectedAppointmentId,
          patientId: id,
          price: discountedPrice,
          lineItem: {
            price_data: {
              currency: 'usd',
              product_data: {
                name: selectedAppointmentId.toString(),
              },
              unit_amount: discountedPrice * 100, 
            },
            quantity: 1,
          },
        });
  
        console.log('Will handle payment now');
        console.log(response && response.data);
        handleSubmitPayment();
  
        if (response && response.status === 200) {
          window.location = response.data && response.data.url;
          console.log(response.data && response.data.url);
        } else {
          console.error('Error:', response && response.data);
        }
      } catch (error) {
        console.error('Error handling payment:', error.response && error.response.data);
      }
    } catch (error) {
      console.error('Error fetching available appointments:', error);
    }
  };
  

  

  
  const handleWallet2 = async () => {
    try {
        console.log("wallet")
        const response = await axios.get(`http://localhost:3000/wallet/${id}`, {
          
        });
        // const prev= response.data.balance - 200;
        console.log(response.data, "wallet")

        if (response.data.balance < 200) {
          console.error("Insufficient balance");
          
        }
        else{
          {handleSubmitPayment()}
        if (response && response.status === 200) {
          console.log('Wallet payment successful!');
         
          const price=calculateDiscountedPrice();
          console.log(price, "price");
          const response1 = await axios.put(`http://localhost:3000/wallet/${id}/update-balance`, {
            
            patientId: id,
            balance: response.data.balance - price,
          });

          
        } else {
          console.error('Wallet payment failed:', response && response.data);
          // Handle wallet payment failure (e.g., show error message to the user)
        }
      }
    } catch (error) {
      console.error('Error processing wallet payment:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  const handleWallet = async () => {
    closePaymentDialog();
    try {

      console.log("wallet",discountedPrice)
      const response = await axios.get(`http://localhost:3000/wallet/${id}`);

      if (response.data.balance < discountedPrice ) {
        console.error("Insufficient balance");
      } else {
        {handleSubmitPayment()}
        
        const updatedBalance = response.data.balance - discountedPrice;
        setWalletBalance(updatedBalance);
        console.log(walletBalance);
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
      <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/clinic-patient-home/${id}`)}>
                  Home
                </a>
              </li>
              <li
                className="nav-item dropdown "
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
                  onClick={() => navigate(`/my-fam/${id}`)}>
                    My Family
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/MedHistory/${id}`)}>
                    My Medical History
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Prescription/${id}`)}>
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
                  onClick={() => navigate(`/doctorsTable/${id}`)}>
                    Doctors List
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  onClick={() => navigate(`/appPagePatient/${id}`)}>
                    My Appointments
                  </a>
                  <a className="dropdown-item" 
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
                 onClick={() => navigate(`/health-packages-VIEW/${id}`)}>
                    Health Packages
                  </a>
                  <a className="dropdown-item" 
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
  style={{marginLeft:"530px"}}
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
                  onClick={handleOpenChangePassword}>
      Change Password
    </a>
    <a className="dropdown-item" 
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
</li><li className="nav-item "  >
                <a  className="nav-link pl-0"  style={{cursor:"pointer" ,marginLeft:'5px'} } onClick={() => navigate(`/messages/${id}`)}>
                <FaMessage style={{ fontSize: '20px'}} />
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
             Available Appointments
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Book Appointment <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <>
  
 {/* Right Section */}
 <Box sx={{ flex: 1, backgroundColor: '#FFFFFF', padding: '12px', margin: '70px', marginTop: '70', border: '2px solid #007bff', borderRadius: '8px', textAlign: 'center', width: '90%' }}>
          
          
          {/* Specialty Select and Datetime-local input */}
            {/* Specialty Select and Datetime-local input */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'baseline' }}>
          <FormControl variant="outlined" style={{ flex: 1 }}>
  <InputLabel id="specialty-filter-label">Specialty</InputLabel>
  <Select
    labelId="specialty-filter-label"
    id="specialty-filter"
    value={selectedSpecialty}
    onChange={(e) => setSelectedSpecialty(e.target.value)}
  >
    <MenuItem value="All">All Specialities</MenuItem>
    {docs.map((doc) => (
      <MenuItem key={doc._id} value={doc.speciality}>
        {doc.speciality}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            {/* Datetime-local input */}
            <TextField
              type="datetime-local"
              variant="outlined"
              value={checkAvailabilityDate}
              onChange={(e) => setCheckAvailabilityDate(e.target.value)}
              style={{ flex: 1 }}
            />
          </Box>

          {/* Buttons with fixed height */}
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
            <Button variant="contained" style={{ flex: 1, height: '56px' }} onClick={handleFilterChangeOne}>
              Check Availability
            </Button>
            <Button
              variant="contained"
              style={{ flex: 1, height: '56px' }}
              onClick={() => {
                setCheckAvailabilityDate('');

                axios.get(`http://localhost:3000/apps/available-appointments`)
                  .then((response) => {
                    if (response.data) {
                      const availableData = response.data.map((item) => ({
                        id: item._id,
                        DoctorName: item.doctor ? item.doctor.fullName : 'Doctor Not Found',
                        date: new Date(item.date),
                      })).filter((item) => item.date >= currentDate);

                      setAvailableApps(availableData);
                    } else {
                      console.error('No data received from the API');
                    }
                  })
                  .catch((error) => {
                    console.error('Error fetching available appointments:', error);
                  });
              }}
            >
              Reset
            </Button>
          </Box>


          

        <Box sx={{ marginTop: '16px' }}>
          {/* DataGrid Section */}          
          <DataGrid
              rows={availableApps}
              columns={availableColumns}
              pageSize={5}
              rowHeight={40}
              autoHeight
              columnBuffer={5}
              cellClassName={() => 'custom-cell-class'}
            />

        </Box>
      </Box>
      <Dialog
        open={isPaymentDialogOpen}
        onClose={closePaymentDialog}
      >
        <DialogTitle style={{color:'#2f89fc', fontWeight:'900px'}}>Select Payment Method</DialogTitle>
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
          <FormControl style={{width:'100%'}}>
           <InputLabel  id="family-member-label" >
              Appointment For:
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
          <Button onClick={() => paymentOption === 'visa' ? getAppointment() : handleWallet()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

  </>
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
)}