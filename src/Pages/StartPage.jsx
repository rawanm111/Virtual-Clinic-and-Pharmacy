import React from 'react';
import './StartPage.css';
import img from '../Components/Logo/img.png';
import Button from '@mui/material/Button';


function StartPage() {
    return (
      <div className="container">
        <div className="image-container">
          <img
            src={img} // Use the imported variable 'img' as the source
            alt="" // Add an alt attribute for accessibility
            className="adjustable-image"
          />
        </div>

        <div className="button-container-1">
        <Button variant="outlined">VISIT VIRTUAL CLINIC</Button>
      </div>

      <div className="button-container-2">
        <Button variant="outlined">VISIT VIRTUAL PHARMACY</Button>
      </div>












        </div>
)
}
export default StartPage;