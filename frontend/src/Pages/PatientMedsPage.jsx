import AppbarPatientPharmacy from '../Components/Appbar/AppbarPatientPharmacy';
import './AdminMedsPage.css'
import MedicationTable from '../Components/MedicationTable'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function PatientMedsPage() {
  
  return (
    <div > 
      <AppbarPatientPharmacy userName="Gera"></AppbarPatientPharmacy>
      <p className="centered-text">Available Medications</p>
      <MedicationTable /> 
    </div>
  );
}

export default PatientMedsPage;