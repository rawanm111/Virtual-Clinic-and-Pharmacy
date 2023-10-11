import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './StartPage.css';
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
    <div className="container">
      <div className="image-container">
        <img
          src={img}
          alt=""
          className="adjustable-image"
        />
      </div>

      <div className="button-container-2">
        <Button variant="outlined" onClick={navigateToClinic}>
          VISIT VIRTUAL CLINIC
        </Button>
        <Button variant="outlined" onClick={navigateToPharmacy}>
          VISIT VIRTUAL PHARMACY
        </Button>
      </div>
    </div>
  );
}

export default StartPage;
