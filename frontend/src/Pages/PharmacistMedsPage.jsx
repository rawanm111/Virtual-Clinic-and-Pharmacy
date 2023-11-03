import Appbar from '../Components/Appbar/AppbarPharmacist';
import './AdminMedsPage.css'
import PharmacistMedicationTable from '../Components/PharmacistMedicationTable'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function PharmacistMedsPage() {
  
  return (
    <div > 
      <Appbar userName="Gera"></Appbar>
      <p className="centered-text">Available Medications</p>
      <PharmacistMedicationTable /> 
    </div>
  );
}

export default PharmacistMedsPage;