import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';

function StartPage() {
  const navigate = useNavigate();

  const navigateToClinic = () => {
    navigate('/clinic');
  };

  const navigateToPharmacy = () => {
    navigate('/pharm');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Set the height to 100vh to fill the whole page
        backgroundColor: 'white',
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          width: '50%',
          maxWidth: '100%',
        }}
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button
          variant="outlined"
          onClick={navigateToClinic}
          style={{
            width: '450px',
            height: '60px',
            fontSize: '19px',
          }}
        >
          VISIT VIRTUAL CLINIC
        </Button>
        <Button
          variant="outlined"
          onClick={navigateToPharmacy}
          style={{
            width: '450px',
            height: '60px',
            fontSize: '19px',
          }}
        >
          VISIT VIRTUAL PHARMACY
        </Button>
      </div>
    </div>
  );
}

export default StartPage;
