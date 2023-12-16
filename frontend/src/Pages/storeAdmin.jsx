
import React, { useEffect, useState } from 'react';
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
import InputBase from '@mui/material/InputBase';
import { TextField, Button, Container, Typography, Box ,Modal,  Backdrop,
  Fade,} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { stopPropagation } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


export default function StoreView() {
  const [medicationData, setMedicationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicalUse, setSelectedMedicalUse] = useState('All');
  const [uniqueMedicalUses, setUniqueMedicalUses] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);
  const [currentImage, setCurrentImage] = useState(I2);
  const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
const [passwords, setPasswords] = useState({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});
const handleSaveChanges = async (medicationId) => {
  if (!editData || !editData.field || !editData.value) {
    console.error('Invalid editData:', editData);
    return;
  }

  console.log('Before API call:', { medicationId, editData, medicationData });

  try {
    if (editData.field === 'description') {
      await axios.put(`http://localhost:3000/meds/updateDescription/${medicationId}`, { description: editData.value });
    } else if (editData.field === 'price') {
      await axios.put(`http://localhost:3000/meds/updatePrice/${medicationId}`, { price: editData.value });
    } else{
      await axios.put(`http://localhost:3000/meds/updatePicture/${medicationId}`, { picture: editData.value });
    }

    console.log('API call successful');

      handleCloseModal();
      
  } catch (error) {
    console.error('Error updating medication:', error);
  }
};


const [selectedImageRow, setSelectedImageRow] = useState(null);
const [imageUrl, setImageUrl] = useState('');
useEffect(() => {
  const queryParameters = {
    medicalUse: selectedMedicalUse,
  };
  
  const fetchMedicationData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/meds/', {
        params: queryParameters,
      });
      const responseData = response.data;

      const rowsWithIds = responseData.map((row) => ({
        ...row,
        id: row._id,
        isEditingDescription: false,
        isEditingPrice: false,
      }));

     
const filteredRows = medicationData.filter((row) =>
row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
(selectedMedicalUse === 'All' || row.medicalUse === selectedMedicalUse)
);

      setMedicationData(filteredRows);

      const uniqueUses = [...new Set(rowsWithIds.map((item) => item.medicalUse))];
      setUniqueMedicalUses(uniqueUses);
    } catch (error) {
      console.error('Error fetching medication data:', error);
    }
  };

  fetchMedicationData();
}, [selectedMedicalUse, searchQuery]);

const filteredRows = medicationData.filter((row) =>
row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
(selectedMedicalUse === 'All' || row.medicalUse === selectedMedicalUse)
);

