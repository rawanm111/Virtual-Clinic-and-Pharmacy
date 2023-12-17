import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Button , TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WalletModal from './walletModal'
import Modal from '@mui/material/Modal';
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
import L1 from "../images/dept-4.jpg";
import P1 from "../images/dept-4.jpg";
import A1 from "../images/dept-4.jpg";
import pharm from "../images/dept-4.jpg";
import { Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';
import { set } from 'lodash';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
 



 export default function() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterValue, setFilterValue] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const inputRef = useRef();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    
    setOpen(false);
  };
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };
  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
  };

  const handleSubmitt = () => {
    handleClose();
    if (!validatePassword(formData.password)) {
      alert("Password must contain at least one uppercase letter, one number, and be at least 4 characters long.");
      return;
    }
    axios.post('http://localhost:3000/admin/', formData) // Use '/admin' for the POST request
      .then(response => {
        console.log('Response:', response.data);

        axios.get('http://localhost:3000/admin')
    .then((response) => {
      if (response.data) {
        const transformedData = response.data.map((item) => ({
          id: item._id, 
          username: item.username,   
        }));
        setAdmins(transformedData);
        setFilteredRowsA(transformedData);

      } else {
        console.error('No data received from the API');
      }
    })
    .catch((error) => {
      console.error('Error fetching admins:', error);
    });
        // Reset the form or display a success message as needed
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle errors or display an error message
      });
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
  const [username, setUsername] = useState('');
  const updatePassword = async (newPassword) => {
    try {
      // Replace '/api/reset-password' with your actual API endpoint
      console.log(adminUsername);
      console.log(newPassword);
      setUsername(adminUsername);
      const response = await axios.put('http://localhost:3000/resetpassword', { username, newPassword });
      console.log(response.data);
      alert('Password successfully updated');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password');
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };


  
  useEffect(() => {
    axios.get('http://localhost:3000/doctors')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id, // Adjust this based on your data structure
            username:item.username,
            name: item.fullName,   // Adjust this based on your data structure
            hourlyRate: item.hourlyRate ,
            educational_bg: item.educationalBackground, // Adjust this based on your data structure
            speciality: item.speciality,
            email:item.email,
            affiliation:item.affiliation
          }));
          setDoctors(transformedData);
          setFilteredRows(transformedData);

        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);



 

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValue(value);
  
    if (Array.isArray(doctors)) {
      const searched = doctors.filter((doctors) => {
        return doctors && doctors.name && doctors.name.toLowerCase().includes(value);
      });
  
      setFilteredRows(searched);
    }
  
    // Set focus to the input
    searchInputRef.current.focus();
  };
  

  useEffect(() => {
    searchInputRef.current.focus();
  }, [filterValue]);
  

  const handleDeleteDocs = (id) => {
    // Send a DELETE request to your backend API
    const url = `http://localhost:3000/doctors/${id}`;
    axios.delete(url)
      .then(() => {
        setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== id));
        setFilteredRows((prevFilteredRows) => prevFilteredRows.filter((doctor) => doctor.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 200 },
    { field: 'hourlyRate', headerName: 'Hourly Rate', width: 200 },
    { field: 'speciality', headerName: 'Speciality', width: 200 },
    { field: 'educational_bg', headerName: 'Educational Background', width: 200 },
    
    
      {field:'action',headerName:"",width:100,
      renderCell: (params) => (
        <div>
          
          <Button variant="outlined" onClick={() => handleDeleteDocs(params.row.id)}>
            DELETE
          </Button>
        </div>
      ),
      
    }
    

  ];
  const handleButtonClick = (row) => {
    // Implement the action you want to perform when the button is clicked
    console.log('Button clicked for row:', row);
    // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

  };

  //Pharmacists
  const [pharmacists, setPharmacists] = useState([]);
  const [filteredRowsPharma, setFilteredRowsPharma] = useState([]);
  const [filterValuePharma, setFilterValuePharma] = useState('');



  useEffect(() => {
    axios.get('http://localhost:3000/pharmacists')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id, // Adjust this based on your data structure
            name: item.fullName, 
            username:item.username,
            email:item.email,
            dateOfBirth:item.dateOfBirth,
            hourlyRate:item.hourlyRate,
            affiliation:item.affiliation,
            educationalBackground:item.educationalBackground

          }));
          setPharmacists(transformedData);
          setFilteredRowsPharma(transformedData);

        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);





  const handleFilterChangePharma = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValuePharma(value);
  
    if (Array.isArray(pharmacists)) {
      const filteredPharm = pharmacists.filter((patient) => {
        return patient && patient.name && patient.name.toLowerCase().includes(value);
      });
  
      setFilteredRowsPharma(filteredPharm);
    }
  
    // Set focus to the input
    searchInputRef.current.focus();
  };
  

  useEffect(() => {
    searchInputRef.current.focus();
  }, [filterValuePharma]);
  
  

  const handleDeletePharma = (id) => {
    // Send a DELETE request to your backend API
    const url = `http://localhost:3000/pharmacists/${id}`;
    axios.delete(url)
      .then(() => {
        setPharmacists((prevPharma) => prevPharma.filter((pharmacist) => pharmacist.id !== id));
        setFilteredRowsPharma((prevFilteredRows) => prevFilteredRows.filter((pharmacist) => pharmacist.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };
  
 
  const handleButtonClickPharma = (row) => {
    // Implement the action you want to perform when the button is clicked
    console.log('Button clicked for row:', row);
    // history.push(`/ProfilePage/${row.id}`); // Replace with your route structure

  }; 





  //Patients


  const [patients, setPatients] = useState([]);
  const [filteredRowsP, setFilteredRowsP] = useState([]);
  const [filterValueP, setFilterValueP] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3000/patients')
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            name: item.fullName,
            username: item.username,
            email: item.email,
            mobileNumber: item.mobileNumber,
            dateOfBirth: item.dateOfBirth,
            gender: item.gender,
          }));
          setPatients(transformedData);
          setFilteredRowsP(transformedData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);
  


  const handleFilterChangeP = (e) => {
    const value = e.target.value.toLowerCase();
    setFilterValueP(value);
  
    if (Array.isArray(patients)) {
      const filteredPatients = patients.filter((patient) => {
        return patient && patient.name && patient.name.toLowerCase().includes(value);
      });
  
      setFilteredRowsP(filteredPatients);
    }
  
    // Set focus to the input
    searchInputRef.current.focus();
  };
  
  
  useEffect(() => {
    searchInputRef.current.focus();
  }, [filterValueP]);
  
  

  const handleDelete = (id) => {
    // Send a DELETE request to your backend API
    const url = `http://localhost:3000/patients/${id}`;
    axios.delete(url)
      .then(() => {
        setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
        setFilteredRowsP((prevFilteredRows) => prevFilteredRows.filter((patient) => patient.id !== id));
        console.log("id");

        console.log(id);
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
      });
  };




const [admins, setAdmins] = useState([]);
const [filteredRowsA, setFilteredRowsA] = useState([]);
const [filterValueA, setFilterValueA] = useState('');
const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
const [adminUsername, setAdminUsername] = useState('');
  const [isPasswordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const Navigate = useNavigate();


  const handleOpenChangePassword = (admin) => {
    setChangePasswordOpen(true);
    console.log(admin.username);
    setAdminUsername(admin.username);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };

  const handleOpenPasswordResetModal = () => {
    setPasswordResetModalOpen(true);
  };

  const handleClosePasswordResetModal = () => {
    setPasswordResetModalOpen(false);
  };
  const [success, setSuccess] = useState(false); 

  const handlePasswordChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
    setSuccess(false); 
  }; 
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '15px',
  };
