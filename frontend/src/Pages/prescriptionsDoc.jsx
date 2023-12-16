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
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Notif from "./notifdoc";
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

   const [openPrescriptionModal, setOpenPrescriptionModal] = useState(false);
   const [pid, setPatId] = useState(0);
   const [prescriptionData, setPrescriptionData] = useState({
    medicines: [{ medicine: '', dosage: '' }],
  });
  const { id } = useParams(); 
  const [filteredRows, setFilteredRows] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const handleSubmitPres = async () => {
    try {
      console.log(pid);
      const response = await fetch('http://localhost:3000/Prescription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: new Date().toISOString(),
          Patient: pid,
          Doctor: id,
          filled: false,
          medicines: prescriptionData.medicines.map((medicine, index) => ({
            medicine: selectedMedicines[index],
            dosage: dosages[index],
          })),
        }),
      });
  
      // Handle the response accordingly
      const data = await response.json();
      console.log(data);
  
      // Optionally close the modal or perform other actions
      setPrescriptionModalOpen(false);
    } catch (error) {
      console.error('Error creating prescription:', error);
    }
  };
  const disabledButtonStyles = {
    backgroundColor: '#CCCCCC', 
    color: '#666666',
    
  };
  const addToCart = async (prescription) => {
    const patientId = pid.toString();
    const prescriptionId= prescription._id;
    for (const medicineData of prescription.medicines) {
      const medicationId = medicineData.medicine._id;
  
      try {
        const response = await axios.post('http://localhost:3000/Cart/add', {
          patientId,
          medicationId,
          quantity: 1,
        });
  
        console.log('Medication added to cart:', response.data);
      } catch (error) {
        console.error('Error adding medication to cart:', error);
      }
    }
  
    try {
      const response = await fetch(`http://localhost:3000/Prescription/update/${prescriptionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filled: true }), // Set the 'filled' property to true
      });
  
      if (response.ok) {
        const updatedPrescription = await response.json();
        // Handle the updated prescription data if needed
        console.log('Prescription updated:', updatedPrescription);
      } else {
        throw new Error('Failed to update prescription');
      }
    } catch (error) {
      console.error('Error updating prescription:', error.message);
      // Handle errors or display an error message to the user
    }
    window.location.reload();
  };
  
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editedPrescription, setEditedPrescription] = useState(null);
  const [editedMedicines, setEditedMedicines] = useState([]);
  const handleEditClick = (prescriptionId) => {
    const index = patientDocuments.findIndex((document) => document._id === prescriptionId);
    const selectedPrescription = patientDocuments[index];
    setEditedPrescription(selectedPrescription);
    setEditedMedicines(
      selectedPrescription.medicines.map((medicineData) => ({
        medicine: medicineData.medicine._id,
        dosage: medicineData.dosage,
      }))
    );
    setEditModalOpen(true);
  };
  const handleUpdatePrescription = async () => {
    try {
      const response = await fetch(`http://localhost:3000/Prescription/update/${editedPrescription._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: new Date().toISOString(), 
          medicines: editedMedicines.map((medicine, index) => ({
            medicine: medicine.medicine,
            dosage: medicine.dosage,
          })),
        }),
      });
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error('Error updating prescription:', error);
    }
  };
  
      
  const handleMedicineChange = (index, event) => {
    const updatedMedicines = [...selectedMedicines];
    updatedMedicines[index] = event.target.value;
    setSelectedMedicines(updatedMedicines);
  };
  
  const [dosages, setDosages] = useState([]);

const handleDosageChange = (index, event) => {
  const newDosages = [...dosages];
  newDosages[index] = event.target.value;
  setDosages(newDosages);
};

  
  useEffect(() => {
    fetch('http://localhost:3000/meds')
      .then(response => response.json())
      .then(data => setMedicines(data))
      .catch(error => console.error('Error fetching medicines:', error));
  }, []);

