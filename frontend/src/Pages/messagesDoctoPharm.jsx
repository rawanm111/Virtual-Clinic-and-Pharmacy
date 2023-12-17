import io from "socket.io-client";
import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { set } from "mongoose";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {Container,Grid} from '@mui/material';
import { useRef } from 'react';
import I2 from "../images/bg_1.jpg";
import I3 from "../images/bg_2.jpg";
import { FaUser, FaWallet } from 'react-icons/fa';
import WalletModal from './walletModal';
import { useNavigate } from 'react-router-dom';
import { FaMessage } from "react-icons/fa6";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CardContent } from '@mui/material';
import Notif from "./notifdoc";

const socket = io.connect("http://localhost:3002");

function Messages() {
    const [chatId, setChatId] = useState('');
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const { id } = useParams(); 
    const [doctorsList, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const chatContainerRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(I2);
    const [DoctorProfile, setDoctorProfile] = useState([]);
    const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    
    const handleProfileClick = () => {
      setProfilePopupOpen(true);
    };
    const handleCloseProfilePopup = () => {
      setProfilePopupOpen(false);
    };
    const handleOpenUpdateModal = () => {
      setUpdateModalOpen(true);
    };
    const handleCloseUpdateModal = () => {
      setUpdateModalOpen(false);
    };
    const [username, setUsername] = useState();
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
    
    const handleCloseUpdateModall = () => {
      setUpdateModalOpen(false);
    };
    const handleProfilePopupClose = () => {
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
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const DataTypography = (props) => (
      <Typography variant="body2" color="text.secondary" style={{ fontSize: '14px' }}>
        {props.children}
      </Typography>
    );
    const PopupContainer = (props) => (
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
          {props.children}
        </Box>
      </Box>
    );
    const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
    const [showPatientsDropdown, setShowPatientsDropdown] = useState(false);
    




    const [showDoctorsDropdown, setShowDoctorsDropdown] = useState(false);
    const [showHealthPackagesDropdown, setShowHealthPackagesDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showPersonalDropdown, setShowPersonalDropdown] = useState(false);

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

  const toggleImage = () => {
    setCurrentImage((prevImage) => (prevImage === I2 ? I3 : I2));
  };
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Log receiver on change
    console.log(receiver);
  }, [receiver]);

  const createMessage = async () => {
    try {
      const messageData = {
        participantDoc:id, 
        sender:id,
        // receiver:id,
        text, 
        broadcast: false,
        subject: 'Inquiry', 
      };
      console.log(messageData,"messageData");

      await axios.post(`http://localhost:3000/api/messagesPharmDoc/${id}`, messageData);
      getMessages();
    } catch (error) {
      console.error('Error creating message:', error.response ? error.response.data : error.message);
    }
  };
  

  const getMessages = async () => {
    console.log(receiver, "receiver");
    try {
      const response = await axios.get(`http://localhost:3000/api/messagesPharmDoc/${id}`, {
        params: {
          participantDoc: id,
        },
      });
      console.log("re hjggu hetree", response.data);
      const dataRes = response.data;
  
      setMessages(dataRes.aggregatedMessages);
  
      console.log(messages, 'messages');
    } catch (error) {
      console.error('Error fetching messages:', error.response ? error.response.data : error.message);
    }
  };
  
  
  
  

  const getAllDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pharmacists`);
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error.response ? error.response.data : error.message);
    }
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setReceiver(doctor._id);
    setSender(id);
    setDoctorId(doctor._id);
    getMessages();
  };

  // Fetch doctors on component mount
  useEffect(() => {
    getAllDoctors();
  }, []);


  
    const ChatMessage = ({ message, isDoctor }) => (
      <div
        style={{
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '8px',
          maxWidth: '70%',
          backgroundColor: isDoctor ? '#e0f7fa' : '#e3f2fd',
          marginLeft: isDoctor ? 'auto' : 'unset',
          marginRight: isDoctor ? 'unset' : 'auto',
          
        }}
      >
        
        <p style={{ margin: 0, fontSize: '14px' }}>{message.text}</p>
      </div>
    );
    
    
    return (
      
      <div>
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
  className="nav-item dropdown active "
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

  <Grid container spacing={2} style={{ height: '80vh',backgroundColor:"" }}>
  {/* Doctor List Column */}
  <Grid item xs={4} style={{ height: '100vh', backgroundColor: "rgb(225,234,246)", marginTop: "1rem" }}>
  {/* {doctorsList.map((doctor) => ( */}
    <Link key="" style={{ textDecoration: 'none' }}>
      <ListItem
        alignItems="flex-start"
        button
       
      >
        <ListItemAvatar>
          <Avatar alt="Customer Service" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText primary="Customer Service" style={{ color: "" }} />
      </ListItem>
    </Link>
   {/* ))}  */}
</Grid>

  {/* Chat Container Column */}
  <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column', height: '85vh' }}>
    {/* Render your chat component based on the selectedDoctor state */}
    {/* {selectedDoctor && ( */}
          <div ref={chatContainerRef} style={{ flex: '1', overflowY: 'auto', padding: '10px' }}>
          {/* <h1>{selectedDoctor.fullName}</h1> */}

        {/* Add your chat component here */}
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, overflowY: 'auto', flex: '1' ,
        backgroundImage: "grey",

      }}
      >
          {messages.map((message) => (
            <li key={message._id}>
              <ChatMessage message={message} isDoctor={message.sender === id} />
            </li>
          ))}
        </ul>
      </div>
    {/* )}  */}


    {/* Text Input at the Bottom */}
    {/* {selectedDoctor && ( */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
      <label style={{ flex: '1', marginRight: '10px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px',
          }}
        />
      </label>
      <button
        onClick={createMessage}
        style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Send
      </button>
    </div>
    {/* )} */}

    {/* {!selectedDoctor && (
      <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ textAlign: 'center' }}>Select a doctor to chat with</p>
      </div>
    )} */}


  

  </Grid>
</Grid>


    
      </div>

      
    );
  }
  

export default Messages;