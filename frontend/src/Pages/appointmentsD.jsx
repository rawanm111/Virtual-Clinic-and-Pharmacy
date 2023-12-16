import React, { useEffect ,useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, MenuItem, Container, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/system';
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
import I1 from "../images/about.jpg";
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';
import WalletModal from './walletModal'
import { format } from 'date-fns';
import Notif from "./notifdoc";

 export default function() {
  const [currentImage, setCurrentImage] = useState(I2);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [healthPackages, setHealthPackages] = useState([]);
  const [dateReschedule, setDateReschedule] = useState(null);
  const [isRescheduelOpen,setIsRescheduelOpen] = useState();
  const [app,setApp] = useState();
  const [apps, setApps] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [dateFilterStart, setDateFilterStart] = useState(null);
  const [dateFilterEnd, setDateFilterEnd] = useState(null);
  const [newAppointmentDateTime, setNewAppointmentDateTime] = useState('');
  const [followUpDateTime, setFollowUpDateTime] = useState('');
  const [followUpPatientName, setFollowUpPatientName] = useState('');
  const [appointmentStatus, setAppointmentStatus] = useState('');
  const currentDate = new Date();

 

  const navigate = useNavigate();
  const { id } = useParams();
  
 const openModal =(selectedapp) => {
  setApp(selectedapp);
  setIsRescheduelOpen(true);
 }
  useEffect(() => {
    axios.get(`http://localhost:3000/apps/doctor/${id}`)
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            PatientName: item.patient ? item.patient.fullName : 'Not Assigned Yet',
            status: item.status,
            date: new Date(item.date),
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

  const isDateTimeValid = (selectedDateTime) => {
    return selectedDateTime >= currentDate;
  };

  const handleAddAppointment = () => {
    if (isDateTimeValid(new Date(newAppointmentDateTime))) {
      const newAppointment = {
        patient: null,
        doctor: id,
        status: 'Available',
        date: new Date(newAppointmentDateTime),
      };

      axios.post('http://localhost:3000/apps', newAppointment)
        .then((response) => {
          console.log('New appointment created:', response.data);
          axios.get(`http://localhost:3000/apps/doctor/${id}`)
            .then((response) => {
              if (response.data) {
                const transformedData = response.data.map((item) => ({
                  id: item._id,
                  PatientName: item.patient ? item.patient.fullName : 'Not Assigned Yet',
                  status: item.status,
                  date: new Date(item.date),
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
        })
        .catch((error) => {
          console.error('Error creating appointment:', error);
        });
    } else {
      console.error('Selected date is before the current date');
    }
  };

  const handleBookFollowUpAppointment = () => {
    if (isDateTimeValid(new Date(followUpDateTime))) {
      const followUpAppointment = {
        doctor: id,
        patientName: followUpPatientName,
        date: new Date(followUpDateTime),
      };
      axios.post('http://localhost:3000/apps/create-upcoming-appointment', followUpAppointment)
        .then((response) => {
          console.log('Follow-up appointment created:', response.data);
          axios.get(`http://localhost:3000/apps/doctor/${id}`)
            .then((response) => {
              if (response.data) {
                const transformedData = response.data.map((item) => ({
                  id: item._id,
                  PatientName: item.patient ? item.patient.fullName : 'Not Assigned Yet',
                  status: item.status,
                  date: new Date(item.date),
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
        })
        .catch((error) => {
          console.error('Error creating follow-up appointment:', error);
        });
    } else {
      console.error('Selected date is before the current date');
    }
  };

  const columns = [
    { field: 'PatientName', headerName: 'Patient Name', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    { field: 'date', headerName: 'Date', width: 200 },
    {
      field: 'action',
      headerName: 'Cancel',
      width: 150,
      renderCell: (params) => {
        
        return (
          <span>
           
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleButtonCancel(params.row.id)}
            >
              Cancel
            </Button>
          </span>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Reschedule',
      width: 150,
      renderCell: (params) => {
        
        return (
          <span>
           
           <Button
  variant="outlined"
  color="primary"
  onClick={() => openModal(params.row.id)}
  disabled={params.row.status === "Available"}
>
  Reschedule
</Button>

          </span>
        );
      },
    },
  ];




  const handleButtonCancel = async (appointmentId) => {

    
        
        try {
          try {
            const response = await axios.get('http://localhost:3000/apps/notifications/cancelled');
            // Process the response as needed
            console.log('Last Appointment:', response.data);
          } catch (error) {
            console.error('Error fetching last appointment:', error);
          }
           // Make an API call here using axios or your preferred library
          const response = await axios.put(`http://localhost:3000/apps/${appointmentId}/cancel`);
          
         if (response.status === 200) {
           console.log('Button clicked and API call successful.');
             // You can update state or perform any other actions here
           } else {
             console.error('API call failed.');
            // Handle error cases here
          }
          
          window.location.reload();
         } catch (error) {
          console.error('Error making API call:', error);
            // Handle error cases here
        }
      };
    
      const handleRescheduleAppointmentt = async (appointmentId) => {
       // window.location.reload();
        if (!dateReschedule) {
          console.error('Please select a reschedule date');
          return;
        }
    
        const formattedDate = format(dateReschedule, 'yyyy-MM-dd');
    
        try {
          
          const response = await axios.put(`http://localhost:3000/apps/${appointmentId}/reschedule`, {
            newDate: formattedDate,
          });
         
          if (response.status === 200) {
            console.log('Reschedule API call successful.');
            // You can update state or perform any other actions here
          } else {
            console.error('API call failed.');
            // Handle error cases here
          }
    
          window.location.reload();
        } catch (error) {
          console.error('Error making API call:', error);
          // Handle error cases here
        }
      };
    
      const sendNotif = async () => {
        try {
          const response = await axios.get('http://localhost:3000/apps/notifications/rescheduled');
          // Process the response as needed
          console.log('Last Appointment:', response.data);
        } catch (error) {
          console.error('Error fetching last appointment:', error);
        }
      };
      
  const handleFilterChange = () => {
    const filteredApps = apps.filter((app) => {
      const statusCondition =
        !appointmentStatus || app.status.toLowerCase() === appointmentStatus.toLowerCase();

      const dateCondition =
        !dateFilterStart || !dateFilterEnd || (app.date >= dateFilterStart && app.date <= dateFilterEnd);

      return statusCondition && dateCondition;
    });

    setFilteredRows(filteredApps);
  };


  const [DoctorProfile, setDoctorProfile] = useState([]);
  const [username, setUsername] = useState();
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
  };

  const isValidPassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
    return regex.test(password);
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
  const handleSubmitt = () => {
    axios
      .put(`http://localhost:3000/doctors/${username}`, formData)
      .then((response) => {
        console.log('Updated doctor:', response.data);
        handleCloseUpdateModal(); // Close the update modal after updating
      })
      .catch((error) => {
        console.error('Error updating doctor:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/doctors/${username}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctor profile:', error);
      });
  }, [username]);

  const handleOpenUpdateModal = () => {
    setUsername(DoctorProfile.username);
    setUpdateModalOpen(true);
    setProfilePopupOpen(false);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
  };
  const handleCloseUpdateModall = () => {
    setProfilePopupOpen(false);
  };
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    hourlyRate: 0,
    affiliation: '',
    educationalBackground: '',
    speciality: '',
    dateOfBirth: '',
  });

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
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
 

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
  const handleProfileClick = () => {
    setProfilePopupOpen(true);
  };

  const handleProfilePopupClose = () => {
    setProfilePopupOpen(false);
  };
  
  useEffect(() => { 
    axios
      .get(`http://localhost:3000/doctors/get/${id}`)
      .then((response) => {
        setDoctorProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching DoctorProfile:', error);
      });
  }, [id]);


  const DataTypography = styled(Typography)({
    color: '#000000',
    marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px'
  });
  
  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
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
                <a className="nav-link pl-0"  onClick={() => navigate(`/doc-home/${id}`)}>
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
                >
                 My Patients
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
                  onClick={() => navigate(`/patientsTable/${id}`)}>
                     Patients List 
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/healthRecs/${id}`)}>
                     Patients Health Record
                     </a>
                     <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/Prescriptions/${id}`)}>
                     Patients Prescriptions
                     </a>
                     <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={() => navigate(`/follow-ups/${id}`)}>
                    Follow-up Requests
                     </a>
                 
                </div>
              </li>
              
              <li className="nav-item " style={{marginRight:"10px"} }>
                <a  className="nav-link pl-0"  onClick={() => navigate(`/appPageDoc/${id}`)}>
                  My Appointments
                </a>
              </li>

              
              {/* Profile dropdown */}
              
    
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"650px"}}
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


    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                   onClick={handleProfileClick}>
      My Profile
    </a>
    <Modal open={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
    <Box
          sx={{
            marginTop: '5%',
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
            <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center', margin:'5px'}}>
              Update Profile Info
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
              label="Full Name"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Hourly Rate"
            variant="outlined"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Affiliation"
            variant="outlined"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Educational Background"
            variant="outlined"
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Speciality"
            variant="outlined"
            name="speciality"
            value={formData.speciality}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <TextField
            fullWidth
            label="Date of birth"
            variant="outlined"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
        </div>
          <div style={{ marginBottom: '1rem',  display: 'flex', justifyContent: 'center'}}>
            <Button  onClick={handleSubmit}>
              Update
            </Button>
          </div>
        </Box> </Box>
      </Modal>

    <Modal
        open={isProfilePopupOpen}
        onClose={handleProfilePopupClose}
        aria-labelledby="profile-popup"
        
      >
        <PopupContainer>
          <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center' }}>
            My Profile
          </Typography>
          <CardContent>
           
            <div>
            <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Full Name:
          </Typography>
              <DataTypography variant="body2"> {DoctorProfile.fullName}</DataTypography>
            </div>
            <div>
            <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
           Username:
          </Typography>
              <DataTypography variant="body2"> {DoctorProfile.username}</DataTypography>
            </div>
            <div>
            <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Email:
          </Typography>
               <DataTypography variant="body2"> {DoctorProfile.email}</DataTypography>  </div>
  <div>
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Date of Birth:
          </Typography>
    <DataTypography variant="body2">
       {DoctorProfile.dateOfBirth}
    </DataTypography>
  </div>
  <div> 
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
           Hourly Rate:
          </Typography>
     <DataTypography variant="body2"> {DoctorProfile.hourlyRate}</DataTypography>  </div>
  <div>  
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Speciality:
          </Typography>
    <DataTypography variant="body2"> {DoctorProfile.speciality}</DataTypography>  </div>
  <div>  
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Educational Background:
          </Typography>
    <DataTypography variant="body2"> {DoctorProfile.educationalBackground}</DataTypography>  </div>
    <div>  
  <Typography variant="h4" component="div" sx={{ color: '#000000' , fontWeight: 'bold',marginBottom: '0.5rem',
    display: 'inline-block',
    marginLeft: '0.5rem',
    fontSize: '20px' }}>
            Affiliation:
          </Typography>
    <DataTypography variant="body2"> {DoctorProfile.affiliation}</DataTypography>  </div>
  
             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            
             <Button onClick={handleOpenUpdateModal}>Update my info</Button>
             <Button onClick={handleCloseUpdateModall}>Cancel</Button>
            </div>
          </CardContent>
        </PopupContainer>
      </Modal>
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
             My Appointments
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                My Appointments <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <>
    

    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px', padding: '10px' }}>
      {/* Left Section */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* New Appointment Box */}
        <Box sx={{ backgroundColor: '#FFFFFF', padding: '12px', border: '2px solid #007bff', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 'bold' }}>New Appointment</h2>

          <TextField
            
            type="datetime-local"
            variant="outlined"
            value={newAppointmentDateTime}
            onChange={(e) => setNewAppointmentDateTime(e.target.value)}
            sx={{ marginTop: '8px', marginBottom: '8px', width: '100%'  }}
          />
          <Button
            variant="contained"
            onClick={handleAddAppointment}
            disabled={!isDateTimeValid(new Date(newAppointmentDateTime))}
            sx={{ marginTop: '8px', width: '100%'  }}
          >
            Add Date
          </Button>
        </Box>

        {/* Booking Follow-up Appointment Box */}
        <Box sx={{ backgroundColor: '#FFFFFF', padding: '12px', border: '2px solid #007bff', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ fontWeight: 'bold' }}>Booking Follow-up Appointment</h2>
          <TextField
            type="datetime-local"
            variant="outlined"
            value={followUpDateTime}
            onChange={(e) => setFollowUpDateTime(e.target.value)}
            sx={{ marginTop: '8px', marginBottom: '8px', width: '100%' }}
          />
          <TextField
            variant="outlined"
            label="Patient Name"
            value={followUpPatientName}
            onChange={(e) => setFollowUpPatientName(e.target.value)}
            sx={{ marginTop: '8px', marginBottom: '8px', width: '100%' }}
          />
          <Button
            variant="contained"
            onClick={handleBookFollowUpAppointment}
            disabled={!isDateTimeValid(new Date(followUpDateTime))}
            sx={{ marginTop: '8px', width: '100%' }}
          >
            Book
          </Button>
        </Box>
      </Box>

      {/* Right Section */}
      <Box sx={{ flex: 1, backgroundColor: '#FFFFFF', padding: '12px' ,border: '2px solid #007bff', borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          {/* Filter Section */}
          <TextField
            type="date"
            variant="outlined"
            value={dateFilterStart ? dateFilterStart.toISOString().split('T')[0] : ''}
            onChange={(e) => setDateFilterStart(new Date(e.target.value))}
          />
          <TextField
            type="date"
            variant="outlined"
            value={dateFilterEnd ? dateFilterEnd.toISOString().split('T')[0] : ''}
            onChange={(e) => setDateFilterEnd(new Date(e.target.value))}
          />
          <TextField
            select
            label="Status"
            value={appointmentStatus}
            onChange={(e) => setAppointmentStatus(e.target.value)}
            variant="outlined"
            sx={{ minWidth: '150px' }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="rescheduled">Rescheduled</MenuItem>
            <MenuItem value="available">Available</MenuItem>
          </TextField>
          <Button variant="contained" onClick={handleFilterChange}>
            Filter
          </Button>
        </Box>

        <Box sx={{ marginTop: '16px' }}>
          {/* DataGrid Section */}
          <DataGrid rows={filteredRows} columns={columns} pageSize={5}  />

        </Box>
      </Box>
    </Box>
  </>

  <Modal
        open={isRescheduelOpen}
        aria-labelledby="resched popup"
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
              Reschedule
            </Typography>
            <Box component="form"  sx={{ mt: 3 }}>
              <h5>Choose a date to reschedule</h5>
          <TextField
    type="date"
    variant="outlined"
    value={dateReschedule ? dateReschedule.toISOString().split('T')[0] : ''}
    onChange={(e) => setDateReschedule(new Date(e.target.value))}
    sx={{ flex: 1, marginLeft: 'auto',paddingTop: '16px'  }}
  />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  handleRescheduleAppointmentt(app);
                  sendNotif();
                }}
              >
                Submit 
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
  </div>
)}