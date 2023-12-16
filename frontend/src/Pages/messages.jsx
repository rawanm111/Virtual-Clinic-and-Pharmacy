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
import { FaMessage } from 'react-icons/fa6';
import CallIcon from '@mui/icons-material/Call';
import IconButton from '@mui/material/IconButton';

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

    const createMessage = async () => {
      setSender(id);
      console.log(id,"id");

      try {
        await axios.post(`http://localhost:3000/api/messages/${id}`, {
          
          sender,
          receiver,
          text,
        });
        console.log(id,"id");
        console.log(selectedDoctor,"selectedDoctor");
        setText('');
        getMessages();
      } catch (error) {
        console.error('Error creating message:', error.response ? error.response.data : error.message);
      }
    };

    //print receiver on change
    useEffect(() => {
      console.log(receiver);
    }, [receiver]); 
  

    const getMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/messages/${id}/${receiver}`);

        console.log(response.data);
        const dataRes = response.data;
        console.log(dataRes.chat.aggregatedMessages,"dataRes");
        setMessages(dataRes.chat.aggregatedMessages);
        console.log(messages,"messages");
      } catch (error) {
        console.error('Error fetching messages:', error.response ? error.response.data : error.message);
      }
    };
  
    const updateMessages = async () => {
      try {
        await axios.put(`http://localhost:3000/api/messages/${id}`, {
          sender,
          receiver,
          text,
        });
        getMessages();
      } catch (error) {
        console.error('Error updating messages:', error.response ? error.response.data : error.message);
      }
    };
  
    const getAllDoctors = async () => {
      
      try {
        const response = await axios.get(`http://localhost:3000/doctors`);
        console.log();
    
       
        setDoctors(response.data);
        console.log(doctorsList,"doctorsList");

    
      } catch (error) {
        console.error('Error fetching doctors:', error.response ? error.response.data : error.message);
      }
    }
    
    useEffect(() => {
      getAllDoctors();
    }, []);




    
      const handleDoctorClick = (doctor) => {
        
        setSelectedDoctor(doctor);
        setReceiver(doctor._id);
        setSender(id);
        setDoctorId(doctor._id);
        getMessages();
        console.log(doctor._id,"doctojjr heehe");
      };

  
    const ChatMessage = ({ message, isDoctor }) => (
      <div
        style={{
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '8px',
          maxWidth: '70%',
          backgroundColor: isDoctor ? '#e0f7fa' : '#e3f2fd',
          marginLeft: isDoctor ? 'unset' : 'auto',
          marginRight: isDoctor ? 'auto' : 'unset',
          
        }}
      >
        {isDoctor && (
          <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{selectedDoctor.fullName}</p>
        )}
       <p
      style={{ margin: '0', wordBreak: 'break-all' }}
      dangerouslySetInnerHTML={{ __html: message.text }}
    />
      </div>
    );
    const [shouldSendMessage, setShouldSendMessage] = useState(false);
    const handleCallClick = (doctor) => {
      // Open video call link for yourself
      const videoCallLink = `http://localhost:3001/Vid/${id}?roomID=zooni`;
      window.open(videoCallLink, '_blank');
    
      // Send personal link in the chat
      const personalLinkMessage = `Hey, let's connect! Click <a href="${videoCallLink}" target="_blank">here</a> for a video call.`;

    
      
      setText(personalLinkMessage);
      setShouldSendMessage(true);
      
    };
    useEffect(() => {
      if (shouldSendMessage) {
        createMessage();
        // Reset the flag after sending the message
        setShouldSendMessage(false);
      }
    }, [shouldSendMessage]);
      
    
    
    
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
              <li className="nav-item" style={{marginRight:"10px"} }>
                <a href="index.html" className="nav-link pl-0"  onClick={() => navigate(`/clinic-patient-home/${id}`)}>
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
                  href="#"
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
                  href="#"  onClick={() => navigate(`/my-fam/${id}`)}>
                    My Family
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/MedHistory/${id}`)}>
                    My Medical History
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/Prescription/${id}`)}>
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
                  href="#"
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
                  href="#"  onClick={() => navigate(`/doctorsTable/${id}`)}>
                    Doctors List
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#"  onClick={() => navigate(`/appPagePatient/${id}`)}>
                    My Appointments
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#" onClick={() => navigate(`/appPagePatient/${id}`)}>
                    Book Appointment
                  </a>
                </div>
              </li>
              
              <li
                className="nav-item dropdown"
                onMouseEnter={() => setShowHealthPackagesDropdown(true)}
                onMouseLeave={() => setShowHealthPackagesDropdown(false)}
              >
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
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
                  href="#" onClick={() => navigate(`/health-packages-VIEW/${id}`)}>
                    Health Packages
                  </a>
                  <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#" onClick={() => navigate(`/health-packages-sub/${id}`)}>
                    Subscribed Packages
                  </a>
                 
                </div>
              </li>
              {/* Profile dropdown */}

              <li className="nav-item " style={{marginLeft:"600px"}} >
                <a  className="nav-link pl-0"  style={{cursor:"pointer" } } onClick={() => navigate(`/messages/${id}`)}>
                <FaMessage style={{ fontSize: '20px'}} />
                </a>
              </li>   