const [selectedPrescription, setSelectedPrescription] = useState(null);
const [selectedPrescriptionIndex, setSelectedPrescriptionIndex] = useState(null);

  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const handlePrescriptionChange = (index) => (event) => {
    const { name, value } = event.target;
    const updatedMedicines = [...prescriptionData.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [name]: value };
    setPrescriptionData({ ...prescriptionData, medicines: updatedMedicines });
  };
  const handleAddMedicineRow = () => {
    setPrescriptionData({
      ...prescriptionData,
      medicines: [...prescriptionData.medicines, { medicine: '', dosage: '' }],
    });
  };
  const handleRemoveMedicineRow = (index) => {
    const updatedMedicines = prescriptionData.medicines.filter((_, i) => i !== index);
    setPrescriptionData({ ...prescriptionData, medicines: updatedMedicines });
  };
        
  useEffect(() => {
    axios
      .get(`http://localhost:3000/patients/p/${id}`)
      .then((response) => {
        if (response.data) {
          const transformedData = response.data.map((item) => ({
            id: item._id,
            fullName: item.fullName,

          }));
          setHistories(transformedData);
          setFilteredRows(transformedData);
        } else {
          console.error('No data received from the API');
        }
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, [id]);

  const handleOpenPrescriptionModal = (p) => {
    console.log(p);
    setPatId(p);
    setOpenPrescriptionModal(true);
  };
  
  const handleClosePrescriptionModal = () => {
    setSelectedMedicines([]);
    setDosages([]);
    setOpenPrescriptionModal(false);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const [currentImage, setCurrentImage] = useState(I2);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const navigate = useNavigate();
  const [histories, setHistories] = useState([]);
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

  const handleInputChangeD = (event) => {
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
  const handleDownload = () => {
    // Combine document data into a string
    const fileContent = patientDocuments.map((document) => {
      const medicinesList = document.medicines.map((medicineData) => {
        return `${medicineData.medicine.name} - Dosage: ${medicineData.dosage}`;
      }).join('\n');
  
      return `
  Date: ${document.Date}
  Status: ${document.filled ? 'Filled' : 'Not Filled'}
  Medicines:
  ${medicinesList}
  -----------------------------------------
  `;
    }).join('\n');
  
    // Create a Blob from the content
    const blob = new Blob([fileContent], { type: 'text/plain' });
  
    // Create a link element and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'patient_documents.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const [prescription, setPrescription] = useState();
  const [medicinesList, setMedicinesList] = useState([]);

  useEffect(() => {
    // Fetch medicines from the server when the component mounts
    axios.get('http://localhost:3000/meds')
      .then((response) => {
        setMedicinesList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching medicines:', error);
      });
  }, []);

  const CenteredContainer = styled('div')({
    display: 'finlineblock',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', 
  });
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
};
  
  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };

  const TwoColumnLayout = styled('div')({
    margintop:"auto",
    display: 'flex',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  });
  const handleMedicineChangee = (index, event) => {
    const updatedMedicines = [...editedMedicines];
    updatedMedicines[index] = {
      ...updatedMedicines[index],
      medicine: event.target.value,
    };
    setEditedMedicines(updatedMedicines);
  };
  // Add this function to handle dosage changes
const handleDosageChangee = (index, event) => {
  const updatedMedicines = [...editedMedicines];
  updatedMedicines[index] = {
    ...updatedMedicines[index],
    dosage: event.target.value,
  };
  setEditedMedicines(updatedMedicines);
};

  
  const LeftSide = styled('div')({
     
    marginLeft: 'auto',
    // Add styles for the left side if needed
  });
  
  const RightSide = styled('div')({
   marginRight:"auto",
    marginLeft: 'auto', 

  });
  const buttonStyles = {
    background: 'white',
    color: '#0070F3', 
    border: '1px solid #0070F3', 
    width:'80%'
  };
  const buttonStyless = {
    background: 'white',
    color: '#0070F3', // Blue color
    border: '1px solid #0070F3', // Blue border
    marginLeft:'20%',
    width:'80%'
  };
  const BlueDataGrid = styled(DataGrid)(({ theme }) => ({
   fontSize:"18px",
    border: '2px solid #0070F3', 

  }));
  const handleAddMedicineRoww = () => {
    setEditedMedicines((prevMedicines) => [
      ...prevMedicines,
      { medicine: '', dosage: '' },
    ]);
  };
  
  const handleRemoveMedicineRoww = (index) => {
    setEditedMedicines((prevMedicines) =>
      prevMedicines.filter((_, i) => i !== index)
    );
  };
  
  const columns = [
    { field: 'patientName', headerName: 'Patient Name', width: 300 },
    {
      field: 'addNotes',
      headerName: 'Actions',
      width: 800,
      renderCell: (params) => (
        <div>
         <Button
  style={buttonStyles}
  variant="contained"
  color="primary"
  onClick={() => {
   
    handleOpenPrescriptionModal(params.row.id)
  }}
  
>
  Write Prescription
</Button>
          <Button
            style={buttonStyless}
            variant="contained"
            color="primary"
            onClick={() => handleViewDocuments(params.row.id)} 
          >
            View Prescriptions
          </Button>
        </div>
      ),
    },

  ];

  const rows = histories.map((history) => ({
    id: history.id,
    patientName: history.fullName ,
  }));

  const handleViewDocuments = async (patientId) => {
    try {
      setPatId(patientId);
      const response = await axios.get(`http://localhost:3000/Prescription/pat/${patientId}`);
      const patientPrescriptions = response.data;
      setPatientDocuments(patientPrescriptions || []);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
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
            My Patients' Prescriptions
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
    <section >
 
  <section style={{width:'98.5%', marginTop:'2%',  marginLeft:'1%'}}>
    <BlueDataGrid rows={rows} columns={columns} pageSize={5} />
  </section>
  <RightSide>
  <div className="d-flex flex-wrap">
    {patientDocuments.map((document) => (
      <div key={document._id} style={{ borderRadius: '8px', margin: '8px', flex: '1 0 30%', position: 'relative' }}>
       {/* Edit Icon */}
    
        <div className="pricing-entry pb-5 text-center" style={{ borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <IconButton 
      color="primary" 
      onClick={() => handleEditClick(document._id)}
      style={{ position: 'absolute', top: '8px', right: '8px' }}
    >
      <EditIcon />
    </IconButton>
          <div>
            <h3 className="mb-4">Date:</h3>
            <p className="mb-4">{document.Date}</p>
            <h3 className="mb-4">Status:</h3>
            <p className="mb-4">{document.filled ? 'Filled' : 'Not Filled'}</p>
            <h3 className="mb-4">Medicines:</h3>
            <ul>
              {document.medicines.map((medicineData) => (
                <li key={medicineData.medicine._id}>
                  {medicineData.medicine.name} - Dosage: {medicineData.dosage}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <Button
              style={buttonStyles}
              variant="contained"
              color="primary"
              onClick={() => handleDownload(document._id)}
            >
              Download Prescription
            </Button>
            <Button
  style={document.filled === true ? disabledButtonStyles : buttonStyles}
  variant="contained"
  color="primary"
  onClick={() => addToCart(document)}
  disabled={document.filled === true}
>
  Add Prescription to Patient's Cart
</Button>
          </div>
        </div>
      </div>
    ))}
  </div>
</RightSide>



</section>
    
{/* Prescription modal */}
<Modal open={openPrescriptionModal} onClose={handleClosePrescriptionModal}>
  <div style={modalStyle}>
    <h2 id="modal-modal-title" style={{ textAlign: 'center', fontWeight: 'bold', color: '#0070F3' }}>
      New Prescription
    </h2>
    <form>

    {prescriptionData.medicines.map((medicine, index) => (
  <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
   <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
  <TextField
    select
    label="Select Medicine"
    id="medicine"
    name="medicine"
    value={selectedMedicines[index]}
    style={{ minWidth: '300px' }}
    onChange={(event) => handleMedicineChange(index, event)}
    fullWidth
  >
    <MenuItem value="" disabled>Select a medicine</MenuItem>
    {medicines.map((medicine) => (
      <MenuItem key={medicine._id} value={medicine._id}>
        {medicine.name}
      </MenuItem>
    ))}
  </TextField>
</div>

    <TextField
      label="Dosage"
      type="text"
      name="dosage"
      value={dosages[index]}
      onChange={(event) => handleDosageChange(index, event)}
    />
    <IconButton
      color="primary"
      onClick={() => handleRemoveMedicineRow(index)}
    >
      <DeleteIcon />
    </IconButton>
  </div>
))}

      <Button color="primary" onClick={handleAddMedicineRow}>
        + Add Medicine
      </Button>
      <div></div>
      <Button
        style={{
          background: 'white',
          color: '#0070F3',
          border: '2px solid #0070F3',
          marginTop: '10px',
        }}
        variant="contained"
        onClick={handleSubmitPres}
      >
        Add Prescription
      </Button>
      <Button
        style={{
          background: 'white',
          color: '#0070F3',
          border: '2px solid #0070F3',
          marginTop: '10px',
          marginLeft: '10px',
        }}
        variant="contained"
        color="secondary"
        onClick={handleClosePrescriptionModal}
      >
        Close
      </Button>
    </form>
  </div>
</Modal>
{isEditModalOpen && (
  <Modal
    open={isEditModalOpen}
    onClose={() => setEditModalOpen(false)}
    aria-labelledby="edit-prescription-modal"
    aria-describedby="edit-prescription-description"
  >
    <PageContainer style={modalStyle}>
      <h2 id="modal-modal-title" style={{ textAlign: 'center', fontWeight: 'bold', color: '#0070F3' }}>
        Update Prescription
      </h2>
      <form onSubmit={handleUpdatePrescription}>
  <div>
    <h3>Date:</h3>
    <p>{editedPrescription?.Date}</p>
  </div>
  <div>
    <h3>Status:</h3>
    <p>{editedPrescription?.filled ? 'Filled' : 'Not Filled'}</p>
  </div>
  <div>
    <h3>Medicines:</h3>
    
    {editedMedicines.map((medicine, index) => (
  <div key={index} style={{ display: 'flex', marginBottom: '8px' }}>
    <TextField
      select
      label={`Medicine ${index + 1}`}
      value={medicine.medicine}
      onChange={(e) => handleMedicineChangee(index, e)}
      variant="outlined"
      fullWidth
      style={{ marginRight: '8px' }}
    >
      {medicinesList.map((med) => (
        <MenuItem key={med._id} value={med._id}>
          {med.name}
        </MenuItem>
      ))}
    </TextField>
    <TextField
      label="Dosage"
      type="text"
      value={medicine.dosage}
      onChange={(e) => handleDosageChangee(index, e)}
      variant="outlined"
      fullWidth
      style={{ marginRight: '8px' }}
    />
    <IconButton
      color="primary"
      onClick={() => handleRemoveMedicineRoww(index)}
    >
      <DeleteIcon />
    </IconButton>
   

  </div>
))}
  </div>
  <Button
    color="primary"
    onClick={handleAddMedicineRoww}
  >
    + Add Medicine
  </Button>
  
</form>
<Button
     style={{
      background: 'white',
      color: '#0070F3',
      border: '2px solid #0070F3',
      marginTop: '10px',
    }}
    variant="contained"
    color="primary"
    type="submit"
    onClick={handleUpdatePrescription}
  >
    Update Prescription
  </Button>
  <Button
        style={{
          background: 'white',
          color: '#0070F3',
          border: '2px solid #0070F3',
          marginTop: '10px',
          marginLeft: '10px',
        }}
        variant="contained"
        color="secondary"
        onClick={handleEditModalClose}
      >
        Close
      </Button>
    </PageContainer>
  </Modal>
)}

    </div>
  );
}

export default MedHistory;
