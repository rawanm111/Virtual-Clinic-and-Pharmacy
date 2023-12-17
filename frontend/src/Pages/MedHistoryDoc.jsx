import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/system';
import axios from 'axios';
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
import Notif from "./notifdoc";
import { FaMessage} from 'react-icons/fa6';
const PageContainer = styled('div')({
  backgroundColor: 'white',
  padding: '16px',
});
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  border: '2px solid #0070F3',
  borderRadius: '10px',
  boxShadow: 24,
  padding: '16px',
  overflow: 'auto',
};

function MedHistory() {
  const { id } = useParams(); // This is the doctor's ID, not the patient's ID
  const [currentImage, setCurrentImage] = useState(I2);
  const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
  const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
  const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [healthPackages, setHealthPackages] = useState([]);
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);
  const [histories, setHistories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [fileData, setFileData] = useState('');
  const [currentHistoryId, setCurrentHistoryId] = useState(null);
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
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
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
  const handleProfileClick = () => {
    setProfilePopupOpen(true);
  };

  const handleProfilePopupClose = () => {
    setProfilePopupOpen(false);
  };
  


  useEffect(() => {
    const intervalId = setInterval(toggleImage, 2000);
    return () => clearInterval(intervalId);
  }, []);
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
  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const base64toBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const handleDownloadFile = (documentName, contentType, data) => {
    const blobData = base64toBlob(data, contentType);
    const blobUrl = URL.createObjectURL(blobData);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = documentName;
    a.click();
  };

  const fetchMedicalHistories = () => {
    console.log('Fetching doctor appointments...');
    axios
      .get(`http://localhost:3000/apps/doctor/${id}`)
      .then((response) => {
        console.log('Doctor appointments response:', response.data);

        if (!Array.isArray(response.data)) {
          console.error('Invalid response format. Expected an array.');
          return;
        }

        const doctorAppointments = response.data;

        // Ensure that patient property is present and not undefined
        const validAppointments = doctorAppointments.filter(appointment => appointment.patient && appointment.patient._id);

        // Use a Set to track unique patient IDs
        const uniquePatientIds = new Set(validAppointments.map(appointment => appointment.patient._id));

        // Fetch medical histories for the unique patient IDs
        const requests = Array.from(uniquePatientIds).map((patientId) =>
          axios.get(`http://localhost:3000/medHistory/patient/${patientId}`)
        );

        axios.all(requests)
          .then(axios.spread((...responses) => {
            const allHistories = responses.reduce((acc, response, index) => {
              const history = response.data[0];
              const currentPatientId = Array.from(uniquePatientIds)[index];
              const patientName = validAppointments.find(appointment => appointment.patient._id === currentPatientId).patient.fullName;
              if (history) {
                acc.push({ ...history, patientName });
              }
              return acc;
            }, []);

            setHistories(allHistories);
          }))
          .catch((error) => {
            console.error('Error fetching medical histories:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching doctor appointments:', error);
      });
  };

  const handleAddNotes = async (historyId, notes) => {
    try {
      const response = await axios.post(`http://localhost:3000/medHistory/doctorNotes/${historyId}`, { doctorNotes: notes });
      const updatedHistories = histories.map(history =>
        history._id === historyId ? { ...history, doctorNotes: response.data.doctorNotes } : history
      );
      setHistories(updatedHistories);
    } catch (error) {
      console.error('Error adding notes:', error);
    }
  };

  useEffect(() => {
    fetchMedicalHistories();
  }, [id]);

  const TwoColumnLayout = styled('div')({
    margintop:"auto",
    display: 'flex',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  });
  
  const LeftSide = styled('div')({
     
    marginLeft: 'auto',
    // Add styles for the left side if needed
  });
  
  const RightSide = styled('div')({
   marginRight:"auto",
    marginLeft: 'auto', // This will move the content to the right
  padding: '16px',
   
    // Add styles for the right side if needed
  });
  const buttonStyles = {
    background: 'white',
    color: '#0070F3', // Blue color
    border: '1px solid #0070F3', // Blue border
  };
  const BlueDataGrid = styled(DataGrid)(({ theme }) => ({
   fontSize:"18px",
    border: '2px solid #0070F3', // Blue border
    // Shadow
    
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'patientName', headerName: 'Patient Name', width: 200 },
    { field: 'doctorNotes', headerName: 'Doctor Notes', width: 200 },
    {
      field: 'addNotes',
      headerName: 'Add Notes',
      width: 200,
      renderCell: (params) => (
        <Button
        style={buttonStyles}
          variant="contained"
          color="primary"
          onClick={() => {
            setCurrentHistoryId(params.row.id);
            setOpenModal(true);
          }}
        >
          Add Notes
        </Button>
      ),
    },
    {
      field: 'viewDocuments',
      headerName: 'View Documents',
      width: 200,
      renderCell: (params) => (
        <Button
        style={buttonStyles}
          variant="contained"
          color="primary"
          onClick={() => handleViewDocuments(params.row.id)}
        >
          View Documents
        </Button>
      ),
    },
    // ... Add more columns as needed
  ];

  const rows = histories.map((history) => ({
    id: history._id,
    patientName: history.patientName || 'Unknown Patient',
    doctorNotes: history.doctorNotes || '',
    // ... Add more fields as needed
  }));

  const handleViewDocuments = (historyId) => {
    // Handle the logic to fetch and set patient documents based on historyId
    const selectedHistory = histories.find((history) => history._id === historyId);
    // Set the documents for the right side
    setPatientDocuments(selectedHistory.documents || []);
  };

  const [patientDocuments, setPatientDocuments] = useState([]);

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
  style={{marginLeft:"570px"}}
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
            <Button  onClick={handleSubmitt}>
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

<li 
  className="nav-item dropdown "
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
    onClick={() => navigate(`/messagesDoctoPat/${id}`)}
  >
    Chat with Patient
  </a>
  <a
    className="dropdown-item" style={{cursor:"pointer" } } 
    onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
    onMouseLeave={(e) => e.target.style.backgroundColor = ''}
    onClick={() => navigate(`/messagesDoctoPharm/${id}`)}
  >
    Chat with Pharmacist
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
            My Patients' Health Records
            </h1>
            <p className="breadcrumbs">
              <span className="mr-2" style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
              My Patients <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
     
    <TwoColumnLayout>
        <LeftSide>
          <PageContainer>
            {/* Use Material-UI DataGrid for the left side */}
            <BlueDataGrid rows={rows} columns={columns} pageSize={5} />
          </PageContainer>
        </LeftSide>

        <RightSide>
 
    {patientDocuments.map((document) => (
      <div className="col-md-4" key={document._id}  style={{ borderRadius: '8px', display: 'flex'}}>
        <div className="pricing-entry pb-5 text-center" style={{ borderRadius: '8px', display: 'flex'}}>
          <div style={{ flex: '1' }}>
            <h3 className="mb-4" style={{ display: 'flex' }}>
              {document.filename}
            </h3>
            <div style={{ flex: '1', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Button
              style={buttonStyles}
              variant="contained"
              color="primary"
              onClick={() => {
                handleDownloadFile(document.filename, document.contentType, document.data);
              }}
            >
              Download Document
            </Button>
          </div>
          </div>
          
        </div>
      </div>
    ))}
 
</RightSide>
      </TwoColumnLayout>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
  <div style={modalStyle}>
    <h2 id="modal-modal-title"style={{ textAlign: 'center', fontWeight: 'bold', color: '#0070F3' }}>Add Doctor Notes</h2>
    <textarea
      rows="4"
      cols="50"
      placeholder="Enter doctor notes..."
      onChange={(e) => setFileData(e.target.value)}
      style={{ marginBottom: '10px' }} // Add margin bottom for spacing
    />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Button
        style={{
          background: 'white',
          color: '#0070F3', // Blue text
          border: '2px solid #0070F3', // Blue border
          marginBottom: '10px', // Adjust the spacing as needed
        }}
        variant="contained"
        onClick={() => {
          handleAddNotes(currentHistoryId, fileData);
          setOpenModal(false);
        }}
      >
        Save Notes
      </Button>
      <Button
        style={{
          background: 'white',
          color: '#0070F3', // Blue text
          border: '2px solid #0070F3', // Blue border
        }}
        variant="contained"
        color="secondary"
        onClick={() => setOpenModal(false)}
      >
        Close
      </Button>
    </div>
  </div>
</Modal>
    </div>
  );
}

export default MedHistory;