const [success, setSuccess] = useState(false); 
const handleChange = (prop) => (event) => {
  setPasswords({ ...passwords, [prop]: event.target.value });
  setSuccess(false); 
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

const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{4,}$/;
  return regex.test(password);
};
const handleCloseChangePassword = () => {
  setChangePasswordOpen(false);
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

  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };
  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
  };

  useEffect(() => {
    const intervalId = setInterval(toggleImage, 2000);
    return () => clearInterval(intervalId);
  }, []);
 


  const [packageType, setPackageType] = useState('');

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    window.location.reload();
    setOpenModal(false);
  };


  const handleImagePopupClose = () => {
    setSelectedImageRow(null);
    setImageUrl('');
  };
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    sales: '',
    availableQuantity: 0,
    medicalUse: '',
    picture: '',
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitt = () => {
    setOpen(false);
  
    // Reload the page
    window.location.reload();
  
    axios
      .post('http://localhost:3000/meds/', formData)
      .then((response) => {
        console.log('Response:', response.data);
        // Close the modal
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (url) => {
    try {
      const updatedData = [...medicationData];
      const index = updatedData.findIndex((item) => item.id === selectedImageRow.id);
      updatedData[index].picture = url;

      await axios.put(`http://localhost:3000/meds/updatePicture/${selectedImageRow.id}`, { picture: url });

      setMedicationData(updatedData);
      handleImagePopupClose();
    } catch (error) {
      console.error('Error updating picture:', error);
    }
  };
  const [editData, setEditData] = useState({
    id: null,
    field: '',
    value: '',
  });

  const handleSaveDescription = async (row) => {
    try {
      const updatedData = [...medicationData];
      const index = updatedData.findIndex((item) => item.id === row.id);
      updatedData[index].isEditingDescription = false;

      await axios.put(`http://localhost:3000/meds/updateDescription/${row.id}`, { description: row.description });

      setMedicationData(updatedData);
    } catch (error) {
      console.error('Error updating description:', error);
    }
  };

  const handleSavePrice = async (row) => {
    try {
      const updatedData = [...medicationData];
      const index = updatedData.findIndex((item) => item.id === row.id);
      updatedData[index].isEditingPrice = false;

      await axios.put(`http://localhost:3000/meds/updatePrice/${row.id}`, { price: row.price });

      setMedicationData(updatedData);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };
  const handleEditClick = (medication, field, value) => {
    const id= medication._id;
    console.log(value);
    setEditData({ id, field, value });
    handleOpenModal();
  };

  const Medications = ({ medications }) => {

  
    return (
      <div className="site-section bg-light">
        <div className="container">
          <div className="row d-flex align-items-stretch">
            {medications.map((medication, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="pricing-entry pb-5 text-center" style={{ borderRadius: '8px', height: '100%' }}>
                  {medication.discountedPrice && <span className="onsale">Sale</span>}
                  <a style={{ display: 'block', height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={medication.picture}
                      alt="Image"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                   
                  </a>
                  <p style={{ height: '50px' }}>
                    <span className="price">
                      {medication.name}
                    </span>
                  </p>
                  <h3 className="text-dark" style={{ height: '50px' }}>
                      <a>Description:</a>
                     
                    </h3>
                    <p>
                      {medication.description}
                    
                    </p>
                
                    <h3 className="text-dark" style={{ height: '50px' }}>
                    <a>Price</a>
                   
                  </h3>
                  <p>
                    {medication.discountedPrice ? (
                      <>
                        <span> $<del>{medication.price}</del> — {medication.discountedPrice}</span>
                      </>
                    ) : (
                      <>
                        <span>${medication.price}</span>
                      </>
                    )}
                 
                  </p>
                  <p style={{ height: '30px' }}>
                    <h3 className="text-dark" style={{ height: '50px' }}>
                      <a>Available Quantity:</a>
                    </h3>
                  </p>
                  <p>{medication.availableQuantity}</p>
  
                  <h3 className="text-dark" style={{ height: '50px' }}>
                    <a>Sales:</a>
                  </h3>
  
                  <p>{medication.sales}</p>
  
                  <p className="button text-center">{/* Add any additional buttons or actions here */}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>


    );
  };
  
  
  
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  useEffect(() => {
    const queryParameters = {
      medicalUse: selectedMedicalUse,
    };
  
    const fetchMedicationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/meds/', {
          params: queryParameters,
        });
        const responseData = response.data;
  
        const rowsWithIds = responseData.map((row) => ({
          ...row,
          id: row._id,
          isEditingDescription: false,
          isEditingPrice: false,
        }));
  
        const filteredRows = rowsWithIds.filter((row) =>
          (row.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === '') &&
          (selectedMedicalUse === 'All' || row.medicalUse === selectedMedicalUse)
        );
  
        setMedicationData(filteredRows);
  
        const uniqueUses = [...new Set(rowsWithIds.map((item) => item.medicalUse))];
        setUniqueMedicalUses(uniqueUses);
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    };
  
    fetchMedicationData();
  }, [selectedMedicalUse, searchQuery]);
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
                className="nav-item dropdown"
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
              <li className="nav-item active" style={{marginRight:"10px"} }>
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
                //   onClick={() => navigate(`/changepassTwo/${id}`)}
                  >
      Change Password
    </a>
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
              Store Medications
            </h1>
            <p className="breadcrumbs">
              <span style={{ fontSize: '14px', color: '#fff' }}>
                <a >
                  Home <i className="ion-ios-arrow-forward" />
                </a>
              </span>{' '}
              <span style={{ fontSize: '14px', color: '#fff' }}>
                Store <i className="ion-ios-arrow-forward" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px', marginLeft: '120px', width: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '42%' }}>
      <InputBase
        style={{
          flex: 1,
          padding: '8px',
          marginRight: '10px',
          border: '1px solid #ced4da',
          borderRadius: '4px',
          height: '40px', // Set a specific height for the input
        }}
        type="text"
        placeholder="Search Medications"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
    
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormControl style={{ marginRight: '10px', height: '40px' }}> 
          <InputLabel id="medical-use-label">Medical Use</InputLabel>
          <Select
            labelId="medical-use-label"
            id="medical-use-select"
            value={selectedMedicalUse}
            onChange={(e) => setSelectedMedicalUse(e.target.value)}
            style={{ width: '150px', height: '100%' }}
            variant="outlined"
          >
            <MenuItem value="All">All</MenuItem>
            {uniqueMedicalUses.map((use, index) => (
              <MenuItem key={index} value={use}>
                {use}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
      </div>
    </div>
    </div>
    <Medications medications={filteredRows} />
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
       {/* Image Popup */}
       {selectedImageRow && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '600px', textAlign: 'center' }}>
            <p>Enter new image URL:</p>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <Button variant="contained" color="primary" onClick={() => handleImageUpload(imageUrl)}>Save</Button>
            <Button variant="outlined" color="primary" onClick={handleImagePopupClose}>Cancel</Button>
          </div>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
          <Box
            style={{
              minHeight: '50vh',
              width: '50%',
              margin: 'auto',
              marginTop: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
          >
            <Container
              maxWidth="sm"
              style={{
                padding: '2rem',
                backgroundColor: 'rgba(255, 255, 255, 255)',
               
              }}
            >
                <Typography variant="h4" component="div" sx={{ color: '#007bff' , fontWeight: 'bold', textAlign: 'center', margin:'5px'}}>
              Add Medication Product
            </Typography>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Price"
                  variant="outlined"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Sale"
                  variant="outlined"
                  type="number"
                  name="sales"
                  value={formData.sales}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Available Quantity"
                  variant="outlined"
                  type="number"
                  name="availableQuantity"
                  value={formData.availableQuantity}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Medical Use"
                  variant="outlined"
                  type="String"
                  name="medicalUse"
                  value={formData.medicalUse}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <TextField
                  fullWidth
                  label="Picture"
                  variant="outlined"
                  type="String"
                  name="picture"
                  value={formData.picture}
                  onChange={handleInputChange}
                />
              </div>
              <Button  onClick={handleSubmitt}>
                Create Medication
              </Button>
            </Container>
          </Box>
        
      </Modal>
      <Modal
  open={openModal}
  onClose={handleCloseModal}
  closeAfterTransition
>
  {/* Your modal content here */}
  <Box
    style={{
      minHeight: '50vh',
      width: '50%',
      margin: 'auto',
      marginTop: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Container
      maxWidth="sm"
      style={{
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 255)',
      }}
    >
      <Typography variant="h4" component="div" sx={{ color: '#007bff', fontWeight: 'bold', textAlign: 'center', margin: '5px' }}>
        Edit {editData.field}
      </Typography>
      <div style={{ marginBottom: '1rem' }}>
        <TextField
          fullWidth
          label={editData.field}
          variant="outlined"
          name={editData.field.toLowerCase()} // Assuming the field name is unique
          value={editData.value}
          onChange={(e) => setEditData({ ...editData, value: e.target.value })}
        />
      </div>
      <Button onClick={() => { handleSaveChanges(editData.id)}}>Submit</Button>

    </Container>
  </Box>
</Modal>

  </div>
)};