<li
  className="nav-item dropdown "
  onMouseEnter={() => setShowProfileDropdown(true)}
  onMouseLeave={() => setShowProfileDropdown(false)}
  style={{marginLeft:"640px"}}
>
  <a
    className="nav-link dropdown-toggle"
    href="#"
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
                  href="#" onClick={() => navigate(`/changepassTwo/${id}`)}>
      Change Password
    </a>
    <a className="dropdown-item" 
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2f89fc'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = ''}
                  href="#" onClick={() => navigate(`/clinic`)}>
      Logout
    </a>
  </div>
</li>

{/* Wallet icon without dropdown */}
<li className="nav-item ">
<WalletModal/>
</li>

            </ul>
          </div>
        </div>
      </nav>



       <Grid container spacing={2} style={{ height: '80vh',backgroundColor:"" }}>
  {/* Doctor List Column */}
  <Grid item xs={4} style={{ height: '100vh', backgroundColor: "rgb(225,234,246)", marginTop: "1rem" }}>
  {doctorsList.map((doctor) => (
    <Link key={doctor.sender} style={{ textDecoration: 'none' }}>
      <ListItem
        alignItems="flex-start"
        button
        selected={selectedDoctor && selectedDoctor.sender === doctor.sender}
        style={{ backgroundColor: selectedDoctor && selectedDoctor.sender === doctor.sender ? '' : '' }}
        onClick={() => handleDoctorClick(doctor)}
      >
        <ListItemAvatar>
        <Avatar alt={doctor.fullName} src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText primary={doctor.fullName} style={{ color: "" }} />
      <IconButton color="primary" onClick={() => handleCallClick(doctor)}>
        <CallIcon />
      </IconButton>
    </ListItem>
    </Link>
  ))}
</Grid>

  {/* Chat Container Column */}
  <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column', height: '85vh' }}>
    {/* Render your chat component based on the selectedDoctor state */}
    {selectedDoctor && (
          <div ref={chatContainerRef} style={{ flex: '1', overflowY: 'auto', padding: '10px' }}>
          <h1>{selectedDoctor.fullName}</h1>

        {/* Add your chat component here */}
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, overflowY: 'auto', flex: '1' ,
        backgroundImage: "grey",

      }}>
          {messages.map((message) => (
            <li key={message._id}>
              <ChatMessage message={message} isDoctor={message.sender === doctorId} />
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Text Input at the Bottom */}
    {selectedDoctor && (
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
    )}
    {!selectedDoctor && (
      <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ textAlign: 'center' }}>Select a doctor to chat with</p>
      </div>
    )}


  

  </Grid>
</Grid>


    
      </div>

      
    );
  }
  

export default Messages;