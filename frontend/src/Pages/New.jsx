import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
// import clinicImg from '../Components/Logo/clinic.png';
import clinicImg from "../images/clinic.png";
import pharmacyImg from "../images/pharm.png";
// import pharmacyImg from '../Components/Logo/pharm.png';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function VirtualHealthcarePage() {
  const navigate = useNavigate();

  const navigateToClinic = () => {
    navigate('/clinic');
  };

  const navigateToPharmacy = () => {
    navigate('/pharm');
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* Left Side (Clinic) */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#FFF', // White background
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          borderRadius: '10px', // Rounded corners
        }}
      >
 <IconButton color="default" onClick={() => navigate(-1)} style={{ position: 'absolute', top: '10px', left: '10px' }}>
          <ArrowBackIcon />
        </IconButton>
        <h2 style={{ fontSize: '36px', marginBottom: '60px', color: '#333' }}>Meta Clinic</h2>
        <img
          src={clinicImg}
          alt="Clinic"
          style={{ width: '60%', height: 'auto', marginBottom: '20px', borderRadius: '10px' }}
        />
        <p style={{ fontSize: '25px', marginBottom: '30px', color: '#555', textAlign: 'center' }}>
          Your trusted virtual clinic for personalized healthcare services. Access our experienced
          doctors from the comfort of your home.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={navigateToClinic}
          style={{
            fontSize: '18px',
            background: '#084b99', // Blue button color
            color: '#FFF', // White font color
          }}
        >
          Visit Virtual Clinic
        </Button>
      </div>

      {/* Right Side (Pharmacy) */}
      <div
        style={{
          flex: 1,
          backgroundColor:'#084b99', // Brighter Blue background like Pepsi can
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
          borderRadius: '10px', // Rounded corners
        }}
      >
        <h2 style={{ fontSize: '36px', marginBottom: '20px', color: '#ECF0F1', marginTop: '150px' }}>
          Meta Pharmacy
        </h2>
        <img
          src={pharmacyImg}
          alt="Pharmacy"
          style={{ width: '30%', height: 'auto', marginBottom: '20px', borderRadius: '10px', marginTop: '90px' }}
        />
        <p
          style={{
            fontSize: '25px',
            marginBottom: '30px',
            color: '#ECF0F1',
            textAlign: 'center',
            marginTop: '85px',
          }}
        >
          Your trusted virtual pharmacy for quick and convenient medication services. Order your
          prescriptions online and get them delivered to your doorstep.
        </p>
        <Button
          variant="contained"
          color="primary"
          onClick={navigateToPharmacy}
          style={{
            fontSize: '18px',
            background: '#FFF',
            marginTop: '8px',
            marginBottom: '140px',
            // ackground: '#1e058efe',
            
             // Same Blue as background
            color: '#000', // Black font color
          }}
        >
          Visit Virtual Pharmacy
        </Button>
      </div>
    </div>
  );
}

export default VirtualHealthcarePage;
