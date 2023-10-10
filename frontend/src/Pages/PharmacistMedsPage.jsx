import AppbarAdmin from '../Components/Appbar/AppbarAdmin';
import './AdminMedsPage.css'
import PharmacistMedicationTable from '../Components/PharmacistMedicationTable'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function PharmacistMedsPage() {
  
  return (
    <div > 
      <AppbarAdmin userName="Gera"></AppbarAdmin>
      <p className="centered-text">Available Medications</p>
      <PharmacistMedicationTable /> 
    </div>
  );
}

export default PharmacistMedsPage;