useEffect(() => {
  axios.get('http://localhost:3000/admin')
    .then((response) => {
      if (response.data) {
        const transformedData = response.data.map((item) => ({
          id: item._id, 
          username: item.username,   
        }));
        setAdmins(transformedData);
        setFilteredRowsA(transformedData);

      } else {
        console.error('No data received from the API');
      }
    })
    .catch((error) => {
      console.error('Error fetching admins:', error);
    });
}, []);





const handleFilterChangeA = (e) => {
  const value = e.target.value.toLowerCase();
  setFilterValueA(value);

  if (Array.isArray(admins)) {
    const filteredAdmins = admins.filter((admin) => {
      return admin && admin.username && admin.username.toLowerCase().includes(value);
    });

    setFilteredRowsA(filteredAdmins);
  }
};

useEffect(() => {
  // Set focus to the input after the state is updated
  searchInputRef.current.focus();
}, [filterValueA]);


const handleDeleteA = (id) => {
  // Send a DELETE request to your backend API
  const url = `http://localhost:3000/admin/${id}`;
  axios.delete(url)
    .then(() => {
      setAdmins((prevPatients) => prevPatients.filter((admin) => admin.id !== id));
      setFilteredRowsA((prevFilteredRows) => prevFilteredRows.filter((admin) => admin.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting admin:', error);
    });
};

// const handleResetPassword = () => {
//   // Implement the logic to reset password
//   navigate(`/changepass/${adminUsername}`);
//   console.log(`Reset password for adminId: ${adminUsername}`);
//   // Example: axios.post(`http://localhost:3000/admin/reset-password/${adminId}`);
// };




const navigateToAdminForm = () => {
  navigate('/AdminForm');
};


//end

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
  setValue(newValue);
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
                className="nav-item dropdown active"
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
                   onClick={() => navigate(`/doctor-requests`)} 
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
              <li className="nav-item " style={{marginRight:"10px"} }>
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
              User Management
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a href="index.html">
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
              User Management <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <Tab label="Patients" {...a11yProps(0)} />
          <Tab label="Doctors" {...a11yProps(1)} />
          <Tab label="Pharmacists" {...a11yProps(2)} />
          <Tab label="Admins" {...a11yProps(3)} />

        </Tabs>
      </Box>

      {/* patients */}
      <CustomTabPanel value={value} index={0}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
       
       <input
  type="text"
  placeholder="Search..."
  value={filterValueP}
  onChange={handleFilterChangeP}
  ref={searchInputRef}
  style={{
    width: '300px',
    borderRadius: '8px',
    padding: '8px',
    border: '1px solid #ccc',
  }}
/>

         
      </Box>
      <section className="ftco-section" style={{ padding: "3em 0", position: "relative" }}>
  <div className="container" style={{ maxWidth: "1230px", margin: "0 auto" }}>
    <div className="row">
      {filteredRowsP.map((patient, index) => (
        
        <div key={index} className="col-md-6 col-lg-4" style={{ marginBottom: "40px" }}>
<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button style={{color:"red"}}  onClick={() => handleDelete(patient.id)}>delete</Button>
</Box>

          <div className="staff" style={{ overflow: "hidden", height: "450px" }}>
            <div className="img-wrap d-flex align-items-stretch" style={{ height: "300px" }}>
              <div className="img align-self-stretch" style={{ backgroundImage: `url(${P1})`, width: "100%", display: "block", backgroundPosition: "top center" }} />
            </div>
            <div className="text pt-3 text-center">
              <h3 style={{ fontSize: "32px", fontWeight: "500", marginBottom: "10px" }}>{ patient.fullName}</h3>
              <span className="position mb-2" style={{ textTransform: "uppercase", color: "#b3b3b3", display: "block", letterSpacing: "1px" }}></span>
              <div className="faded" >
                <p style={{ fontSize: "20px", textTransform: "uppercase" }}>{ patient.name}</p>

                <ul className="ftco-social text-center" style={{color:"black"}}>
                  <li>
                    <a>
                      <p style={{color:"black"}}>Email: { patient.email}</p>
                      <p style={{color:"black"}}> Date of Birth: {patient.dateOfBirth}</p>
                      <p style={{color:"black"}}>Mobile Number: {patient.mobileNumber}</p>
                      <p style={{color:"black"}}>Gender: {patient.gender}</p>




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
      </CustomTabPanel>
      {/* doctors */}
      <CustomTabPanel value={value} index={1}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
            <input
  type="text"
  placeholder="Search..."
  value={filterValue}
  onChange={handleFilterChange}
  ref={searchInputRef}
  style={{
    width: '300px',
    borderRadius: '8px',
    padding: '8px',
    border: '1px solid #ccc',
  }}
/> 
      </Box>
      <section className="ftco-section" style={{ padding: "3em 0", position: "relative" }}>
      
  <div className="container" style={{ maxWidth: "1230px", margin: "0 auto" }}>
    <div className="row">
      {filteredRows.map((doctor, index) => (
        
        <div key={index} className="col-md-6 col-lg-4" style={{ marginBottom: "40px" }}>
<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button style={{color:"red"}}  onClick={() => handleDeleteDocs(doctor.id)}>delete</Button>
</Box>

          <div className="staff" style={{ overflow: "hidden", height: "450px" }}>
            <div className="img-wrap d-flex align-items-stretch" style={{ height: "300px" }}>
              <div className="img align-self-stretch" style={{ backgroundImage: `url(${L1})`, width: "100%", display: "block", backgroundPosition: "top center" }} />
            </div>
            <div className="text pt-3 text-center">
              <h3 style={{ fontSize: "32px", fontWeight: "500", marginBottom: "10px" }}>{doctor.name}</h3>
              <span className="position mb-2" style={{ textTransform: "uppercase", color: "#b3b3b3", display: "block", letterSpacing: "1px" }}>{doctor.role}</span>
              <div className="faded">
                <p style={{ fontSize: "20px", textTransform: "uppercase" }}>{doctor.speciality}</p>

                <ul className="ftco-social text-center">
                  <li>
                    <a>
                      <p style={{color:"black"}}>Email: {doctor.email}</p>
                      <p style={{color:"black"}}>Affiliation: {doctor.affiliation}</p>
                      <p style={{color:"black"}}>Educational Background: {doctor.educational_bg}</p>
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
      </CustomTabPanel>
      {/* pharmacist */}
      <CustomTabPanel value={value} index={2}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
               <input
  type="text"
  placeholder="Search..."
  value={filterValuePharma}
  onChange={handleFilterChangePharma}
  ref={searchInputRef}
  style={{
    width: '300px',
    borderRadius: '8px',
    padding: '8px',
    border: '1px solid #ccc',
  }}
/>
        
      </Box>
      <section className="ftco-section" style={{ padding: "3em 0", position: "relative" }}>
      
  <div className="container" style={{ maxWidth: "1230px", margin: "0 auto" }}>
    <div className="row">
      {filteredRowsPharma.map((pharmacist, index) => (
        
        <div key={index} className="col-md-6 col-lg-4" style={{ marginBottom: "40px" }}>
<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Button style={{color:"red"}}  onClick={() => handleDeletePharma(pharmacist.id)}>delete</Button>
</Box>

          <div className="staff" style={{ overflow: "hidden", height: "450px" }}>
            <div className="img-wrap d-flex align-items-stretch" style={{ height: "300px" }}>
              <div className="img align-self-stretch" style={{ backgroundImage: `url(${pharm})`, width: "100%", display: "block", backgroundPosition: "top center" }} />
            </div>
            <div className="text pt-3 text-center">
              <h3 style={{ fontSize: "32px", fontWeight: "500", marginBottom: "10px" }}>{pharmacist.name}</h3>
              <span className="position mb-2" style={{ textTransform: "uppercase", color: "#b3b3b3", display: "block", letterSpacing: "1px" }}>{pharmacist.role}</span>
              <div className="faded">
                <p style={{ fontSize: "20px", textTransform: "uppercase" }}>{pharmacist.speciality}</p>

                <ul className="ftco-social text-center">
                  <li>
                    <a>
                      <p style={{color:"black"}}>Email: {pharmacist.email}</p>
                      <p style={{color:"black"}}>Educational Background: {pharmacist.educationalBackground}</p>
                      <p style={{color:"black"}}>Hourly Rate: {pharmacist.hourlyRate}</p>

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
      </CustomTabPanel>
      {/* admins */}
      <CustomTabPanel value={value} index={3}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: '16px',
          padding: '10px',
        }}
      >
             <input
  type="text"
  placeholder="Search..."
  value={filterValueA}
  onChange={handleFilterChangeA}
  ref={searchInputRef}
  style={{
    width: '300px',
    borderRadius: '8px',
    padding: '8px',
    border: '1px solid #ccc',
  }}
/>
      </Box>
      <section className="ftco-section" style={{ padding: "3em 0", position: "relative" }}>
  <div className="container" style={{ maxWidth: "1230px", margin: "0 auto" }}>
    <div className="row">
    {filteredRowsA.map((admin, index) => (
  <div key={index} className="col-md-6 col-lg-4" style={{ marginBottom: "40px" }}>
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button style={{ color: "red" }} onClick={() => handleDeleteA(admin.id)}>delete</Button>
    </Box>
    <div className="staff" style={{ overflow: "hidden", height: "450px" }}>
      <div className="img-wrap d-flex align-items-stretch" style={{ height: "300px" }}>
        <div className="img align-self-stretch" style={{ backgroundImage: `url(${A1})`, width: "100%", display: "block", backgroundPosition: "top center" }} />
      </div>
      <div className="text pt-3 text-center">
        <h3 style={{ fontSize: "32px", fontWeight: "500", marginBottom: "10px" }}>{admin.username}</h3>
        <span className="position mb-2" style={{ textTransform: "uppercase", color: "#b3b3b3", display: "block", letterSpacing: "1px" }}></span>
        <div className="faded">
          <ul className="ftco-social text-center" style={{ color: "black" }}>
            <li>
              <a>
                {/* Your social media link or button */}
              </a>
            </li>
          </ul>
          <Button onClick={() => handleOpenChangePassword(admin)}>Reset Password</Button>
        </div>
      </div>
    </div>
  </div>
))}

       <div key={'add'} style={{display:'flex', 
       flexDirection:'column',
        backgroundColor:'rgba(42, 114, 207, 0.8)', 
        justifyContent:'center', 
        borderRadius:'20px',
        transition: 'background-color 0.3s', // Add transition for smooth effect
        cursor: 'pointer', // Set cursor to pointer on hover
        border:'2px solid #2a72cf'
        }}
        className="col-md-6 col-lg-4"

        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#2a72cf' ;
          
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor ='rgba(42, 114, 207, 0.8)';
        }}
        onClick={handleOpen}
        >
        <AddIcon style={{ fontSize: '20rem' , color:'white' ,width:"100%" }}/>
        <h1 style={{textAlign:'center', color:'white',padding:"20px" }}>Create Admin</h1>
        </div>

    </div>
  </div>
</section>
      </CustomTabPanel>
    </Box>

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
  >
    <Box sx={{ ...style, width: 400 }}>
    <Container
        maxWidth="sm"
        style={{
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '15px',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Admin Form
        </Typography>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button variant="contained" color="primary" startIcon={<LockOutlinedIcon />} onClick={handleSubmitt}>
          Add Admin
        </Button>
      </Container>
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
                onChange={handlePasswordChange('newPassword')}
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
                onChange={handlePasswordChange('confirmNewPassword')}
              />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
        </Box>
        </Box>
        
      </Modal>
</div>
)}